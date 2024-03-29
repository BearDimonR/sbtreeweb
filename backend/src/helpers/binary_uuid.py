import uuid

from sqlalchemy.dialects.mysql import BINARY
from sqlalchemy.types import TypeDecorator


class BinaryUUID(TypeDecorator):
    impl = BINARY(16)

    cache_ok = True

    def process_bind_param(self, value, dialect):
        try:
            return value.bytes
        except AttributeError:
            try:
                return uuid.UUID(value).bytes
            except TypeError:
                return value

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        return uuid.UUID(bytes=value)
