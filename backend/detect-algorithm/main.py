import ExtractionUsingYOLOv8.Yolov8 as yoloModule
import BloodDetection.BloodSVM as bloodDetection
import RandomForest.RandomForest as randomForest
import cv2
import os

if __name__ == "__main__":
    # first_time_setups()
    videoFile = "V_2.mp4"
    ans_vector = []
    try:
        ans_vector = yoloModule.active_detection(videoFile)
    except TypeError:
        print("Submitted")
        exit()
    if ans_vector[0] == 1:
        # Only if YOLO identified violence continue to the other classifiers
        imgs_dir = f"ExtractionUsingYOLOv8/VideosFramesOutputs/{videoFile[:str.rfind(videoFile, '.')]}/"
        count = 0
        for path in os.listdir(imgs_dir):
            # check if current path is a file
            if os.path.isfile(os.path.join(imgs_dir, path)):
                count += 1
        for file in range(1, count + 1):
            print(f"on file {file}")
            frame_num = "frame" + str(file + 1)
            imgSrc = f"{imgs_dir}/{frame_num}.jpg"
            if not os.path.isfile(imgSrc):
                continue
            ans = bloodDetection.reuse_model(imgSrc)[0]
            if len(ans_vector) <= 1:
                ans_vector.append(ans)
            elif len(ans_vector) == 2 and ans_vector[1] == 0 and ans == 1:
                ans_vector[1] = 1
            # stopping if it found one image that has blood, not for the final verison
            if ans == 1:
                break

        # the answer vector should be like that, so when all is done make sure to add another dim to the array:
        # ans = [[1, 0, 0, 0, 0, 0, 0]]
        randomForest.activation(ans)

    # print(ans_vector)
