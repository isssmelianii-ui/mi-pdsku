from datetime import datetime
from bson import ObjectId
import app.database as database

class ReviewModel:
    @staticmethod
    def get_collection():
        return database.db["reviews"]

    @staticmethod
    def create(data):
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        result = ReviewModel.get_collection().insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def find_all():
        reviews = []
        for review in ReviewModel.get_collection().find():
            review["_id"] = str(review["_id"])
            reviews.append(review)
        return reviews

    @staticmethod
    def find_by_id(review_id):
        if not ObjectId.is_valid(review_id):
            return None
        review = ReviewModel.get_collection().find_one({"_id": ObjectId(review_id)})
        if review:
            review["_id"] = str(review["_id"])
        return review

    @staticmethod
    def find_by_product(product_id):
        reviews = []
        for review in ReviewModel.get_collection().find({"product_id": product_id}):
            review["_id"] = str(review["_id"])
            reviews.append(review)
        return reviews

    @staticmethod
    def update(review_id, data):
        if not ObjectId.is_valid(review_id):
            return False
        data["updated_at"] = datetime.utcnow()
        result = ReviewModel.get_collection().update_one(
            {"_id": ObjectId(review_id)}, {"$set": data}
        )
        return result.matched_count > 0

    @staticmethod
    def delete(review_id):
        if not ObjectId.is_valid(review_id):
            return False
        result = ReviewModel.get_collection().delete_one({"_id": ObjectId(review_id)})
        return result.deleted_count > 0