from models.activity import Activity
from services.base_service import BaseService


class ActivityService(BaseService):
    def __init__(self):
        super(ActivityService, self).__init__(Activity)
