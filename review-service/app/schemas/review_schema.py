from marshmallow import Schema, fields, validate

class ReviewSchema(Schema):
    product_id = fields.Str(required=True, validate=validate.Length(min=1, error="Product ID tidak boleh kosong"))
    user_id = fields.Str(required=True, validate=validate.Length(min=1, error="User ID tidak boleh kosong"))
    rating = fields.Int(required=True, validate=validate.Range(min=1, max=5, error="Rating harus berada di antara 1 sampai 5"))
    comment = fields.Str(required=True, validate=validate.Length(min=1, error="Komentar tidak boleh kosong"))

class ReviewUpdateSchema(Schema):
    rating = fields.Int(validate=validate.Range(min=1, max=5, error="Rating harus berada di antara 1 sampai 5"))
    comment = fields.Str(validate=validate.Length(min=1, error="Komentar tidak boleh kosong"))
    