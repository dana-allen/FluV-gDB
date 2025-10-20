import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

import submitApiQuery from "../../../callbacks/submitApiQuery";

const BlastResults = ( {data} ) => {
    
    const [blobData, setBlobData] = useState();


    const parseTSV = (tsvText) => {

        const rows = tsvText.trim().split("\n"); // Split into rows
        const headers = rows[0].split("\t"); // Extract headers
        const data = rows.slice(1).map((row) => row.split("\t")); // Extract values
        return([headers, ...data])

    };

    const downloadBlastResults = () => {
        if (blobData != null) {
            var url = window.URL.createObjectURL(blobData);
            var a = document.createElement('a');
            a.href = url;
            a.download = "query_tophits.tsv";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    
    }

    const [results, setResults] = useState(null)

    useEffect(() => {
        if (data) {setResults(parseTSV(data))}
    }, [data]); 


  return (
    <div>
      {/* <h2>BLAST Results</h2> */}
      <Button size='sm' className='btn-secondary-filled' onClick={downloadBlastResults}>Download BLAST results</Button>


      <br></br>
      <br></br>
      <table className="table table-striped table-bordered table-font">
        <thead>
            <tr>
                <th>Submitted Query</th>
                <th>Best Matched Reference</th>
                <th>Score (%)</th>
            </tr>
        </thead>
        {results && <tbody>
            {results.map((row, rowIndex) => (
                <tr>
                    <td>{row[0]}</td>
                    <td><Link className='custom-link' to={`/sequence/${row[1]}`}>{row[1]}</Link></td>
                    <td>{row[2]}</td>
                </tr>
            ))}
        </tbody>}
      </table>
    </div>
  );
};

export default BlastResults;
