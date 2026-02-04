export const buildGenomeViewerResults = (alignment) => {
    var features = []
    for(let i=0; i<alignment["features"].length; i++){
        features.push({name: alignment["features"][i]["product"], 
                        start: alignment["features"][i]["cds_start"],
                        end: alignment["features"][i]["cds_end"]
        })
    }
    const results = {primary_accession: alignment["alignment_name"],
                    seq: alignment["ref_seq"].toUpperCase(),
                    alignedSeq: [{query:alignment["sequence_id"], seq:alignment["alignment"].toUpperCase()}],
                    features: features
    }
    return results
}