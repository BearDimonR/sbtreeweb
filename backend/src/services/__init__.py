from services.activity_service import ActivityService
from services.auth_service import AuthService
from services.user_service import UserService
from services.activity_user_service import ActivityUserService

user_service = UserService()
auth_service = AuthService()
activity_service = ActivityService()
activity_user_service = ActivityUserService()
