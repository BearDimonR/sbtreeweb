from fastapi_utils.guid_type import GUID

from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class ActivityUser(BaseEntity):
    __tablename__ = 'activity_user'

    sheet_helper = ApiSheetHelper(__tablename__)

    user_uuid = db.Column(GUID, db.ForeignKey('user.uuid'))
    activity_uuid = db.Column(GUID, db.ForeignKey('activity.uuid'))
    position = db.Column(db.String, nullable=False)
    contribution = db.Column(db.Text)

    @classmethod
    def filter_data(cls, dataframe):
        dataframe = super(ActivityUser, cls).filter_data(dataframe)
        return dataframe[(dataframe['user_uuid'].notna()) & (dataframe['activity_uuid'].notna())]

    def to_dict(self):
        return {
            **super(ActivityUser, self).to_dict(),
            'userUUID': str(self.user_uuid),
            'activityUUID': str(self.activity_uuid),
            'position': self.position,
            'contribution': self.contribution
        }
