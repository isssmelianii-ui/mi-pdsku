from marshmallow import Schema, fields, validate, validates_schema, ValidationError

class ReviewSchema(Schema):
    product_id = fields.Str(required=True, validate=validate.Regexp(r"^[1-9][0-9]*$", error="Product ID harus berupa bilangan bulat positif"))
    user_id = fields.Str(required=True, validate=validate.Length(min=1, error="User ID tidak boleh kosong"))
    rating = fields.Int(required=True, validate=validate.Range(min=1, max=5, error="Rating harus berada di antara 1 sampai 5"))
    comment = fields.Str(required=True, validate=validate.Length(min=1, error="Komentar tidak boleh kosong"))

class ReviewUpdateSchema(Schema):
    rating = fields.Int(validate=validate.Range(min=1, max=5, error="Rating harus berada di antara 1 sampai 5"))
    comment = fields.Str(validate=validate.Length(min=1, error="Komentar tidak boleh kosong"))

    @validates_schema
    def require_update_field(self, data, **kwargs):
        # Tolak payload update kosong agar request tidak dianggap sukses tanpa perubahan.
        if not data:
            raise ValidationError("Minimal satu field rating atau comment harus diisi.")
    