import { Link } from 'react-router-dom';

const SampleDetails = ({ meta_data, regions }) => {
    
    return (
        <div >
            <h4 className="title-sub">Sample Details</h4>
            <table className="table table-striped table-bordered table-font">
                <tbody>
                    <tr>
                        <td><b>Isolate ID</b></td>
                        <td>{meta_data.isolate ?<Link className="gdb-link" to={`/isolate/${encodeURIComponent(meta_data.isolate )}`} >
                                    {meta_data.isolate }
                                </Link> : "-"}</td>
                    </tr>
                    <tr>
                        <td><b>Isolation Source</b></td>
                        <td>{meta_data.isolation_source ? `${meta_data.isolation_source}`:"-"}</td>
                    </tr>
                    <tr>
                        <td><b>Host Species</b></td>
                        <td><em>{meta_data.host ? `${meta_data.host}`:"-"}</em></td>
                    </tr>
                    
                    <tr>
                        <td><b>Collection Date</b></td>
                        <td>{meta_data.collection_date}</td>
                    </tr>
                    {regions && 
                        <>
                            <tr>
                                <td><b>Country of Origin</b></td>
                                <td>
                                    {regions.display_name ? `${regions.display_name} ${regions.id ? 
                                    `(${regions.id}) ${meta_data.geo_loc ? `/ ${meta_data.geo_loc}` : ''}`  :""}`:"-" }
                                </td>
                            </tr>
                            <tr>
                                <td><b>Country Development Status</b></td>
                                <td className='capitalize-text' >
                                    {regions.development_status ? `${regions.development_status} 
                                    ${regions.development_status=='developing' ? `/ ${regions.status}`:""}`:"-"}
                                </td>
                            </tr>
                            <tr>
                                <td><b>Global Region</b></td>
                                <td className='capitalize-text' >
                                    {regions.m49_region_id ? `${regions.m49_region_id}`:"-"} / 
                                    {regions.m49_sub_region_id ? ` ${regions.m49_sub_region_id}`:" -"}
                                </td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SampleDetails;