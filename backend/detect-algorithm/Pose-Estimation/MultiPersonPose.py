import tensorflow as tf
import tensorflow_hub as hub
import cv2
from matplotlib import pyplot as plt
import numpy as np


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
    print(gpus)
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
            cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 2)


def draw_each_person(frame, keypoints_with_scores, edges, confidence_threshold):
    """Gets the keypoints with scores for every person, and draw its keypoints for every one of them"""
    for person in keypoints_with_scores:
        draw_connections(frame, person, edges, confidence_threshold)
        draw_keypoints(frame, person, confidence_threshold)


def pose_estimation(input_video):
    # Using movenet model
    model = hub.load("https://tfhub.dev/google/movenet/multipose/lightning/1")
    movenet = model.signatures["serving_default"]
    cap = cv2.VideoCapture(input_video)
    MIN_WIDTH = 256
    # Read until video is completed
    while cap.isOpened():
        # Capture frame-by-frame, ret is just a return value, frame is the actual frame
        ret, frame = cap.read()
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
        print(f"ORIGINAL HEIGHT/ WIDTH: {int(frame.shape[0])} X {int(frame.shape[1])}")
        print(f"NEW HEIGHT/ WIDTH: {new_height} X {new_width}")
        # Resize the image, so it fit the model requierments into a copy, the detection will be on the copy, the result
        # render will be on the original frame.
        img = frame.copy()
        img = tf.image.resize_with_pad(tf.expand_dims(img, axis=0), new_height, new_width)
        input_img = tf.cast(img, dtype=tf.int32)

        # Make detection
        results = movenet(input_img)
        # the shape for results is (1, 6, 56), the 6 represent each person it can detect
        # gives an array with 56 values, the first 51 are the keypoints, the last are the bounding boxes values
        # so grab only the first 51 values
        keyPoints_with_scores = results["output_0"].numpy()[:, :, :51].reshape((6, 17, 3))
        # reshaping so we get an array for every person, and nested inside is an array for every keypoint
        # the 3 dimension is: x value, y value, and a score value(score is how confident is the model that the x,y coordinates are correct)
        # for each key point (total 17 key points * 3 values for each one)

        ############################## When i need to calculate speed and location of limbs use this as a baseline ##############################
        # The order of the 17 keypoint joints is: [nose, left eye, right eye, left ear, right ear, left shoulder,
        # right shoulder, left elbow, right elbow, left wrist, right wrist, left hip, right hip, left knee, right knee, left ankle, right ankle].
        #########################################################################################################################################


        # Render keypoints
        draw_each_person(frame, keyPoints_with_scores, EDGES, 0.25)

        cv2.imshow("Movenet multipose", frame)
        # Press Q on keyboard to  exit
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
            # Break the loop
    # When everything done, release the video capture object
    cap.release()
    # Closes all the frames
    cv2.destroyAllWindows()



if __name__ == "__main__":
    set_gpu_memory()
    loc = "dance.mp4"
    pose_estimation(loc)
