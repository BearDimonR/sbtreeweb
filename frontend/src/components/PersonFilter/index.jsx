import React, { useState } from "react";
import style from "./index.module.scss";
import { Form, Header } from "semantic-ui-react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
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

const EventFilter = ({ filters, fullNames, statuses, apply, reset }) => {
  const [currentFilters, setCurrentFilters] = useState(filters);

  const theme = useTheme();

  const handleChange = (value, type) => {
    setCurrentFilters({ ...currentFilters, [type]: value });
  };

  const handleReset = () => {
    setCurrentFilters([]);
    reset();
  };

  const handleApply = () => {
    apply(currentFilters);
  };

  return (
    <Form className={style.form} onSubmit={handleApply}>
      <Header>Filters</Header>
      <div className={style.section}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start date"
            value={currentFilters.start || null}
            onChange={(value) => handleChange(value, "start")}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className={style.section}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End date"
            value={currentFilters.end || null}
            onChange={(value) => handleChange(value, "end")}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className={style.section}>
        <FormControl sx={{ m: 1, width: "100%", height: "100%" }}>
          <InputLabel>Statuses</InputLabel>
          <Select
            multiple
            value={currentFilters.statuses || []}
            onChange={(e) => handleChange(e.target?.value, "statuses")}
            input={<OutlinedInput label="Statuses" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {statuses.map((c) => (
              <MenuItem
                key={c}
                value={c}
                style={getStyles(c, currentFilters.statuses || [], theme)}
              >
                <Checkbox
                  checked={(currentFilters.statuses || []).indexOf(c) > -1}
                />
                <ListItemText primary={c} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={style.section}>
        <FormControl sx={{ m: 1, width: "100%", height: "100%" }}>
          <InputLabel>Full names</InputLabel>
          <Select
            multiple
            value={currentFilters.fullNames || []}
            onChange={(e) => handleChange(e.target?.value, "fullNames")}
            input={<OutlinedInput label="Name" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {fullNames.map((c) => (
              <MenuItem
                key={c}
                value={c}
                style={getStyles(c, currentFilters.fullNames || [], theme)}
              >
                <Checkbox
                  checked={(currentFilters.fullNames || []).indexOf(c) > -1}
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
