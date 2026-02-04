import { nucColors } from 'assets/javascript/sequenceViewerHelper';

const InsertionDetails = ({ insertions }) => {
    
    return (
        <div className='row'>
            <div className="col-md-6">
                <h4 className='title-sub'>Insertions</h4>
            </div>
            <div>
                {insertions.map((insertion, i) => {
                    const row = insertion.insertion.split(";")
                    return (
                        <table className="table table-striped table-bordered table-font" style={{width:"50%"}}>
                            <thead>
                                <tr>
                                    <th>Nucleotide Position</th>
                                    <th>Insertions</th>
                                </tr>
                            </thead>
                            {row.map((i) => {
                                const k = i.split(":")
                                return (
                            <tbody>
                                <tr>
                                    <td><p>{k[0]}</p></td>
                                    <td>
                                        <div className='blocks'>
                                            {k[1].split("").map((nuc) => (
                                                <div className='block'
                                                    style={{
                                                        backgroundColor: nucColors[nuc],
                                                        width:'15px'
                                                    }}
                                                ><b>{nuc}</b></div>
                                            ))}
                                        </div>

                                    </td>
                                    
                                </tr>
                            </tbody>
                                )
                            })}
                        </table>

                    )
                })}
            </div>
        </div>
    );
};

export default InsertionDetails;