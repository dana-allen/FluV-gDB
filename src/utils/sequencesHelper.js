export const parseSequenceData = (data, id) => {
    const locationRegex = /cds_location:\s<?(\d+)\.\.>?(\d+);.*?product:\s([^;]+)/g;

    // Using matchAll to find all matches
    const matches = [...data["meta_data"]["cds_info"].matchAll(locationRegex)];
    // Extracting and formatting the results
    const features = matches.map(match => {
        const start = match[1];
        const end = match[2];
        const product = match[3];  // Extracting the product name
        
        return {
            name: product,  // You can adjust this to be dynamic if necessary
            start: parseInt(start), // Start position
            end: parseInt(end) // End position
        };
    });
    const results = {primary_accession: id,
                    seq: data["sequence"].toUpperCase(),
                    features: features
    }
    
    return results
}