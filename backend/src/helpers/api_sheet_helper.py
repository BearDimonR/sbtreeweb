import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials

from config import GOOGLE_CREDS_FILE_PATH, DRIVE_FILE_NAME, GOOGLE_SHEET_SCOPE

sheet_client = \
    gspread.authorize(
        ServiceAccountCredentials.from_json_keyfile_name(GOOGLE_CREDS_FILE_PATH, GOOGLE_SHEET_SCOPE)
    )

sheet_database = sheet_client.open(DRIVE_FILE_NAME)


class ApiSheetHelper:

    def __init__(self, sheet_name):
        self.worksheet = sheet_database.worksheet(sheet_name)
        self.title = self.worksheet.row_values(1)
        self.filter_cell = lambda item: item.row != 1
        self.range = chr(64 + len(self.title))

    def load_values(self, from_row, to_row):
        # TODO request limit
        values = self.worksheet.get_values(f'A{from_row}:{self.range}{to_row}',
                                           value_render_option='UNFORMATTED_VALUE',
                                           date_time_render_option='FORMATTED_STRING'
                                           )
        dataframe = pd.DataFrame(values, columns=self.title).replace({r'^\s*$': None}, regex=True)
        return dataframe

    def filter_values(self, value):
        if isinstance(value, list):
            return list(filter(self.filter_cell, value))
        elif self.filter_cell(value):
            return value
        return None

    def cell_to_row(self, cell):
        values = self.worksheet.row_values(cell.row, value_render_option='UNFORMATTED_VALUE',
                                           date_time_render_option='FORMATTED_STRING')
        return values

    def row_to_dict(self, row):
        return

    def cells_to_rows(self, value):
        return list(map(self.cell_to_row, value))

    def get_column_index_by_field(self, field_name):
        return self.title.index(field_name) + 1

    def find_cell_by_field(self, field_name, value):
        index = self.get_column_index_by_field(field_name)
        result = self.worksheet.find(value, in_column=index)
        return self.filter_values(result)

    def find_cells_by_field(self, field_name, value):
        index = self.get_column_index_by_field(field_name)
        result = self.worksheet.findall(value, in_column=index)
        return self.filter_values(result)

    def get_by_field(self, field_name, value):
        cell = self.find_cell_by_field(field_name, value)
        if cell is not None:
            return self.cell_to_row(cell)
        return None

    def get_all(self):
        return self.worksheet.get_all_records(value_render_option='UNFORMATTED_VALUE')

    def get_all_by_field(self, field_name, value):
        cells = self.find_cells_by_field(field_name, value)
        return self.cells_to_rows(cells)

    def save_by_field(self, field_name, value):
        pass

    def save(self, value):
        self.worksheet.append_row(value, value_input_option='USER_ENTERED')

    def update_cells_by_field(self, field_name, field_value, value):
        cells = self.find_cell_by_field(field_name, field_value)
        for cell in cells:
            cell.value = value
        self.worksheet.update_cells(cells)

    def delete_by_field(self, field_name, value):
        index = self.find_cell_by_field(field_name, value)
        if index is not None:
            self.worksheet.delete_row(index.row)
