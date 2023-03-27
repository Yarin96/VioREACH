from ultralytics import YOLO as yolo
import cv2
import yaml
import torch.nn as nn
import torchvision.models as models
import os

from flask import Flask, request
from flask_cors import CORS
from urllib.request import urlretrieve


# Function to extract frames
def FrameCapture(path):
    # Path to video file
    vidObj = cv2.VideoCapture(path)

    # Used as counter variable
    count = 0

    # checks whether frames were extracted
    success = 1

    while success:
        # vidObj object calls read
        # function extract frames
        success, image = vidObj.read()

        # Saves the frames with frame-count
        cv2.imwrite(f"frame{count}.jpg", image)

        count += 1

def define_yolov8_model(video_file):
    model = yolo("yolov8x.pt") # check the option to create my own yaml file to use my own model and not yolo8 prebuild model
    model.predict(video_file, save=True, save_txt=True)


def get_frames_identify_vectors():
    directory = r"runs/detect/predict/labels"
    count = 0
    allFrames = []
    # Iterate directory
    for path in os.listdir(directory):
        # check if current path is a file
        if os.path.isfile(os.path.join(directory, path)):
            count += 1
    for file in range(1, count + 1):
        currentFile = open(directory + "/video_1_" + str(file) + ".txt")
        allFrames.append(currentFile.readlines())
    for frame in allFrames:
        print(frame)
    identify_classes(allFrames)


def identify_classes(all_frames):
    yolo_classes = open("coco8.yaml", encoding="utf8")
    names = yaml.safe_load(yolo_classes)["names"]
    foundClasses = []
    boundingBoxes = []
    objsInFrame = []
    LocationOfObj = []
    for frame in all_frames:
        for obj in frame:
            objClass = int(obj.split()[0])
            centerXcor, centerYcor, normalizedWidth, normalizedHeight = obj.split()[1:]
            LocationOfObj.append([{objClass: names[objClass]}, {"centerXcor": float(centerXcor)}, {"centerYcor": float(centerYcor)}, {"normalizedWidth": float(normalizedWidth)}, {"normalizedHeight": float(normalizedHeight)}])
            objsInFrame.append({objClass: names[objClass]})
        foundClasses.append(objsInFrame)
        boundingBoxes.append(LocationOfObj)
        objsInFrame = []
        LocationOfObj = []

    # for frame in boundingBoxes:
    #     print(frame)
    """
    for now the values for the Xcor and Ycor and all are normalized,
    its needed to calculate the actual position in the image, and for that we need to take each photo:
    img = cv2.imread("directory of video")
    height, width = img.shape[0], img.shape[1]
    centerXcor *= width
    centerYcor *= height
    normalizedWidth *= width
    normalizedHeight *= height
    and with that we can get the bounding box:
    top_left = (int(centerXcor - normalizedWidth/2), int(centerYcor - normalizedHeight/2))
    bottom_right = (int(centerXcor + normalizedWidth/2), int(centerYcor + normalizedHeight/2))
    and like that we get real coordinates and not normalized
    and then:
    img = cv2.rectangle(img, top_left, bottom_right, {color of the bounding box}: (0, 255, 0), {thickness of the bounding box}: 3)
    cv2_imshow(img)
    and that will show the image with the bounding box on the object
    line 76 is the tricky one cause we need to do this to each frame in the video, need to check if there is a 
    more efficient way of doing it
    """



app = Flask(__name__)
CORS(app, supports_credentials=True)

# Videos API Route
@app.route("/detection", methods=["POST"])
def detect_video():
    if request.method == 'POST':
        data = request.get_json()
        video_url = str(data.get('video_url'))

        # Download the video from the URL and save it to a local file
        video_file_path = os.path.join('D:/ViolenceDetectionProject/backend/detect-algorithm/video.mp4')
        
        urlretrieve(video_url, video_file_path)
        define_yolov8_model(video_file_path)
        get_frames_identify_vectors()
    else:
        raise 'Error'

if __name__ == "__main__":
    app.run(port=5000)

