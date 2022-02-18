from models.activity import Activity
from services.base_service import BaseService
from sqlalchemy import column


class ActivityService(BaseService):
    def __init__(self):
        super(ActivityService, self).__init__(Activity)

    def get_users_by_activity(self, uuid):
        activity = self.get_by_uuid(uuid)
        return activity.users
