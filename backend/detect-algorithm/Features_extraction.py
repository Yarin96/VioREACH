import tensorflow as tf
from keras.applications import VGG16
import numpy as np

base_model = VGG16(weights="imagenet", include_top=False)
model = tf.keras.models.Model(inputs=base_model.input, outputs=base_model.get_layer("block4_conv1").output)

img = tf.keras.preprocessing.image.load_img("VideosFramesOutputs/V_3/frame1.jpg", target_size=(244, 244))

x = tf.keras.preprocessing.image.img_to_array(img)
x = tf.keras.applications.vgg16.preprocess_input(x)

features = model.predict(tf.expand_dims(x, axis=0))

features = features.flatten()
np.savetxt("features.txt",features)


