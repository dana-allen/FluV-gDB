import React from 'react';

const GenomeRegionAnnotationsTable = ( { genome } ) => {
    
    return (
        
        <table className="table table-nonfluid table-striped table-bordered table-coordinates">
            <thead>
                <tr>
                    <th rowspan={2}>Region</th>
                    <th colspan={2}>Nucleotides</th>
                    <th colspan={2}>Codons</th>
                </tr>
                <tr>
                    
                    <th>Start</th>
                    <th>End</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
            </thead>
            <tbody>
            {genome.map((feature) => (
                <tr>
                    <td>{feature.product} </td>
                    <td>{feature.cds_start}</td>
                    <td>{feature.cds_end}</td>
                    <td>{feature.codon_start}</td>
                    <td>{feature.codon_end}</td>
                </tr>
            ))}
            </tbody>
        </table>
             
    );
};
 
export default GenomeRegionAnnotationsTable;