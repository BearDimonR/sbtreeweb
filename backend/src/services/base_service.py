from datetime import datetime
import uuid

from sqlalchemy import column, func

from config import DATE_FORMAT, DATE_COMPARISON_FORMAT
from models.base_entity import BaseEntity


class BaseService:
    def __init__(self, model: BaseEntity):
        self.model = model

    def get_all(self, sort=None, params=None, search=None, page=None, filters=None):
        query = self.model.query
        if params:
            query = (
                query.with_entities(
                    *[column(self.model.get_key(param)) for param in params]
                )
                .select_from(self.model)
                .distinct()
            )
        if filters:
            filter_obj = []
            for col in filters:
                real_col = self.model.get_key(col)
                if self.model.start == real_col:
                    date = datetime.strptime(filters[col], DATE_FORMAT).strftime(
                        DATE_COMPARISON_FORMAT
                    )
                    filter_obj.append(column(real_col) >= date)
                elif self.model.end == real_col:
                    date = datetime.strptime(filters[col], DATE_FORMAT).strftime(
                        DATE_COMPARISON_FORMAT
                    )
                    filter_obj.append(func.DATE(column(real_col)) <= date)
                else:
                    filter_obj.append(column(real_col).in_(filters[col]))
            query = query.filter(*filter_obj)
        if search and search[0][1] is not None:
            query = query.filter(
                *[column(self.model.get_key(s[0])).startswith(s[1]) for s in search]
            )
        if sort:
            query = query.order_by(*[self.model.get_key(s) for s in sort])
        if page:
            pagination = query.paginate(page=page, max_per_page=12, error_out=False)
            return pagination.pages, pagination.items
        return query.all()

    def get_all_param(self, params):
        return list(
            map(
                lambda x: {
                    param: self.model.transform_field(param, x[i])
                    for i, param in enumerate(params)
                },
                self.get_all(sort=params, params=params),
            )
        )

    def get_by_id(self, _id):
        return self.model.query.get(_id)

    def create(self, body):
        parsed_body = self.model.parse_request(body)
        parsed_body["id"] = uuid.uuid4()
        return self.model.create(**parsed_body)

    def update(self, row_id, body):
        parsed_body = self.model.parse_request(body)
        return self.model.update(row_id, **parsed_body)

    def delete(self, row_id):
        return self.model.delete(row_id)
