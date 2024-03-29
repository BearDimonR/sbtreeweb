import React, { useState } from "react";
import style from "./index.module.scss";
import DatePicker from "@mui/lab/DatePicker";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { dateToString, stringToDateObj } from "../../helpers/constants";
import { localization } from "../../utils/localization";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const FILTER_PROPERTIES = {
  start: "dateIn",
  end: "dateOut",
  status: "status",
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const PersonFilter = ({ filters, statuses, apply, reset }) => {
  const [currentFilters, setCurrentFilters] = useState({
    ...filters,
    [FILTER_PROPERTIES.start]: stringToDateObj(
      filters[FILTER_PROPERTIES.start]
    ),
    [FILTER_PROPERTIES.end]: stringToDateObj(filters[FILTER_PROPERTIES.end]),
  });

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
    <form className={style.form}>
      <Typography variant="h5" gutterBottom component="div">
        {localization.filters}
      </Typography>
      <div className={style.section}>
        <DatePicker
          label={localization.from}
          mask="__.__.____"
          value={currentFilters[FILTER_PROPERTIES.start] || null}
          onChange={(value) => handleChange(value, FILTER_PROPERTIES.start)}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </div>
      <div className={style.section}>
        <DatePicker
          label={localization.to}
          mask="__.__.____"
          value={currentFilters[FILTER_PROPERTIES.end] || null}
          onChange={(value) => handleChange(value, FILTER_PROPERTIES.end)}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </div>
      <div className={style.section}>
        <FormControl sx={{ m: 1, width: "80%", height: "100%" }}>
          <InputLabel>{localization.statuses}</InputLabel>
          <Select
            multiple
            value={currentFilters[FILTER_PROPERTIES.status] || []}
            onChange={(e) =>
              handleChange(e.target?.value, FILTER_PROPERTIES.status)
            }
            input={<OutlinedInput label={localization.statuses} />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {statuses.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                <Checkbox
                  checked={
                    (currentFilters[FILTER_PROPERTIES.status] || []).indexOf(
                      value
                    ) > -1
                  }
                />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={style.buttons}>
        <Button onClick={handleApply}>{localization.apply}</Button>
        <Button onClick={handleReset}>{localization.reset}</Button>
      </div>
    </form>
  );
};

export default PersonFilter;
