import React, { useEffect, useRef, useState } from "react";
import { Graph } from 'react-d3-graph';
import CustomNode from "../CustomNode/CustomNode";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import config from "../CustomNode/custom-node.config"
import data from "../CustomNode/custom-node.data"

export default function Sample() {

  const [ref, setRef] = React.useState(null);

  const handleRefChange = React.useCallback((ref) => {
    setRef(ref);
  }, []);
  return (
    <>
      <Graph
        id="test"
        data={data}
        config={config}
        ref={handleRefChange}
      />
    </>
  );
}
