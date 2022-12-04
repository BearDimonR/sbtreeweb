import {
  SET_TREE_DATA,
} from "./actionTypes";

const reducer = (
  state = {
    nodes: [],
    links: [],
  },
  action
) => {
  switch (action.type) {
    case SET_TREE_DATA:
      const {nodes, links} = action.value
      return {
        ...state,
        nodes,
        links,
      };
    default:
      return state;
  }
};

export default reducer;
