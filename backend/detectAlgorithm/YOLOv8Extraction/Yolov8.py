
# from ultralytics import YOLO as yolo
# import cv2
# import yaml
# import os
# import shutil



# def first_time_setups():
#     main_directory = os.getcwd().replace("\\", "/")
#     os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs")
#     os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosPredictionsOutputs")


# def printing_objects(obj_list):
#     for obj in obj_list:
#         print(obj)


# def frame_capture(path):
#     """Extract frames from a video with a given path"""
#     print("Extracting frames..")
#     main_directory = os.getcwd().replace("\\", "/")
#     # Path to video file
#     vidObj = cv2.VideoCapture(path)
#     dirToCreate = path[:str.rfind(path, ".")]
#     fullDir = f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{dirToCreate}"
#     try:
#         os.mkdir(fullDir)
#     except:
#         return
#     # Used as counter variable
#     count = 1
#     # checks whether frames were extracted
#     success = 1

#     while success:
#         # vidObj object calls read
#         # function extract frames
#         success, image = vidObj.read()
#         if success:
#             # Saves the frames with frame-count
#             cv2.imwrite(f"{fullDir}/frame{count}.jpg", image)

#         count += 1


# def define_and_predict_yolov8(videoToPredict, weights):
#     """ Define the model, predict and save the outcome into txt files given a video
#     Calls the function to extract frames from the video"""
#     main_directory = os.getcwd().replace("\\", "/")
#     model = yolo(f"{main_directory}/YOLOv8Extraction/{weights}.pt")
#     model.to("cuda")
#     frame_capture(videoToPredict)
#     print("Making a detection..")
#     model.predict(videoToPredict, save=True, save_txt=True)
#     src = f"{main_directory}/runs/detect/predict"
#     if weights == "Violence_best":
#         os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosPredictionsOutputs/" + videoToPredict[:str.rfind(videoToPredict, ".")])
#         dst = f"{main_directory}/YOLOv8Extraction/VideosPredictionsOutputs/" + videoToPredict[:str.rfind(videoToPredict, ".")]
#         allfiles = os.listdir(src)
#         for file in allfiles:
#             src_path = os.path.join(src, file)
#             dst_path = os.path.join(dst, file)
#             os.rename(src_path, dst_path)
#         os.rmdir(src)
#     else:
#         os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosCrowdednessOutputs/" + videoToPredict[
#                                                                                   :str.rfind(videoToPredict, ".")])
#         dst = f"{main_directory}/YOLOv8Extraction/VideosCrowdednessOutputs/" + videoToPredict[
#                                                                                :str.rfind(videoToPredict, ".")]
#         allfiles = os.listdir(src)
#         for file in allfiles:
#             src_path = os.path.join(src, file)
#             dst_path = os.path.join(dst, file)
#             os.rename(src_path, dst_path)
#         os.rmdir(src)



# def get_frames_identify_vectors(videoFileName, yaml_file, folder):
#     """Given a video name that has been predicted, get the predictions and call a function to identify classes"""
#     main_directory = os.getcwd().replace("\\", "/")
#     directory = fr"{main_directory}/YOLOv8Extraction/{folder}/{videoFileName}/labels/"
#     count = 0
#     framesDetectionVectors = []
#     # Iterate directory
#     for path in os.listdir(directory):
#         # check if current path is a file
#         if os.path.isfile(os.path.join(directory, path)):
#             count += 1
#     for file in range(1, count + 1):
#         try:
#             currentFile = open(directory + videoFileName + "_" + str(file) + ".txt")
#         except FileNotFoundError:
#             if os.path.exists(fr"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{videoFileName}/frame{str(file)}.jpg"):
#                 os.remove(fr"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{videoFileName}/frame{str(file)}.jpg")
#             continue
#         framesDetectionVectors.append(currentFile.readlines())
#     # printing_objects(framesDetectionVectors)
#     return identify_classes(framesDetectionVectors, videoFileName, yaml_file)


# def show_boundingBox_image(img, top_left, bottom_right):
#     img2 = cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 5)
#     cv2.imshow("image", img2)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()


# def identify_classes(processed_frames, videoFileName, yaml_file):
#     main_directory = os.getcwd().replace("\\", "/")
#     yolo_classes = open(f"{main_directory}/YOLOv8Extraction/{yaml_file}.yaml", encoding="utf8")
#     names = yaml.safe_load(yolo_classes)["names"]
#     foundClasses = []
#     boundingBoxes = []
#     objsInFrame = []
#     LocationOfObj = []
#     only_classes_all_frames = []
#     ans_value = 0
#     for frame in processed_frames:
#         current_frame = []
#         for obj in frame:
#             objClass = int(obj.split()[0])
#             centerXcor, centerYcor, normalizedWidth, normalizedHeight = obj.split()[1:]
#             LocationOfObj.append([{objClass: names[objClass]},
#                                   {"centerXcor": float(centerXcor)},
#                                   {"centerYcor": float(centerYcor)},
#                                   {"normalizedWidth": float(normalizedWidth)},
#                                   {"normalizedHeight": float(normalizedHeight)}])
#             objsInFrame.append({objClass: names[objClass]})
#             current_frame.append(names[objClass])
#             if yaml_file == "data":
#                 if names[objClass] == "Violence" and ans_value == 0:
#                     ans_value = 1
#         foundClasses.append(objsInFrame)
#         boundingBoxes.append(LocationOfObj)
#         only_classes_all_frames.append(current_frame)
#         objsInFrame = []
#         LocationOfObj = []
#     real_bounding_boxes = []
#     one_frame_objs = []
#     for i, frame in enumerate(boundingBoxes):
#         frame_num = "frame" + str(i + 1)
#         imgSrc = f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{videoFileName}/{frame_num}.jpg"
#         img = cv2.imread(imgSrc)
#         try:
#             height, width = img.shape[0], img.shape[1]
#         except AttributeError:
#             continue
#         for obj in frame:
#             obj[1]["centerXcor"] *= width
#             obj[2]["centerYcor"] *= height
#             obj[3]["normalizedWidth"] *= width
#             obj[4]["normalizedHeight"] *= height
#             top_left = (int(obj[1]["centerXcor"] - obj[3]["normalizedWidth"] / 2),
#                         int(obj[2]["centerYcor"] - obj[4]["normalizedHeight"] / 2))
#             bottom_right = (int(obj[1]["centerXcor"] + obj[3]["normalizedWidth"] / 2),
#                             int(obj[2]["centerYcor"] + obj[4]["normalizedHeight"] / 2))
#             classDescription = list(obj[0].items())
#             classDescription = classDescription[0]
#             classCodeInYamlFile = classDescription[0]  # if ever needed when building own yaml file
#             one_frame_objs.append(
#                 {"frame": frame_num, "class": classDescription[1], "top_left": top_left, "bottom_right": bottom_right})

#         real_bounding_boxes.append(one_frame_objs)
#         one_frame_objs = []
#     if yaml_file == "coco8":
#         # used a new array even though we could reuse one, because test for the crowdedness dont need the actual location
#         # in the photo, just the exsistance, and some images wont load, so we still test for crowdedness in those
#         for frame in only_classes_all_frames:
#             count = 0
#             for find in frame:
#                 if count > 4:
#                     ans_value = 1
#                     break
#                 if find == "person":
#                     count += 1
#             if ans_value == 1:
#                 break


#     if yaml_file == "coco8":
#         return ans_value
#     else:
#         return ans_value, real_bounding_boxes


# def train_model(yaml_file, epochs):
#     main_directory = os.getcwd().replace("\\", "/")
#     model_to_train = yolo(f"{main_directory}/YOLOv8Extraction/yolov8x.yaml")
#     return model_to_train.train(data=yaml_file, epochs=epochs, workers=2)


# def active_detection(video):
#     # yaml_file for violence = data | yaml_file for crowd = coco8
#     # weights file for violence = Violence_best | weights file for violence = yolov8s
#     # first_time_setups()
#     violence_weights = "Violence_best"
#     violence_yaml_file = "data"
#     crowdedness_weights = "yolov8s"
#     crowdedness_yaml_file = "coco8"
#     folder_for_crowd_outputs = "VideosCrowdednessOutputs"
#     folder_for_violence_outputs = "VideosPredictionsOutputs"
#     main_directory = os.getcwd().replace("\\", "/")
#     if os.path.exists(f"{main_directory}/runs/detect/predict"):
#         os.rmdir(f"{main_directory}/runs/detect/predict")
#     if os.path.exists(f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{video[:str.rfind(video, '.')]}"):
#         print("Video already detected")
#         return
#     # Detect for violence
#     videoFileForFrames = video[:str.rfind(video, ".")]
#     define_and_predict_yolov8(video, violence_weights)  # gets the full file name
#     if os.path.exists(f"{main_directory}/runs"):
#         shutil.rmtree(f"{main_directory}/runs")
#     violence_value, real_bounding_boxes = get_frames_identify_vectors(videoFileForFrames, violence_yaml_file, folder_for_violence_outputs)
#     # If ciolence found detect for crowdedness
#     if violence_value == 1:
#         define_and_predict_yolov8(video, crowdedness_weights)  # gets the full file name
#         if os.path.exists(f"{main_directory}/runs"):
#             shutil.rmtree(f"{main_directory}/runs")
#         crowdedness_value = get_frames_identify_vectors(videoFileForFrames, crowdedness_yaml_file, folder_for_crowd_outputs)

#     return violence_value, crowdedness_value, real_bounding_boxes


from ultralytics import YOLO as yolo
import cv2
import yaml
import os
import shutil



def first_time_setups():
    main_directory = os.getcwd().replace("\\", "/")
    os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs")
    os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosPredictionsOutputs")


def printing_objects(obj_list):
    for obj in obj_list:
        print(obj)


def frame_capture(path):
    """Extract frames from a video with a given path"""
    print("Extracting frames..")
    main_directory = os.getcwd().replace("\\", "/")
    # Path to video file
    vidObj = cv2.VideoCapture(path)
    dirToCreate = path[:str.rfind(path, ".")]
    fullDir = f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{dirToCreate}"
    try:
        os.mkdir(fullDir)
    except:
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


def define_and_predict_yolov8(videoToPredict, weights):
    """ Define the model, predict and save the outcome into txt files given a video
    Calls the function to extract frames from the video"""
    main_directory = os.getcwd().replace("\\", "/")
    model = yolo(f"{main_directory}/YOLOv8Extraction/{weights}.pt")
    model.to("cuda")
    frame_capture(videoToPredict)
    print("Making a detection..")
    model.predict(videoToPredict, save=True, save_txt=True)
    src = f"{main_directory}/runs/detect/predict"
    if weights == "Violence_best":
        os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosPredictionsOutputs/" + videoToPredict[:str.rfind(videoToPredict, ".")])
        dst = f"{main_directory}/YOLOv8Extraction/VideosPredictionsOutputs/" + videoToPredict[:str.rfind(videoToPredict, ".")]
        allfiles = os.listdir(src)
        for file in allfiles:
            src_path = os.path.join(src, file)
            dst_path = os.path.join(dst, file)
            os.rename(src_path, dst_path)
        os.rmdir(src)
    else:
        os.mkdir(f"{main_directory}/YOLOv8Extraction/VideosCrowdednessOutputs/" + videoToPredict[
                                                                                  :str.rfind(videoToPredict, ".")])
        dst = f"{main_directory}/YOLOv8Extraction/VideosCrowdednessOutputs/" + videoToPredict[
                                                                               :str.rfind(videoToPredict, ".")]
        allfiles = os.listdir(src)
        for file in allfiles:
            src_path = os.path.join(src, file)
            dst_path = os.path.join(dst, file)
            os.rename(src_path, dst_path)
        os.rmdir(src)



def get_frames_identify_vectors(videoFileName, yaml_file, folder):
    """Given a video name that has been predicted, get the predictions and call a function to identify classes"""
    main_directory = os.getcwd().replace("\\", "/")
    directory = fr"{main_directory}/YOLOv8Extraction/{folder}/{videoFileName}/labels/"
    count = 0
    framesDetectionVectors = []
    # Iterate directory
    for path in os.listdir(directory):
        # check if current path is a file
        if os.path.isfile(os.path.join(directory, path)):
            count += 1
    for file in range(1, count + 1):
        try:
            currentFile = open(directory + videoFileName + "_" + str(file) + ".txt")
        except FileNotFoundError:
            if os.path.exists(fr"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{videoFileName}/frame{str(file)}.jpg"):
                os.remove(fr"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{videoFileName}/frame{str(file)}.jpg")
            continue
        framesDetectionVectors.append(currentFile.readlines())
    # printing_objects(framesDetectionVectors)
    return identify_classes(framesDetectionVectors, videoFileName, yaml_file, count)


def show_boundingBox_image(img, top_left, bottom_right):
    img2 = cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 5)
    cv2.imshow("image", img2)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def identify_classes(processed_frames, videoFileName, yaml_file, num_of_frames):
    main_directory = os.getcwd().replace("\\", "/")
    yolo_classes = open(f"{main_directory}/YOLOv8Extraction/{yaml_file}.yaml", encoding="utf8")
    names = yaml.safe_load(yolo_classes)["names"]
    foundClasses = []
    boundingBoxes = []
    objsInFrame = []
    LocationOfObj = []
    only_classes_all_frames = []
    ans_value = 0
    for frame in processed_frames:
        current_frame = []
        for obj in frame:
            objClass = int(obj.split()[0])
            centerXcor, centerYcor, normalizedWidth, normalizedHeight = obj.split()[1:]
            LocationOfObj.append([{objClass: names[objClass]},
                                  {"centerXcor": float(centerXcor)},
                                  {"centerYcor": float(centerYcor)},
                                  {"normalizedWidth": float(normalizedWidth)},
                                  {"normalizedHeight": float(normalizedHeight)}])
            objsInFrame.append({objClass: names[objClass]})
            current_frame.append(names[objClass])
        foundClasses.append(objsInFrame)
        boundingBoxes.append(LocationOfObj)
        only_classes_all_frames.append(current_frame)
        objsInFrame = []
        LocationOfObj = []
    real_bounding_boxes = []
    one_frame_objs = []
    for i, frame in enumerate(boundingBoxes):
        frame_num = "frame" + str(i + 1)
        imgSrc = f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{videoFileName}/{frame_num}.jpg"
        img = cv2.imread(imgSrc)
        try:
            height, width = img.shape[0], img.shape[1]
        except AttributeError:
            continue
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
                {"frame": frame_num, "class": classDescription[1], "top_left": top_left, "bottom_right": bottom_right})

        real_bounding_boxes.append(one_frame_objs)
        one_frame_objs = []
    if yaml_file == "data":
                ans_value = assert_violence(real_bounding_boxes, num_of_frames)
    if yaml_file == "coco8":
        # used a new array even though we could reuse one, because test for the crowdedness dont need the actual location
        # in the photo, just the exsistance, and some images wont load, so we still test for crowdedness in those
        for frame in only_classes_all_frames:
            count = 0
            for find in frame:
                if count > 4:
                    ans_value = 1
                    break
                if find == "person":
                    count += 1
            if ans_value == 1:
                break


    if yaml_file == "coco8":
        return ans_value
    else:
        return ans_value, real_bounding_boxes


def assert_violence(detections, frames_amount):
    consecutive_frames = 5
    print(f"NUM OF FRAMES {frames_amount}")
    images_threshold = frames_amount * 0.1
    print(f"==============THE PRECENTAGE IS {images_threshold}")
    prev_consecutive_frames = 0
    current_consecutive_frames = 0
    num_of_frame_violent = 0
    first_loop = True
    consecutive_frames_of_violence = False
    is_video_mostly_violent = False
    for frame in detections:
        for detecion in frame:
            if first_loop:
                if  detecion["class"] == "Violence":
                    prev_consecutive_frames = current_consecutive_frames = current_consecutive_frames + 1
                first_loop = False
            elif detecion["class"] == "Violence":
                num_of_frame_violent += 1
                if prev_consecutive_frames == 1:
                    current_consecutive_frames += 1
                else:
                    prev_consecutive_frames = current_consecutive_frames = 1
            else:
                prev_consecutive_frames = current_consecutive_frames = 0
        if current_consecutive_frames == consecutive_frames:
            consecutive_frames_of_violence = True
    print(f"======== THE FOUND VIOLENCE IMAGES IS {num_of_frame_violent}")
    if num_of_frame_violent > images_threshold:
        is_video_mostly_violent = True
    if consecutive_frames_of_violence and is_video_mostly_violent:
        return 1
    else:
        return 0

            
            




def train_model(yaml_file, epochs):
    main_directory = os.getcwd().replace("\\", "/")
    model_to_train = yolo(f"{main_directory}/YOLOv8Extraction/yolov8x.yaml")
    return model_to_train.train(data=yaml_file, epochs=epochs, workers=2)


def active_detection(video):
    # yaml_file for violence = data | yaml_file for crowd = coco8
    # weights file for violence = Violence_best | weights file for violence = yolov8s
    # first_time_setups()
    violence_weights = "Violence_best"
    violence_yaml_file = "data"
    crowdedness_weights = "yolov8s"
    crowdedness_yaml_file = "coco8"
    folder_for_crowd_outputs = "VideosCrowdednessOutputs"
    folder_for_violence_outputs = "VideosPredictionsOutputs"
    main_directory = os.getcwd().replace("\\", "/")
    if os.path.exists(f"{main_directory}/runs/detect/predict"):
        os.rmdir(f"{main_directory}/runs/detect/predict")
    if os.path.exists(f"{main_directory}/YOLOv8Extraction/VideosFramesOutputs/{video[:str.rfind(video, '.')]}"):
        print("Video already detected")
        return
    # Detect for violence
    videoFileForFrames = video[:str.rfind(video, ".")]
    define_and_predict_yolov8(video, violence_weights)  # gets the full file name
    if os.path.exists(f"{main_directory}/runs"):
        shutil.rmtree(f"{main_directory}/runs")
    violence_value, real_bounding_boxes = get_frames_identify_vectors(videoFileForFrames, violence_yaml_file, folder_for_violence_outputs)
    # If ciolence found detect for crowdedness
    if violence_value == 1:
        define_and_predict_yolov8(video, crowdedness_weights)  # gets the full file name
        if os.path.exists(f"{main_directory}/runs"):
            shutil.rmtree(f"{main_directory}/runs")
        crowdedness_value = get_frames_identify_vectors(videoFileForFrames, crowdedness_yaml_file, folder_for_crowd_outputs)

    return violence_value, crowdedness_value, real_bounding_boxes