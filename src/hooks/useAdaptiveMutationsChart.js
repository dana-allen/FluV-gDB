import { group } from "d3";
import useFetch from "./useFetch";


function groupByHost(data) {
    const countsByHost = {};
    console.log("WE ARE STARTING THIS")

    data.forEach(item => {
        const { primary_accession, host, protein } = item;

        // Make sure the sequence is long enough
        if (!protein || protein.length < 4) return;

        // Position 4 in biological terms = index 3 (0-based)
        const aa = protein[3];

        if (!countsByHost[host]) countsByHost[host] = {};

        if (!countsByHost[host][aa]) countsByHost[host][aa] = new Set();

        // Use a Set to store unique primary_accessions
        countsByHost[host][aa].add(primary_accession);
    });

    // Convert Sets to counts
    const result = {};

    for (const host in countsByHost) {
        result[host] = {};
        for (const aa in countsByHost[host]) {
            result[host][aa] = countsByHost[host][aa].size;
        }
    }
    console.log(result)

    const hosts = Object.keys(result);

    // Collect all amino acids
    const aminoAcids = new Set();
    hosts.forEach(host => {
        Object.keys(result[host]).forEach(aa => aminoAcids.add(aa));
    });

    // Build series array for stacked bar chart
    const series = Array.from(aminoAcids).map(aa => ({
    label: `AA ${aa}`,
    data: hosts.map(host => ({
        x: host,              // x-axis = host
        y: result[host][aa] || 0  // y = count for that amino acid (0 if not present)
    }))
    }));

    return series
}




function useAdaptiveMutationsChart(params) {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/adaptive_mutations_chart/${params}`;
    const { data, ...rest } = useFetch(url);
    console.log(url)
    const chart_data = data ? groupByHost(data) : {}

    

    console.log(chart_data)

    return {translated_sequences: chart_data, ...rest };

};

export default useAdaptiveMutationsChart;