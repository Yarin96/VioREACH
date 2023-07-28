import os
import pickle

import cv2
import numpy as np
from skimage.feature import hog
from skimage.io import imread
from sklearn import svm
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split

input_dir = f"{os.getcwd()}/data/"
categories = ['Blood', 'NoBlood']
input_features_expected = 1211544


def set_data():
    """Set the data for the training"""
    data = []
    labels = []
    max_feature_length = 0  # Maximum length of HOG features
    for index, category in enumerate(categories):
        for file in os.listdir(os.path.join(input_dir, category)):
            img_path = os.path.join(input_dir, category, file)
            img = imread(img_path)
            hog_features = extract_features(img)
            data.append(hog_features)
            labels.append(index)
            max_feature_length = max(max_feature_length, len(hog_features))

    # Pad or truncate HOG features to a fixed length
    for i in range(len(data)):
        feature_length = len(data[i])
        if feature_length < max_feature_length:
            data[i] = np.pad(data[i], (0, max_feature_length - feature_length), mode='constant')
        elif feature_length > max_feature_length:
            data[i] = data[i][:max_feature_length]

    data = np.asarray(data)
    labels = np.asarray(labels)

    return train_test_split(data, labels, test_size=0.2, stratify=labels, shuffle=True)


def classify():
    """Define SVM models and save the best one"""
    # stratify - keep the same proportion for each label
    x_train, x_test, y_train, y_test = set_data()
    classifier = svm.SVC(probability=True)
    # needed to define because we are learning on different levels of gamma and value that show one image in few forms
    # training 24 classifiers on each image, and we will pick the best
    parameters = [{'C': [0.1, 1, 10, 100], 'gamma': [0.001, 0.1, 1], 'kernel': ['rbf', 'poly']}]
    grid_search = GridSearchCV(classifier, parameters, verbose=2, cv=4)
    grid_search.fit(x_train, y_train)
    best_model = grid_search.best_estimator_
    y_pred = predict_model(x_test, best_model)
    print(accuracy_score(y_true=y_test, y_pred=y_pred))

    # save the model
    pickle.dump(best_model, open("./modelwithHOG.p", "wb"))


def predict_model(img_pred, model):
    """Make a prediction given an image and model"""
    y_pred = model.predict(img_pred)
    return y_pred


def print_accuracy_results(pred, test):
    """Print to the console the accuracy resaults for given model"""
    score = accuracy_score(pred, test)
    print("{}% of samples are correctly classified".format(str(score * 100)))
    print(classification_report(test, pred, target_names=['Blood', 'NoBlood']))


def reuse_model(img_path):
    """Enter the directory, returns the prediction for this image"""
    # x_train, x_test, y_train, y_test = set_data()
    # to load the model:
    main_directory = os.getcwd().replace("\\", "/")
    model = pickle.load(open(f"{main_directory}/Classifiers/BloodDetection/modelwithHOG.p", "rb"))
    img = imread(img_path)
    hog_features = extract_features(img)
    feature_length = len(hog_features)
    if feature_length < input_features_expected:
        hog_features = np.pad(hog_features, (0, input_features_expected - feature_length), mode='constant')
    elif feature_length > input_features_expected:
        hog_features = hog_features[:input_features_expected]
    img = np.asarray([hog_features])
    return predict_model(img, model)


def extract_color_features(image):
    """Extract color features, deviation and mean for every color channel"""
    mean_red = np.mean(image[:, :, 0])
    std_red = np.std(image[:, :, 0])
    mean_green = np.mean(image[:, :, 1])
    std_green = np.std(image[:, :, 1])
    mean_blue = np.mean(image[:, :, 2])
    std_blue = np.std(image[:, :, 2])

    color_features = np.array([mean_red, std_red, mean_green, std_green, mean_blue, std_blue])

    return color_features


def extract_hog_features(image):
    """Gets features using HOG on grayscaled image"""
    if len(image.shape) == 2:
        gray = image
    else:
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY).astype(np.uint8)

    # Calculate HOG features
    features = hog(gray, orientations=9, pixels_per_cell=(8, 8),
                   cells_per_block=(2, 2), block_norm='L2-Hys',
                   transform_sqrt=True, feature_vector=True)

    return features


def extract_features(image):
    """Returing features array consists of both HOG features and color features"""
    hog_features = extract_hog_features(image)
    color_features = extract_color_features(image)

    # Concatenate the HOG and color features
    features = np.concatenate((hog_features, color_features), axis=0)

    return features
