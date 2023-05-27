import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score, ConfusionMatrixDisplay
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from scipy.stats import randint
from sklearn.model_selection import cross_val_score
import pickle
import csv
import os


def define_tree(dataset):
    df = pd.read_csv(dataset)
    X = df.iloc[:, : -1]
    X = X.drop(['video_num'], axis=1)
    X = X.drop(['video_file_name'], axis=1)
    X = X.drop(['level_of_violence'], axis=1)
    X = X.drop(['threat / action'], axis=1)
    y = df.iloc[:, -1]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=99)
    # criterion = The function to measure the quality of a split. max depth = of the tree. min sampels = to break a branch to a 2 new branchs
    clf = RandomForestClassifier(criterion="gini", max_depth=8, min_samples_split=10, random_state=99)
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    print_stats(clf, y_test, y_pred, X_test)
    pickle.dump(clf, open(f'{os.getcwd()}/rt.pkl', 'wb'))


def print_stats(model, yt, yp, xt):
    print(f"The features importance:\n{model.feature_importances_}")
    print(f"Confusion matrix(value 2 in row 1 and value 1 in row 2 are negatives):\n {confusion_matrix(yt, yp)}")
    print(f"Accuracy score: {accuracy_score(yt, yp)}")
    print(f"Cross values score: {cross_val_score(model, xt, yt, cv=10)}")


def reuse_model(prediction):
    saved_model = pickle.load(open(f'{os.getcwd()}/rt.pkl', 'rb'))
    print(saved_model.predict(prediction))


def activation(vector):
    # define_tree("features.csv")
    vector_df = pd.DataFrame(vector, columns=["weapons", "fight", "yell", "throw", "crowdiness", "Fast Moves", "Blood"])
    reuse_model(vector_df)

