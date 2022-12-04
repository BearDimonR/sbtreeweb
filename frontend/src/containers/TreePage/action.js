import * as peopleService from "../../services/peopleService";
import {
  SET_TREE_DATA,
} from "./actionTypes";
import { handleError } from "../../utils/shared";

export const getTreeData = () => async (dispatch, getRootState) => {
    handleError(async () => {
        const treeData = await peopleService.getTreeData();
        dispatch(setTreeData(treeData));
    });
};

export const setTreeData = (value) => async (dispatch) =>
  dispatch({
    type: SET_TREE_DATA,
    value,
  });