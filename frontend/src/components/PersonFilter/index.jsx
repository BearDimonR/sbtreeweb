import React, { useCallback, useState } from "react";
import style from "./index.module.scss";
import { Form, Header, Checkbox, Button } from "semantic-ui-react";
import { DateRangePicker } from "rsuite";
import _ from "lodash";

const EventFilter = ({ filters, fullNames, statuses, apply, reset }) => {
  const [currentFilters, setCurrentFilters] = useState(filters);

  const handleChange = useCallback(
    (e, data, type) => {
      if (type === "start") {
        if (data.length !== 0) {
          setCurrentFilters({
            ...currentFilters,
            start: { start: data[0], end: data[1] },
          });
        } else {
          setCurrentFilters({ ...currentFilters, start: {} });
        }
      } else {
        const checked = data.checked;
        const value = data.value;
        const arr = [...(currentFilters[type] || [])];
        if (checked) {
          setCurrentFilters({ ...currentFilters, [type]: [...arr, value] });
        } else {
          _.remove(arr, (a) => a === value);
          setCurrentFilters({ ...currentFilters, [type]: [...arr] });
        }
      }
    },
    [currentFilters, setCurrentFilters]
  );

  const handleReset = useCallback(() => {
    setCurrentFilters([]);
    reset();
  }, [setCurrentFilters, reset]);
  return (
    <Form className={style.form} onSubmit={() => apply(currentFilters)}>
      <div className={style.section}>
        <Header>Date</Header>
        <DateRangePicker
          onChange={(data, e) => handleChange(e, data, "start")}
        />
      </div>
      <div className={style.section}>
        <Header>Statuses</Header>
        <div className={style.categories}>
          {statuses &&
            statuses.map((c) => (
              <Form.Checkbox
                key={c}
                control={() => (
                  <Checkbox
                    label={c}
                    value={c}
                    checked={_.indexOf(currentFilters.status, c) !== -1}
                    onChange={(e, data) => handleChange(e, data, "status")}
                  />
                )}
              />
            ))}
        </div>
      </div>
      <div className={style.section}>
        <Header>FullNames</Header>
        <div className={style.names}>
          {fullNames &&
            fullNames.map((n) => (
              <Form.Checkbox
                key={n}
                control={() => (
                  <Checkbox
                    label={n}
                    value={n}
                    checked={_.indexOf(currentFilters.fullName, n) !== -1}
                    onChange={(e, data) => handleChange(e, data, "fullName")}
                  />
                )}
              />
            ))}
        </div>
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
