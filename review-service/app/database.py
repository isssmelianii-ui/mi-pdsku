import os
from flask import Flask
from pymongo import MongoClient

client = None
db = None

def init_db(app: Flask):
    global client, db
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
    db_name = os.getenv("MONGO_DB_NAME", "reviewdb")
    
    client = MongoClient(mongo_uri)
    db = client[db_name]
    
    # Simpan instance database ke app.config agar bisa diakses jika diperlukan
    app.config["MONGO_CLIENT"] = client
    app.config["MONGO_DB"] = db
    
    print(f"Berhasil terhubung ke database MongoDB: {db_name}")