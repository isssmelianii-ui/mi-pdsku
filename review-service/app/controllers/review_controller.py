from flask import request, jsonify
from marshmallow import ValidationError
from app.services.review_service import ReviewService
from app.schemas.review_schema import ReviewSchema, ReviewUpdateSchema
from app.exceptions import AppError

class ReviewController:
    @staticmethod
    def create_review():
        json_data = request.get_json()
        if not json_data:
            return jsonify({"error": "Data request kosong atau bukan JSON valid."}), 400

        try:
            schema = ReviewSchema()
            data = schema.load(json_data)
            
            review_id = ReviewService.create_review(data)
            return jsonify({
                "message": "Review berhasil ditambahkan",
                "review_id": review_id
            }), 201

        except ValidationError as err:
            return jsonify({"error": err.messages}), 400
        except AppError as e:
            return jsonify({"error": e.message}), e.status_code

    @staticmethod
    def get_all_reviews():
        try:
            reviews = ReviewService.get_all_reviews()
            return jsonify(reviews), 200
        except AppError as e:
            return jsonify({"error": e.message}), e.status_code

    @staticmethod
    def get_review_by_id(review_id):
        try:
            review = ReviewService.get_review_by_id(review_id)
            return jsonify(review), 200
        except AppError as e:
            return jsonify({"error": e.message}), e.status_code

    @staticmethod
    def get_reviews_by_product(product_id):
        try:
            reviews = ReviewService.get_reviews_by_product(product_id)
            return jsonify(reviews), 200
        except AppError as e:
            return jsonify({"error": e.message}), e.status_code

    @staticmethod
    def update_review(review_id):
        json_data = request.get_json()
        if not json_data:
            return jsonify({"error": "Data request kosong atau bukan JSON valid."}), 400

        try:
            schema = ReviewUpdateSchema()
            data = schema.load(json_data)
            
            updated_review = ReviewService.update_review(review_id, data)
            return jsonify({
                "message": "Review berhasil diperbarui",
                "data": updated_review
            }), 200

        except ValidationError as err:
            return jsonify({"error": err.messages}), 400
        except AppError as e:
            return jsonify({"error": e.message}), e.status_code

    @staticmethod
    def delete_review(review_id):
        try:
            ReviewService.delete_review(review_id)
            return jsonify({"message": "Review berhasil dihapus"}), 200
        except AppError as e:
            return jsonify({"error": e.message}), e.status_code