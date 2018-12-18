import numpy
from keras.models import Sequential
from keras.layers import Dense, Activation, InputLayer, Dropout
from keras.optimizers import SGD
from keras.callbacks import TensorBoard


class Network:
    def __init__(self, path):
        self.model = Sequential()
        self.number_characteristics = 5
        self.weight_path = path
        self.model.add(InputLayer((self.number_characteristics,)))
        self.model.add(Dense(100, activation='relu'))
        self.model.add(Dense(4, activation='relu'))
        self.model.compile(optimizer=SGD(lr=0.1), loss='categorical_crossentropy', metrics=['acc'])
        self.load()

    def save(self):
        try:
            self.model.save_weights(self.weight_path)
        except Exception as e:
            print(e)

    def load(self):
        try:
            self.model.load_weights(self.weight_path)
        except Exception as e:
            print(e)

    def train(self, train_x, train_y):
        self.model.fit(train_x, train_y, batch_size=len(train_x), epochs=100)
        self.save()

    def predict(self, characteristics):
        return [numpy.argmax(line) for line in self.model.predict(characteristics)]
