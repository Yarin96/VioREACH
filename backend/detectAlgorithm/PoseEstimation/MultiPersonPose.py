import os
from math import atan, pi, dist

import cv2
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from matplotlib import pyplot as plt

EDGES = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}


def set_gpu_memory():
    gpus = tf.config.list_physical_devices("GPU")
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)


def draw_keypoints(frame, keypoints, confidence_threshold):
    """gets frame and keypoints to draw. Drawing only the keypoints that their score is above the confidence threshold value"""
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y, x, 1]))

    for kp in shaped:
        ky, kx, kp_conf = kp
        if kp_conf > confidence_threshold:
            cv2.circle(frame, (int(kx), int(ky)), 4, (0, 255, 0), -1)


def draw_connections(frame, keypoints, edges, confidence_threshold):
    """gets frame and keypoints to draw. Drawing only the keypoints that their score is above the confidence threshold value
    The edges value tells which joint connected to which joint."""
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y, x, 1]))

    for edge, color in edges.items():
        p1, p2 = edge
        y1, x1, c1 = shaped[p1]
        y2, x2, c2 = shaped[p2]

        if (c1 > confidence_threshold) & (c2 > confidence_threshold):
            cv2.line(frame, (int(x1), int(y1)),
                     (int(x2), int(y2)), (0, 0, 255), 2)


def draw_each_person(frame, keypoints_with_scores, edges, confidence_threshold):
    """Gets the keypoints with scores for every person, and draw its keypoints for every one of them"""
    for person in keypoints_with_scores:
        draw_connections(frame, person, edges, confidence_threshold)
        draw_keypoints(frame, person, confidence_threshold)


def render_keypoints(frame, keypoints, confidence):
    draw_each_person(frame, keypoints, EDGES, confidence)
    cv2.imshow("Movenet multipose", frame)
    # Press Q on keyboard to  exit
    if cv2.waitKey(10) & 0xFF == ord('q'):
        return


def pose_estimation(input_video):
    """Get video path and start the analysis process"""
    main_directory = os.getcwd().replace("\\", "/")
    # Using movenet model
    # https://tfhub.dev/google/movenet/multipose/lightning/1
    model = hub.load(f"{main_directory}/PoseEstimation/movenet")
    movenet = model.signatures["serving_default"]
    cap = cv2.VideoCapture(input_video)
    MIN_WIDTH = 256
    detected_anomally = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        try:
            aspect_ratio = frame.shape[0] / frame.shape[1]
            new_width = int(frame.shape[1] / 2)
            while new_width % 32 != 0:
                if new_width < MIN_WIDTH:
                    new_width = MIN_WIDTH
                    break
                new_width /= 2
            new_height = int(aspect_ratio * new_width)
            temp1 = new_height
            temp2 = new_height
            while new_height % 32 != 0:
                temp1 += 1
                temp2 -= 1
                if temp1 % 32 == 0:
                    new_height = temp1
                if temp2 % 32 == 0:
                    new_height = temp2
        except AttributeError:
            continue
        # Resize the image, so it fit the model requierments into a copy, the detection will be on the copy, the result
        # render will be on the original frame.
        img = frame.copy()
        img = tf.image.resize_with_pad(
            tf.expand_dims(img, axis=0), new_height, new_width)
        input_img = tf.cast(img, dtype=tf.int32)

        # Make detection
        results = movenet(input_img)
        # the shape for results is (1, 6, 56), the 6 represent each person it can detect
        # gives an array with 56 values, the first 51 are the keypoints, the last are the bounding boxes values
        # so grab only the first 51 values
        keyPoints_with_scores = results["output_0"].numpy()[
                                :, :, :51].reshape((6, 17, 3))
        # reshaping so we get an array for every person, and nested inside is an array for every keypoint
        # the 3 dimension is: x value, y value, and a score value(score is how confident is the model that the x,y coordinates are correct)
        # for each key point (total 17 key points * 3 values for each one)

        ############################## When i need to calculate speed and location of limbs use this as a baseline ##############################
        # The order of the 17 keypoint joints is: [nose, left eye, right eye, left ear, right ear, left shoulder,
        # right shoulder, left elbow, right elbow, left wrist, right wrist, left hip, right hip, left knee, right knee, left ankle, right ankle].
        #########################################################################################################################################
        print("Detecting pose estimation anomalies..")
        if detected_anomally == 0:
            detected_anomally = get_two_people_check_punch(
                keyPoints_with_scores)
        else:
            # Stop if already found a punch in one of the frames
            print("===============Finished pose analysis================")
            return detected_anomally
        # render_keypoints(frame, keyPoints_with_scores, 0.25)
    cap.release()
    cv2.destroyAllWindows()
    print("===============Finished pose analysis================")
    return detected_anomally


def assert_punch(person1, person2):
    """Get 2 people and assert if person 1 punch person 2"""
    head_points = ["nose", "left_eye", "right_eye", "left_ear", "right_ear"]
    arm_points = ["left_shoulder", "left_elbow", "left_wrist", "right_shoulder", "right_elbow", "right_wrist"]
    arm_streched = 70
    min_dist_to_face = 0.08
    confidence_threshold = 0.01
    is_punch = False
    minimun_confidence = 1
    for head_point in head_points:
        minimun_confidence = min(person2[head_point][-1], minimun_confidence)
    for arm_point in arm_points:
        minimun_confidence = min(person1[arm_point][-1], minimun_confidence)
    if minimun_confidence < confidence_threshold:
        return False

    person1_left_arm_degree = get_arms_degrees("left", person1)
    person1_right_arm_degree = get_arms_degrees("right", person1)

    for head_point in head_points:
        left_wrist_to_face_dist = dist(
            person1["left_wrist"][:2], person2[head_point][:2])
        right_wrist_to_face_dist = dist(
            person1["right_wrist"][:2], person2[head_point][:2])
        if (left_wrist_to_face_dist < min_dist_to_face and person1_left_arm_degree > arm_streched) or (
                right_wrist_to_face_dist < min_dist_to_face and person1_right_arm_degree > arm_streched):
            is_punch = True

    return is_punch


def get_arms_degrees(side, person):
    """Calculate elbow degree"""
    person_shoulder = person[f"{side}_shoulder"][:2]
    person_elbow = person[f"{side}_elbow"][:2]
    person_wrist = person[f"{side}_wrist"][:2]
    ab_left = dist(person_shoulder, person_elbow)
    bc_left = dist(person_elbow, person_wrist)
    return get_degree(ab_left, bc_left)


def get_degree(ab, bc):
    """Get degree bewteen 2 edges"""

    def deg(rad):
        return 180 / pi * rad

    ans = deg(atan(ab / bc))
    return ans


def print_person_keypoints(keypoints):
    """Concole print the identified people and thier keypoints"""
    for i, person in enumerate(keypoints):
        print(f"==========Person {i} keypoints=============")
        for j, keypoint in enumerate(person):
            print(f"Keypoint {j}: {keypoint}")


def get_two_people_check_punch(keypoints):
    """Takes 6 people array and check punch for every couple"""
    # print_person_keypoints(keypoints)
    joints = ["nose", "left_eye", "right_eye", "left_ear", "right_ear", "left_shoulder",
              "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist",
              "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle"]
    for i, first_person in enumerate(keypoints):
        person1 = {}
        for j, second_person in enumerate(keypoints):
            person2 = {}
            if j == i:
                continue
            for k, keypoint in enumerate(first_person):
                person1[joints[k]] = keypoint
            for k, keypoint in enumerate(second_person):
                person2[joints[k]] = keypoint
            if assert_punch(person1, person2):
                return 1
    return 0


def pose_activation(video):
    """Active detection, gets the video path"""
    set_gpu_memory()
    return pose_estimation(video)
