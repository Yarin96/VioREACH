from ultralytics import YOLO as yolo
import cv2
import yaml
import torch.nn as nn
import torchvision.models as models
import os

from flask import Flask, request
from flask_cors import CORS
from urllib.request import urlretrieve


def first_time_setups():
    os.mkdir("VideosFramesOutputs")
    os.mkdir("VideosPredictionsOutputs")


def printing_objects(obj_list):
    for obj in obj_list:
        print(obj)


def frame_capture(path):
    """Extract frames from a video with a given path"""
    # Path to video file
    vidObj = cv2.VideoCapture(path)
    dirToCreate = path[:str.rfind(path, ".")]
    fullDir = f"VideosFramesOutputs/{dirToCreate}"
    try:
        os.mkdir(fullDir)
    except:
        print("Video already analyzed")
        return
    # Used as counter variable
    count = 1

    # checks whether frames were extracted
    success = 1

    while success:
        # vidObj object calls read
        # function extract frames
        success, image = vidObj.read()
        if success:
            # Saves the frames with frame-count
            cv2.imwrite(f"{fullDir}/frame{count}.jpg", image)

        count += 1


def define_and_predict_yolov8(videoToPredict):
    """ Define the model, predict and save the outcome into txt files given a video
    Calls the function to extract frames from the video"""
    model = yolo(
        "yolov8x.pt")  # check the option to create my own yaml file to use my own model and not yolo8 prebuilt model
    model.to("cuda")
    frame_capture(videoToPredict)
    model.predict(videoToPredict, save=True, save_txt=True)
    src = "runs/detect/predict"
    os.mkdir("VideosPredictionsOutputs/" + videoToPredict[:str.rfind(videoToPredict, ".")])
    dst = "VideosPredictionsOutputs/" + videoToPredict[:str.rfind(videoToPredict, ".")]
    allfiles = os.listdir(src)
    for file in allfiles:
        src_path = os.path.join(src, file)
        dst_path = os.path.join(dst, file)
        os.rename(src_path, dst_path)
    os.rmdir(src)


def get_frames_identify_vectors(videoFileName):
    """Given a video name that has been predicted, get the predictions and call a function to identify classes"""
    directory = fr"VideosPredictionsOutputs/{videoFileName}/labels/"
    count = 0
    framesDetectionVectors = []
    # Iterate directory
    for path in os.listdir(directory):
        # check if current path is a file
        if os.path.isfile(os.path.join(directory, path)):
            count += 1
    for file in range(1, count + 1):
        currentFile = open(directory + videoFileName + "_" + str(file) + ".txt")
        framesDetectionVectors.append(currentFile.readlines())
    # printing_objects(framesDetectionVectors)
    identify_classes(framesDetectionVectors, videoFileName)


def show_boundingBox_image(img, top_left, bottom_right):
    img2 = cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 5)
    cv2.imshow("image", img2)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def identify_classes(processed_frames, videoFileName):
    yolo_classes = open("coco8.yaml", encoding="utf8")
    names = yaml.safe_load(yolo_classes)["names"]
    foundClasses = []
    boundingBoxes = []
    objsInFrame = []
    LocationOfObj = []
    for frame in processed_frames:
        for obj in frame:
            objClass = int(obj.split()[0])
            centerXcor, centerYcor, normalizedWidth, normalizedHeight = obj.split()[1:]
            LocationOfObj.append([{objClass: names[objClass]},
                                  {"centerXcor": float(centerXcor)},
                                  {"centerYcor": float(centerYcor)},
                                  {"normalizedWidth": float(normalizedWidth)},
                                  {"normalizedHeight": float(normalizedHeight)}])
            objsInFrame.append({objClass: names[objClass]})
        foundClasses.append(objsInFrame)
        boundingBoxes.append(LocationOfObj)
        objsInFrame = []
        LocationOfObj = []

    # printing_objects(boundingBoxes)
    real_bounding_boxes = []
    one_frame_objs = []
    for i, frame in enumerate(boundingBoxes):
        frame_num = "frame" + str(i + 1)
        imgSrc = f"VideosFramesOutputs/{videoFileName}/{frame_num}.jpg"
        img = cv2.imread(imgSrc)
        height, width = img.shape[0], img.shape[1]
        for obj in frame:
            obj[1]["centerXcor"] *= width
            obj[2]["centerYcor"] *= height
            obj[3]["normalizedWidth"] *= width
            obj[4]["normalizedHeight"] *= height
            top_left = (int(obj[1]["centerXcor"] - obj[3]["normalizedWidth"] / 2),
                        int(obj[2]["centerYcor"] - obj[4]["normalizedHeight"] / 2))
            bottom_right = (int(obj[1]["centerXcor"] + obj[3]["normalizedWidth"] / 2),
                            int(obj[2]["centerYcor"] + obj[4]["normalizedHeight"] / 2))
            classDescription = list(obj[0].items())
            classDescription = classDescription[0]
            classCodeInYamlFile = classDescription[0]  # if ever needed when building own yaml file
            one_frame_objs.append(
                [{"class": classDescription[1]}, {"top_left": top_left}, {"bottom_right": bottom_right}])

        real_bounding_boxes.append(one_frame_objs)
        one_frame_objs = []

    printing_objects(real_bounding_boxes)



app = Flask(__name__)
CORS(app, supports_credentials=True)


# Videos API Route
@app.route("/detection", methods=["POST"])
def detect_video():
    if request.method == 'POST':
        data = request.get_json()
        video_url = str(data.get('video_url'))

        # Download the video from the URL and save it to a local file as MP4 file
        video_file_path = os.path.join('D:/ViolenceDetectionProject/backend/detect-algorithm/video.mp4')
        
        urlretrieve(video_url, video_file_path)
        define_yolov8_model(video_file_path)
        get_frames_identify_vectors()
    else:
        raise 'Error'
    
if __name__ == "__main__":
    app.run(port=5000)
    # first_time_setups()
    videoFile = "V_3.mp4"
    videoFileForFrames = videoFile[:str.rfind(videoFile, ".")]
    define_and_predict_yolov8(videoFile)
    get_frames_identify_vectors(videoFileForFrames)


