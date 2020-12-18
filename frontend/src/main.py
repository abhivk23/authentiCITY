import os
import random
# import textGenerator
import re
import numpy as np
import generatedReviews
from sklearn.utils import shuffle
# from keras.models import Sequential
# from keras.layers import Dense, Flatten
# from keras.utils import np_utils
# from keras.callbacks import ModelCheckpoint
from sklearn.model_selection import train_test_split
# from sklearn.metrics import confusion_matrix
from math import floor
from keras import models

if __name__ == "__main__":
    # tg = textGenerator.Generator(0.01, 'aclImdb/test/neg')
    reviewlst = []
    for filename in os.listdir("aclImdb/test/pos"):
        if random.random() < 0.1:
            with open("aclImdb/test/pos/" + filename, 'r') as fh:
                try:
                    lines = fh.readlines()
                except UnicodeDecodeError:
                    lines = ["", ""]
            string = "".join(lines)
            string = re.sub('<br />', "", string)
            string = re.sub('[^0-9a-zA-Z ]+', '', string)
            string = string.lower()
            if len(string) >= 200:
                reviewlst.append(string)

    reviewArr = np.array(reviewlst)
    reviewArr = reviewArr.reshape(np.size(reviewArr), 1)
    reviewArr = np.concatenate((reviewArr, np.ones(reviewArr.shape, dtype=int)), axis=1)
    fakeReviewLst = generatedReviews.combine_strings()
    fakeReviewArr = np.array(fakeReviewLst).reshape(699, 1)
    fakeReviewArr = np.concatenate((fakeReviewArr, np.zeros(fakeReviewArr.shape, dtype=int)), axis=1)
    allReviews = np.concatenate((fakeReviewArr, reviewArr))
    allReviews = shuffle(allReviews)
    chars = sorted(list(set('0123456789abcdefghijklmnopqrstuvwxyz ')))
    num_dict = dict((char, index) for index, char in enumerate(chars))
    x_data = []
    y_data = []
    numErrors = 0
    for row in allReviews:
        # print(row)
        try:
            x_data.append([num_dict[char] for char in row[0]][:200])
            y_data.append(int(row[1]))
        except KeyError:
            numErrors = numErrors + 1
            # print('KeyError ', numErrors)
    # print(x_data, y_data)
    X = np.array(x_data)
    X = X[:1000, :]
    X = X / 40
    # print(X)
    y = np.array(y_data)
    y = y[:1000].reshape(1000,)
    print(X.shape, y.shape)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)
    print(X_train, y_train)

    # model = Sequential([
    #     Dense(200, activation="relu"),
    #     Dense(16, activation="relu"),
    #     Dense(16, activation="relu"),
    #     Dense(1, activation="sigmoid")])
    #
    # model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    #
    #
    # filepath = "model_weights"
    # model.load(filepath)
    # # checkpoint = ModelCheckpoint(filepath, monitor='loss', verbose=1, save_best_only=True, mode='min')
    # # desired_callbacks = [checkpoint]
    # # model.fit(X_train, y_train, epochs=50, callbacks=desired_callbacks, validation_split=0.1)
    # # model.save(filepath)
    # # y_pred = model.predict(X_test)
    # # print(y_pred.shape)
    # # y_pred[y_pred < 0.5] = 0
    # # y_pred[y_pred > 0.5] = 1
    # # y_pred = y_pred.astype('int32')
    # # print(confusion_matrix(y_test, y_pred))
    # model.compile(loss="binary_crossentropy", optimizer='adam')
    model = models.load_model("model_weights")

    def predict_real(strng):
        strng = re.sub('[^0-9a-zA-Z ]+', '', strng)
        strng = strng.lower()
        num_lst = [num_dict[char] for char in strng]
        length = len(num_lst)
        if length <= 200:
            num_lst = floor(200 / length) * num_lst + num_lst[:(200 % length)]
        else:
            num_lst = num_lst[:200]
        num_arr = np.array(num_lst) / 40
        num_arr = num_arr.reshape(1, 200)
        predicted = model.predict(num_arr)
        return round(predicted[0, 0]) == 1
