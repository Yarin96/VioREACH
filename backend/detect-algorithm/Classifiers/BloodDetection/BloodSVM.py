import pandas as pd
import os
from skimage.transform import resize
from skimage.io import imread
import numpy as np
import matplotlib.pyplot as plt
from sklearn import svm
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
import pickle


input_dir = "BloodDetection/data/"
categories = ['Blood', 'NoBlood']


def set_data():
    data = []
    labels = []
    for index, category in enumerate(categories):
        for file in os.listdir(os.path.join(input_dir, category)):
            img_path = os.path.join(input_dir, category, file)
            img = imread(img_path)
            img = resize(img, (15, 15))
            data.append(img.flatten())
            labels.append(index)

    data = np.asarray(data)
    labels = np.asarray(labels)
    # Split data
    return train_test_split(data, labels, test_size=0.2, stratify=labels, shuffle=True)


def predict_model(img_pred, model):
    y_pred = model.predict(img_pred)
    return y_pred
    # score = accuracy_score(y_pred, y_test)
    # print("{}% of samples are correctly classified".format(str(score * 100)))
    # print(classification_report(y_test, y_pred, target_names=['Blood', 'NoBlood']))


def classify():
    # stratify - keep the same proportion for each label
    x_train, x_test, y_train, y_test = set_data()

    classifier = svm.SVC(probability=True)
    # needed to define because we are learning on different levels of gamma and value that show one image in few forms
    # training 32 classifiers on each image, and we will pick the best
    parameters = [{'C': [0.1, 1, 10, 100], 'gamma':[0.0001, 0.001, 0.1, 1], 'kernel':['rbf', 'poly']}]
    grid_search = GridSearchCV(classifier, parameters)
    grid_search.fit(x_train, y_train)
    best_model = grid_search.best_estimator_
    predict_model(x_test, y_test, best_model)


    # save the model
    # pickle.dump(best_model, open("./model.p", "wb"))


def reuse_model(img_path):
    """Enter the directory"""
    # x_train, x_test, y_train, y_test = set_data()
    # to load the model:
    model = pickle.load(open("BloodDetection/model.p", "rb"))
    img = imread(img_path)
    img = resize(img, (15, 15))
    img = [img.flatten()]
    img = np.asarray(img)
    return predict_model(img, model)









