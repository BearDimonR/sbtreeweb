from models.event import Event
from services.base_service import BaseService


class EventService(BaseService):
    def __init__(self):
        super(EventService, self).__init__(Event)
