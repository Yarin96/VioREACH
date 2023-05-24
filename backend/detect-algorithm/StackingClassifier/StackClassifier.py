import pickle

import pandas as pd
import xgboost
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split


def define_tree(dataset):
    df = pd.read_csv(dataset)
    X = df.drop(["fight"], axis=1)
    X = X.drop(['video_num'], axis=1)
    X = X.drop(['video_file_name'], axis=1)
    X = X.drop(['threat / action'], axis=1)
    y = df.iloc[:, 2]
    X = X.drop(['level_of_violence'], axis=1)
    dic = {"0" : 0, "1" : 0, "2" : 0, "3" : 0}
    for val in y:
        dic[str(val)] += 1
    print(dic)
    ############################################ TO HERE ALL GOOD
    X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=99)
    xbg = xgboost.XGBClassifier(objective="multi:softmax", validate_parameters=True, num_class=4)

    # Train
    xbg.fit(X_train, y_train)

    # Evaluate
    y_pred = xbg.predict(X_test)
    print_stats(xbg, y_test, y_pred, X_test)
    pickle.dump(xbg, open('rt.pkl', 'wb'))


def print_stats(model, yt, yp, xt):
    print(f"The features importance:\n{model.feature_importances_}")
    print(f"Confusion matrix(value 2 in row 1 and value 1 in row 2 are negatives):\n {confusion_matrix(yt, yp)}")
    print(f"Accuracy score: {accuracy_score(yt, yp)}")
    print(f"Cross values score: {cross_val_score(model, xt, yt, cv=10)}")


def reuse_model(name, prediction):
    saved_model = pickle.load(open(f'C:/FinalPorject/backend/detect-algorithm/StackingClassifier/{name}.pkl', 'rb'))
    print(saved_model.predict(prediction))


def activation(vector):
    direc = 'C:/FinalPorject/backend/detect-algorithm/StackingClassifier/featuresT.csv'
    # define_tree(direc)
    vector_df = pd.DataFrame(vector, columns=["weapons", "yell", "throw", "crowdiness", "Fast Moves", "Blood", "violence"])
    print(vector_df)
    reuse_model("rt", vector_df)


