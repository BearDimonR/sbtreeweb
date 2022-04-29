import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { Form, Header } from "semantic-ui-react";
import DatePicker from "@mui/lab/DatePicker";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  useTheme,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import { dateToString, stringToDateObj } from "../../helpers/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const FILTER_PROPERTIES = {
  start: "date_start",
  end: "date_end",
  category: "category",
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EventFilter = ({ filters, categories, apply, reset }) => {
  const [currentFilters, setCurrentFilters] = useState({
    ...filters,
    [FILTER_PROPERTIES.start]: stringToDateObj(filters[FILTER_PROPERTIES.start]),
    [FILTER_PROPERTIES.end]: stringToDateObj(filters[FILTER_PROPERTIES.end]),
  });

  const theme = useTheme();

  const handleChange = (value, type) => {
    setCurrentFilters({ ...currentFilters, [type]: value });
  };

  const handleReset = () => {
    setCurrentFilters([]);
    reset();
  };

  const handleApply = () => {
    apply({
      ...currentFilters,
      [FILTER_PROPERTIES.start]: dateToString(
        currentFilters[FILTER_PROPERTIES.start]
      ),
      [FILTER_PROPERTIES.end]: dateToString(
        currentFilters[FILTER_PROPERTIES.end]
      ),
    });
  };

  return (
    <Form className={style.form} onSubmit={handleApply}>
      <Header>Filters</Header>
      <div className={style.section}>
        <DatePicker
          label="Start date"
          value={currentFilters[FILTER_PROPERTIES.start] || null}
          onChange={(value) => handleChange(value, FILTER_PROPERTIES.start)}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </div>
      <div className={style.section}>
        <DatePicker
          label="End date"
          value={currentFilters[FILTER_PROPERTIES.end] || null}
          onChange={(value) => handleChange(value, FILTER_PROPERTIES.end)}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </div>
      <div className={style.section}>
        <FormControl sx={{ m: 1, width: "100%", height: "100%" }}>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={currentFilters[FILTER_PROPERTIES.category] || []}
            onChange={(e) =>
              handleChange(e.target?.value, FILTER_PROPERTIES.category)
            }
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {categories.map((c) => (
              <MenuItem
                key={c}
                value={c}
                style={getStyles(
                  c,
                  currentFilters[FILTER_PROPERTIES.category] || [],
                  theme
                )}
              >
                <Checkbox
                  checked={
                    (currentFilters[FILTER_PROPERTIES.category] || []).indexOf(
                      c
                    ) > -1
                  }
                />
                <ListItemText primary={c} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={style.buttons}>
        <Button type="submit">Apply</Button>
        <Button type="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default EventFilter;
