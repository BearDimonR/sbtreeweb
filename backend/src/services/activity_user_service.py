from models.activity_user import ActivityUser
from services.base_service import BaseService


class ActivityUserService(BaseService):
    def __init__(self):
        super(ActivityUserService, self).__init__(ActivityUser)
