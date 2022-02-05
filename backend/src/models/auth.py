from fastapi_utils.guid_type import GUID
from sqlalchemy.orm import relationship

from helpers import db, ApiSheetHelper
from models.base_entity import BaseEntity


class Auth(BaseEntity):
    __tablename__ = 'auth'

    sheet_helper = ApiSheetHelper(__tablename__)

    user_uuid = db.Column(GUID, db.ForeignKey('user.uuid'))
    access = db.Column(db.Integer, default=0)
    email = db.Column(db.String)

    user = relationship('User', back_populates='auths')

    @classmethod
    def filter_data(cls, dataframe):
        dataframe = super(Auth, cls).filter_data(dataframe)
        return dataframe[(dataframe['user_uuid'].notna()) & (dataframe['email'].notna())]

    def to_dict(self):
        return {**super(Auth, self).to_dict(), 'userUUID': str(self.user_uuid), 'access': self.access, 'email': self.email}
