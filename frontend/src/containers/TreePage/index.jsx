import React, { useEffect, useRef, useState } from "react";
import { Graph } from "react-d3-graph";
import getConfig from "../CustomNode/custom-node.config";
import data from "../CustomNode/custom-node.data";
import styles from "./index.module.scss";

export default function TreePage() {
  const ref = useRef();

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
      })
    );
  }, [ref.current?.offsetWidth, ref.current?.offsetHeight, setConfig]);

  return (
    <div className={styles.container} ref={ref}>
      <Graph id="tree" data={data} config={config} />
    </div>
  );
}
