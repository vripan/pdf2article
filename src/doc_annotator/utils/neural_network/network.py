import numpy as np
from keras.models import Sequential
from keras.layers import Dense
import tensorflow as tf
from doc_annotator import app


class Network:
    def __init__(self):
        self.network_data_file_location = app.config['NETWORK_DATA']
        self.model = None
        self.graph = None

        self.create_model()

    def create_model(self):
        self.model = Sequential()
        self.model.add(Dense(5, input_shape=(app.config['NUMBER_OF_CHARACTERISTICS'],), activation='relu'))
        self.model.add(Dense(100, activation='relu'))
        self.model.add(Dense(3, activation='linear'))
        self.model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

        self.graph = tf.get_default_graph()

    def save(self):
        try:
            self.model.save_weights(self.network_data_file_location)
        except Exception as e:
            print("Failed to save trained data")

    def load(self):
        try:
            self.model.load_weights(self.network_data_file_location)
        except Exception as e:
            print("Failed to load trained data")

    def train(self, train_x, train_y):
        self.model.fit(train_x, train_y, batch_size=len(train_x), epochs=100)
        self.save()

    def single_predict(self, characteristic):
        with self.graph.as_default():
            predict = self.model.predict(np.array([np.array(list(characteristic))]))[0]
            return int(np.argmax(predict))

    def predict(self, characteristics):
        results = characteristics
        for page in characteristics:
            for idx, characteristic in enumerate(characteristics[page]):
                val = self.single_predict(characteristic[4])
                aux_val = list(results[page][idx])
                aux_val.append(val)
                results[page][idx] = tuple(aux_val)

        return results
