class AppError(Exception):
    def __init__(self, message, status_code=400):
        super().__init__()
        self.message = message
        self.status_code = status_code

class NotFoundError(AppError):
    def __init__(self, message="Data tidak ditemukan"):
        super().__init__(message, status_code=404)

class BadRequestError(AppError):
    def __init__(self, message="Permintaan tidak valid"):
        super().__init__(message, status_code=400)

class ExternalServiceError(AppError):
    def __init__(self, message="Gagal terhubung ke layanan eksternal"):
        super().__init__(message, status_code=502)