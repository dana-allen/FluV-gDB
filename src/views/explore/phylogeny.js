import { useState,  useRef, useEffect } from "react";


import Taxonium from "taxonium-component";

// import { TaxoniumWrapper } from "taxonium-component";
import { usePhylogenyTree } from '../../hooks'

const Phylogeny = () => {

  const { tree, meta_data, loading, error } = usePhylogenyTree();
  console.log(tree)
  const nwk = `((A:0.1,B:0.2):0.3,(C:0.4,D:0.5):0.6);`;

     
      // Metadata is optional
      const metadata = {
        filename: "test.csv",
        data: meta_data && meta_data,
        status: "loaded",
        filetype: "meta_csv",
      };

      // const sourceData = {
      //   status: "loaded",
      //   tree: nwk,
      //   metadata: metadata,
      // };

    const sourceData= {
      status: "loaded",
      filename: "test.nwk",
      data: tree && tree,
      filetype: "nwk",
      // metadata: metadata,
    }

    
  return (
    
    <div className='container' width="100%" height="100%">
      <h2>Phylogeny Tree</h2>
      <div className="h-screen w-full !important">
        {/* <Taxonium backendUrl="https://api.cov2tree.org" />; */}
        <Taxonium sourceData={sourceData }

        />
      </div>
      
      
      {/* <Taxonium
        tree={nwk}
        metadata={metadata_text}
        width={"100%"}
        height={"100%"}
      /> */}
    </div>
  );
};
 
export default Phylogeny;
