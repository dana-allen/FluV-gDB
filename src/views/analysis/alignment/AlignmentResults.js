import { useEffect, useState } from "react";
import GenomeViewer from "../../../components/genomeViewer/GenomeViewer";

const AlignmentResults = ( {data} ) => {

  const [results, setResults] = useState([]);

  useEffect(() => { setResults(data) }, [data]); 

  return (
    <GenomeViewer data={results} />
  );
};

export default AlignmentResults;
