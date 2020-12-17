import os
import random
import textGenerator
import re
import numpy as np
import generatedReviews
from sklearn.utils import shuffle

if __name__ == "__main__":
    tg = textGenerator.Generator(0.01, 'aclImdb/test/neg')
    reviewlst = []
    for filename in os.listdir("aclImdb/test/pos"):
        if random.random() < 0.1:
            with open("aclImdb/test/pos/" + filename, 'r') as fh:
                try:
                    lines = fh.readlines()
                except UnicodeDecodeError:
                    lines = ["", ""]
            string1 = "".join(lines)
            string2 = re.sub('<br />', "", string1)
            string3 = re.sub('[^0-9a-zA-Z ]+', '', string2)
            string3 = string3.lower()
            reviewlst.append(string3[:200])
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
        print(row)
        try:
            x_data.append([num_dict[char] for char in row[0]])
        except KeyError:
            numErrors = numErrors + 1
            print('KeyError ', numErrors)
        y_data.append(row[1])
    print(x_data, y_data)
    X = np.reshape(x_data, (len(x), length, 1))
    X = X / dict_len
    y = np_utils.to_categorical(y_data)
    return X, y


