import cv2
import matplotlib.pyplot as plt
import mediapipe as mp
import numpy as np
import tensorflow as tf

mp_drawing = mp.solutions.drawing_utils # gives drawing utilities
mp_pose = mp.solutions.pose # pose estimation model, there are also ones for face - if we want to take them as well


def show_img():
    img = cv2.imread("man.jpg", 1)
    cv2.imshow("picture", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def set_gpu_memory():
    gpus = tf.config.list_physical_devices("GPU")
    print(gpus)
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)


def pose_estimation(input_video):
    cap = cv2.VideoCapture(input_video) # 0 for webcam
    # setting instance of mediapipe feed, for more accurate model we can increase the numbers, but it will cause lossing detections
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        # Check if video opened successfully
        if not cap.isOpened():
            print("Error opening video stream or file")

        # Read until video is completed
        while cap.isOpened():
            # Capture frame-by-frame, ret is just a return value, frame is the actual frame
            ret, frame = cap.read()
            if ret:
                # Recoloring the image, by default its bgr and we want it as rgb:
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) # recoloring one frame to rgb
                image.flags.writeable = False # the image now unchangeable
                result = pose.process(image) # making a detection using the pose model and saving it to result
                image.flags.writeable = True # now can change
                image = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR) # returning the image to the original format

                # rendering the detections
                mp_drawing.draw_landmarks(image, result.pose_landmarks, mp_pose.POSE_CONNECTIONS) # drawing the detections into the image
                # passed the image, the landmarks that are the junction points,
                # and passing the pose connection, what landmark connected to what (shoulder connected to elbow...)
                # Display the resulting frame
                cv2.imshow(input_video, image)
                # Press Q on keyboard to  exit
                if cv2.waitKey(25) & 0xFF == ord('q'):
                    break
            # Break the loop
            else:
                break
        # When everything done, release the video capture object
        cap.release()
        # Closes all the frames
        cv2.destroyAllWindows()


if __name__ == "__main__":
    set_gpu_memory()
    loc = "dance.mp4"
    pose_estimation(loc)
