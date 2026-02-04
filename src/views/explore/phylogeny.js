import { useState,  useRef, useEffect } from "react";
// import * as React from 'react';
import Taxonium from "taxonium-component";
// import { TaxoniumWrapper } from "taxonium-component";
import { usePhylogenyTree } from '../../hooks'

const Phylogeny = () => {

  const [sourceData, setSourceData] = useState(null);

  const { tree, meta_data, loading, error } = usePhylogenyTree();
  
  // 
  useEffect(() => {
    if (tree) {
      console.log("creating this stuff")
      console.log(meta_data)
    //   const metadata = {
    //     filename: "metadata.tsv",
    //     data: meta_data,
    //     status: "loaded",
    //     filetype: "meta_tsv",
    //   };
    // console.log(metadata)
      setSourceData({
              status: "loaded",
              filename: "tree.nwk",
              data: tree,
              filetype: "nwk",
              // metadata: metadata,
            });
    }
  }, [tree, meta_data]);

  if (!sourceData) return <div>Loading…</div>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Taxonium sourceData={sourceData} />
    </div>
  );
};
 
export default Phylogeny;
