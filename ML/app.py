from flask import Flask, request, jsonify
import pickle
import pandas as pd
import json
# Your API definition
app = Flask(__name__)

model = pickle.load(open("model.pkl","rb"))
@app.route('/api', methods = ['GET','POST'])
def predict():
    data = request.json
    query = data['my_array']

    prediction = model.predict(query)

    return jsonify({'prediction': list(prediction)})

        

   
   
if __name__ == "__main__":

    app.run()