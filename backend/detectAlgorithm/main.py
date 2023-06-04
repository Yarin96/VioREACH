# import YOLOv8Extraction.Yolov8 as yoloModule
# import Classifiers.BloodDetection.BloodSVM as bloodDetection
# import StackingClassifier.StackClassifier as xgb
# import PoseEstimation.MultiPersonPose as pose
import os
import shutil
# --------------------------------
from flask import Flask, request, jsonify
from flask_cors import CORS
from urllib.request import urlretrieve



def detect_blood(video, vector, yolo_detections, directory):
    imgs_dir = f"{directory}/YOLOv8Extraction/VideosFramesOutputs/{video[:str.rfind(video, '.')]}/"
    print("Checking for blood for every images containing violence")
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
        if vector[2] == 0 and pred == 1:
            # if found blood on one frame update the value and stop looking for new frame
            vector[2] = 1
            break
    return vector


def get_only_violence_detections(arr):
    only_violence = []
    for frame in arr:
        for detection in frame:
            if detection["class"] == "Violence":
                only_violence.append(detection)
    return only_violence


def cleanups(directory, file, violnece_val):
    if violnece_val != 0:
        crowdednessDir = f"{directory}/YOLOv8Extraction/VideosCrowdednessOutputs/" + file[:str.rfind(file, '.')]
        shutil.rmtree(crowdednessDir)
    framesDir = f"{directory}/YOLOv8Extraction/VideosFramesOutputs/" + file[:str.rfind(file, '.')]
    predictionsDir = f"{directory}/YOLOv8Extraction/VideosPredictionsOutputs/" + file[:str.rfind(file, '.')]
    shutil.rmtree(framesDir)
    shutil.rmtree(predictionsDir)
    os.remove(f"{directory}/{file}")


def print_currect_detections(vector):
    detection_classes = ["crowdiness", "Fast Moves", "Blood", "violence"]
    for i, detection_class in enumerate(detection_classes):
        if vector[i] == 0:
            out = "No detection."
        else:
            out = "Detected!"
        print(f"Class: {detection_class} | Findings: {out}")


def activate(videoFile):
    classes = {0: "No Violence detected", 1: "Light violence detected", 2: "Medium violence detected", 3: "Hard Violence detected"}
    main_directory = os.getcwd().replace("\\", "/")
    # first_time_setups()
    # ["crowdiness", "Fast Moves", "Blood", "violence"]
    ans_vector = [0, 0, 0, 0]
    try:
        ans_vector[3], ans_vector[0], yolo_detec = yoloModule.active_detection(videoFile)
        print_currect_detections(ans_vector)
    except TypeError:
        exit()
    except FileNotFoundError:
        print("No input video identified. check directory!")
        exit()
    except UnboundLocalError:
        ans_vector[0] = 0

    if ans_vector[3] == 1:
        # Only if YOLO identified violence continue to the other classifiers
        yolo_detec = get_only_violence_detections(yolo_detec)
        ans_vector = detect_blood(videoFile, ans_vector, yolo_detec, main_directory)
        ans_vector[1] = pose.pose_activation(videoFile)
        # After alll classifier worked:
        ans_vector = [ans_vector]
        ans_vector[0].append(xgb.activation(ans_vector)[0])
        ans_vector = ans_vector[0]
        print("Final vector:")
        print_currect_detections(ans_vector)
        print(classes[ans_vector[-1]])
    if ans_vector[-1] == 0:
        ans_vector.append(0)
    cleanups(main_directory, videoFile, ans_vector[-1])
    return ans_vector

# --------------------------------


app = Flask(__name__)
CORS(app, supports_credentials=True)


# Videos API Route
@app.route("/detection", methods=["POST"])
def detect_video():
    if request.method == 'POST':
        data = request.get_json()
        video_url = str(data.get('video_url'))
        main_directory = os.getcwd().replace("\\", "/")
        # Download the video from the URL and save it to a local folder as MP4 file
        video_file_path = os.path.join(f'{main_directory}/video.mp4')
        urlretrieve(video_url, video_file_path)
        # result = activate("video.mp4")
        print("\n==========================================================================================\n")
        # print(result)
        # result = list(map(int, result))
        return jsonify({'result': [0, 0, 0, 1]})
    else:
        return jsonify({'error': 'Invalid request'})
    

if __name__ == "__main__":
    app.run(port=5000)

