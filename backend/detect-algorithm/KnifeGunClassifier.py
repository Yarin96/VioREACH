import tensorflow as tf
import os
from matplotlib import pyplot as plt
import numpy as np
import cv2
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dense, Flatten
from keras.metrics import Precision, Recall, BinaryAccuracy
from keras.models import load_model


def set_gpu_memory():
    gpus = tf.config.list_physical_devices("GPU")
    print(gpus)
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)


def plot_four_images_with_classes(batch):
    fig, ax = plt.subplots(ncols=4, figsize=(20, 20))
    for idx, img in enumerate(batch[0][:4]):
        ax[idx].imshow(img)
        ax[idx].title.set_text(batch[1][idx])
    plt.show()


def show_one_image(path):
    img = cv2.imread(path)
    print(img.shape)
    plt.imshow(img)
    plt.show()


def set_data():
    gunsFolder = "./Data/Gun"
    knifesFolder = "./Data/Knife"
    knifeClass = 1
    gunClass = 0
    # load the data - building the classes and labels and all that shit:
    data = tf.keras.utils.image_dataset_from_directory("Data")
    # Access the data pipeline, and loop through it
    data_iterator = data.as_numpy_iterator()
    # Get one batch from it, its of length 2 - first is images, second is labels ( batch[0] - all the images, batch[1] - labels)
    # on default each batch has 32 images - its defined in the tf.keras.utils.image_dataset_from_directory("Data") function
    batch = data_iterator.next()
    # scale the values from range 0 - 255 to 0 - 1, x is images, y is labels
    data = data.map(lambda x, y: (x / 255, y))
    scaled_iterator = data.as_numpy_iterator()
    scaled_batch = scaled_iterator.next()
    return split_data(data)


def split_data(data):
    train_size = int(len(data) * 0.7)
    val_size = int(len(data) * 0.2)
    test_size = int(len(data) * 0.1) + 1
    print(f"Data total: {len(data)}\nTrain: {train_size}\nVal: {val_size}\nTest: {test_size}")
    train = data.take(train_size)
    val = data.skip(train_size).take(val_size)
    test = data.skip(train_size + val_size).take(test_size)
    return train, val, test


def define_model():
    model = Sequential()
    # adding 3 convolution layers, the first layer is input with 16 neurons sized (3,3) moving 1 pixel each time
    # using the relu algorithm
    model.add(Conv2D(16, (3, 3), 1, activation="relu", input_shape=(256, 256, 3)))
    # MaxPooling2D = takes the max value from the relu activation, condense the information
    model.add(MaxPooling2D())
    # second layer
    model.add(Conv2D(32, (3, 3), 1, activation="relu"))
    model.add(MaxPooling2D())
    # third layer
    model.add(Conv2D(16, (3, 3), 1, activation="relu"))
    model.add(MaxPooling2D())
    # flattening the results down from the layers, so we get 1 value for the dense layer
    model.add(Flatten())
    # fully connected layer with relu activation - dense layer
    model.add(Dense(256, activation="relu"))
    # sigmoid activation gives a value of between 0 and 1, each will be connected to one of the classes
    model.add(Dense(1, activation="sigmoid"))

    # attampt at making this classifier as multi-class:
    # model.add(Dense(3, activation="softmax"))
    # model.compile("adam", loss=tf.losses.BinaryCrossentropy(), metrics=["accuracy"])

    # compiling the model using the adam optimizer, and loss function as BinaryCrossentropy because the problem here is binary
    model.compile("adam", loss=tf.losses.BinaryCrossentropy(), metrics=["accuracy"])

    return model


def activate_model(model, sets):
    model.summary()
    train, val, test = sets
    tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir="./logs")
    hist = model.fit(train, epochs=50, validation_data=val, callbacks=[tensorboard_callback])
    plot_performance_accuracy(hist)
    # model_evaluation(test, model)
    # model_testing(model)
    # save_model(model)


def save_model(model):
    model.save(os.path.join("models", "knifeOrGunModel.h5"))


def plot_performance_loss(hist):
    fig = plt.figure()
    plt.plot(hist.history["loss"], color="teal", label="loss")
    plt.plot(hist.history["val_loss"], color="orange", label="val_loss")
    fig.suptitle("Loss", fontsize=20)
    plt.legend(loc="upper left")
    plt.show()


def plot_performance_accuracy(hist):
    fig = plt.figure()
    plt.plot(hist.history["accuracy"], color="teal", label="accuracy")
    plt.plot(hist.history["val_accuracy"], color="orange", label="val_accuracy")
    fig.suptitle("Accuracy", fontsize=20)
    plt.legend(loc="upper left")
    plt.show()


def model_evaluation(test, model):
    pre = Precision()
    re = Recall()
    acc = BinaryAccuracy()
    for batch in test.as_numpy_iterator():
        X, y = batch
        yPred = model.predict(X)
        pre.update_state(y, yPred)
        re.update_state(y, yPred)
        acc.update_state(y, yPred)
    print(pre.result(), re.result(), acc.result())
    # values closest to 1 is best


def model_testing(model):
    gun = cv2.imread("./test.jpg")
    knife = cv2.imread("./test2.jpg")
    resizedGun = tf.image.resize(gun, (256, 256))
    resizedKnife = tf.image.resize(knife, (256, 256))
    plt.show()
    yPred = model.predict(np.expand_dims(resizedKnife / 255, 0))
    print(f"FOR FIRST PIC: (should be a knife, {yPred}")
    if yPred > 0.5:
        print("This is just a knife")
    else:
        print("This is a fucking gun!")
    yPred = model.predict(np.expand_dims(resizedGun / 255, 0))
    print(f"FOR SECOND PIC: (should be a gun, {yPred}")
    if yPred > 0.5:
        print("This is just a knife")
    else:
        print("This is a fucking gun!")


def reuse_model(model_name):
    resume_model = load_model(os.path.join("models", model_name + ".h5"))
    # model_testing(resume_model)


if __name__ == "__main__":
    # specific_Path = os.path.join("Data", "Gun", "1.jpeg")
    # show_one_image(specific_Path)
    set_gpu_memory()
    activate_model(define_model(), set_data())
    # reuse_model("KnifeOrGunModel")


