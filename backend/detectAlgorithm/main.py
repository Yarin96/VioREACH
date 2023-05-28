import YOLOv8Extraction.Yolov8 as yoloModule
import backend.detectAlgorithm.Classifiers.BloodDetection.BloodSVM as bloodDetection
import StackingClassifier.StackClassifier as sc
import PoseEstimation.MultiPersonPose as pose
import os
import shutil


"""
TODOS:
1. delete unused features from the table for the XGboost
2. connect the front to this file
3. optional: add crwodness detection, calculations to the pose estimaion, audio detection, sentiment analysis..
4. maybe check that the weight for each feature is good

"""


def detect_blood(video, vector, yolo_detections, directory):
    imgs_dir = f"{directory}/YOLOv8Extraction/VideosFramesOutputs/{video[:str.rfind(video, '.')]}/"
    count = 0
    for path in os.listdir(imgs_dir):
        # check if current path is a file
        if os.path.isfile(os.path.join(imgs_dir, path)):
            count += 1
    for file in range(1, count + 1):
        found = False
        frame_num = "frame" + str(file + 1)
        for detection in yolo_detections:
            if detection["frame"] == frame_num:
                found = True
                break
        if not found:
            continue
        print(f"Processing frame number {file + 1} for blood..")
        imgSrc = f"{imgs_dir}/{frame_num}.jpg"
        if not os.path.isfile(imgSrc):
            continue
        pred = bloodDetection.reuse_model(imgSrc)[0]
        if vector[5] == 0 and pred == 1:
            # if found blood on one frame update the value and stop looking for new frame
            vector[5] = 1
            break
    return vector


def get_only_violence_detections(arr):
    only_violence = []
    for frame in arr:
        for detection in frame:
            if detection["class"] == "Violence":
                only_violence.append(detection)
    return only_violence


def cleanups(directory, file):
    framesDir = f"{directory}/YOLOv8Extraction/VideosFramesOutputs/" + file[:str.rfind(file, '.')]
    predictionsDir = f"{directory}/YOLOv8Extraction/VideosPredictionsOutputs/" + file[:str.rfind(file, '.')]
    crowdednessDir = f"{directory}/YOLOv8Extraction/VideosCrowdednessOutputs/" + file[:str.rfind(file, '.')]
    shutil.rmtree(framesDir)
    shutil.rmtree(predictionsDir)
    shutil.rmtree(crowdednessDir)



def print_currect_detections(vector):
    detection_classes = ["weapons", "yell", "throw", "crowdiness", "Fast Moves", "Blood", "violence"]
    for i, detection_class in enumerate(detection_classes):
        if vector[i] == 0:
            out = "No detection."
        else:
            out = "Detected!"
        print(f"Class: {detection_class} | Findings: {out}")


if __name__ == "__main__":
    classes = {0: "No Violence detected", 1: "Light violence detected", 2: "Medium violence detected", 3: "Hard Violence detected"}
    main_directory = os.getcwd().replace("\\", "/")
    # first_time_setups()
    videoFile = "V_104.mp4"
    # ["weapons", "yell", "throw", "crowdiness", "Fast Moves", "Blood", "violence"]
    ans_vector = [0, 0, 0, 0, 0, 0, 0]
    try:
        ans_vector[6], ans_vector[3], yolo_detec = yoloModule.active_detection(videoFile)
        print_currect_detections(ans_vector)
    except TypeError:
        exit()
    except FileNotFoundError:
        print("No input video identified. check directory!")
        exit()
    if ans_vector[6] == 1:
        # Only if YOLO identified violence continue to the other classifiers
        yolo_detec = get_only_violence_detections(yolo_detec)
        ans_vector = detect_blood(videoFile, ans_vector, yolo_detec, main_directory)
        ans_vector[4] = pose.pose_activation(videoFile)
        # After alll classifier worked:
        ans_vector = [ans_vector]
        ans_vector[0].append(sc.activation(ans_vector)[0])
        ans_vector = ans_vector[0]
        print("Final vector:")
        print_currect_detections(ans_vector)
        print(classes[ans_vector[-1]])
    cleanups(main_directory, videoFile)


