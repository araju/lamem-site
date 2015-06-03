# parse image json file and subsample it
import json
import random

jsonFile = 'allimages.json'
outNum = 10000
outFileName = 'images.json'

with open(jsonFile) as data_file:    
    data = json.load(data_file)

random.shuffle(data)
data = data[:outNum]

with open(outFileName, 'w') as outFile:
    json.dump(data, outFile)

