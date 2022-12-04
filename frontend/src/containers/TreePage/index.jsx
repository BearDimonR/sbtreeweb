import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Graph } from "react-d3-graph";
import getConfig from "../CustomNode/custom-node.config";
import styles from "./index.module.scss";
import {getTreeData} from "./action";
import { IconButton } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';

export default function TreePage({ external }) {
  const dispatch = useDispatch();
  const ref = useRef();
  const refGraph = useRef();

  const treeData = useSelector((state) => state.tree);

  useEffect(() => {
    dispatch(getTreeData())
  }, [dispatch]);

  const resetNodesPositions = useCallback(() => {
		if (refGraph.current) {
      refGraph.current.resetNodesPositions();
    }
	}, [refGraph]);

  const [config, setConfig] = useState(
    getConfig({
      width: window.outerWidth - 120,
      height: window.outerHeight - 200,
    })
  );

  useEffect(() => {
    setConfig(
      getConfig({
        width: ref.current?.offsetWidth,
        height: ref.current?.offsetHeight,
        external: external,
      })
    );
  }, [ref.current?.offsetWidth, ref.current?.offsetHeight, setConfig, external]);

  return (
    <div className={styles.container} ref={ref} >
       <IconButton aria-label="add" color="primary" style={{marginTop: '20px', margin: "auto"}} onClick={resetNodesPositions} >
          <CachedIcon />
        </IconButton>
      <Graph id="tree" data={treeData} config={config} ref={refGraph} />
    </div>
  );
}
