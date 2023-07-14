import pickle
import pandas as pd
import xgboost
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
import os


def define_xgboost(dataset):
    df = pd.read_csv(dataset)
    X = df.drop(["fight"], axis=1)
    X = X.drop(['video_num'], axis=1)
    X = X.drop(['video_file_name'], axis=1)
    X = X.drop(['threat / action'], axis=1)
    y = df.iloc[:, 2]
    X = X.drop(['level_of_violence'], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=99)
    xbg = xgboost.XGBClassifier(objective="multi:softmax", validate_parameters=True, num_class=4)

    # Train
    xbg.fit(X_train, y_train)

    # Evaluate
    y_pred = xbg.predict(X_test)
    print_stats(xbg, y_test, y_pred, X_test)
    # pickle.dump(xbg, open(f'{os.getcwd()}/rt.pkl', 'wb'))


def print_stats(model, yt, yp, xt):
    print(f"The features importance:\n{model.feature_importances_}")
    print(f"Confusion matrix(value 2 in row 1 and value 1 in row 2 are negatives):\n {confusion_matrix(yt, yp)}")
    print(f"Accuracy score: {accuracy_score(yt, yp)}")
    print(f"Cross values score: {cross_val_score(model, xt, yt, cv=10)}")


def reuse_model(prediction):
    saved_model = pickle.load(open(f'{os.getcwd()}/StackingClassifier/rt.pkl', 'rb'))
    return saved_model.predict(prediction)


def activation(vector):
    # direc = f'{os.getcwd()}/features.csv'
    # define_xgboost(direc)
    vector_df = pd.DataFrame(vector, columns=["crowdiness", "Fast Moves", "Blood", "violence"])
    return reuse_model(vector_df)

define_xgboost("./features.csv")