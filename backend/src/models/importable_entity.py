import logging
from config import MAX_IMPORT_SIZE


class SheetEntity:
    # Should be changed in child
    sheet_helper = None

    # Should be implemented in child
    @classmethod
    def create(cls, **kwargs):
        return cls(**kwargs)

    # Should be implemented in child
    @classmethod
    def transform_data(cls, dataframe):
        return dataframe

    # Should be implemented in child
    @classmethod
    def filter_data(cls, dataframe):
        return dataframe

    @classmethod
    def import_in_range(cls, from_row, to_row):
        logging.info(f'{cls.__name__} importing range: {from_row}:{to_row}')
        values = cls.sheet_helper.load_values(from_row, to_row)
        data = cls.transform_data(cls.filter_data(values))
        if data.empty:
            return
        data.apply(lambda x: cls.create(**x), axis=1)

    @classmethod
    def import_from_sheet(cls):
        rows_count = cls.sheet_helper.worksheet.row_count
        logging.info(f'{cls.__name__} has {rows_count} rows')
        from_row = 2
        to_row = MAX_IMPORT_SIZE
        while rows_count >= to_row:
            cls.import_in_range(from_row, to_row)
            from_row += MAX_IMPORT_SIZE
            to_row += MAX_IMPORT_SIZE
        cls.import_in_range(from_row, rows_count)
