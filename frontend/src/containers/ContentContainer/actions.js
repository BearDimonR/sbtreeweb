import { setSearch } from "../LoginPage/actions";
import { loadEvents, applyEventSort } from "../EventsPage/actions";
import { loadPeople, applyPersonSort } from "../PeoplePage/actions";
import { PAGE_TYPE } from "../../helpers/constants";

export const setSort = (path, value) => async (dispatch) => {
  switch (path) {
    case PAGE_TYPE.events:
      dispatch(applyEventSort(value));
      break;
    case PAGE_TYPE.people:
      dispatch(applyPersonSort(value));
      break;
    default:
      return null;
  }
};

export const applySearch = (path, value) => async (dispatch) => {
  dispatch(setSearch(value));
  switch (path) {
    case PAGE_TYPE.events:
      dispatch(loadEvents());
      break;
    case PAGE_TYPE.people:
      dispatch(loadPeople());
      break;
    default:
      return null;
  }
};
