import useFetch from "./useFetch";
import { buildGenomeViewerResults } from '../assets/javascript/sequenceViewerHelper';
import { formatMetaDataRegions } from '../assets/javascript/formatHelper'

function useSequence(id) {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/sequence/metadata/${id}`;

    const { data, ...rest } = useFetch(id ? url : null);

    const {
        meta_data,
        sequence,
        alignment,
        features
    } = data|| {};

    const genomeViewerData = features ? buildGenomeViewerResults(data) : []
    const regions = meta_data ? (meta_data["region"] ? formatMetaDataRegions(meta_data["region"]) : null) : null

    return { meta_data, alignment, sequence, genomeViewerData, regions, ...rest };

};

export default useSequence;