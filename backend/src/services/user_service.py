from models.user import User
from services.base_service import BaseService


class UserService(BaseService):
    def __init__(self):
        super(UserService, self).__init__(User)

    def get_tree(self):
        pass

    def get_activities_by_user(self, uuid):
        user = self.get_by_uuid(uuid)
        return user.activities
