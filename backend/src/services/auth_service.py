from models.auth import Auth
from services.base_service import BaseService


class AuthService(BaseService):
    def __init__(self):
        super(AuthService, self).__init__(Auth)

    def get_by_email(self, email):
        return self.model.query.filter(self.model.email == email).first()
