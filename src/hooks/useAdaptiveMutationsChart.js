import { group } from "d3";
import useFetch from "./useFetch";


function groupByHost(data) {

    console.log(data)
    const counts = {};

    data.forEach(({ primary_accession, host, protein }) => {
        if (!protein || protein.length < 4) return;

        // Position 4 (1-based) = index 3
        const aa = protein[3];

        if (!counts[host]) counts[host] = {};
        if (!counts[host][aa]) counts[host][aa] = new Set();

        counts[host][aa].add(primary_accession);
    });

    const hosts = Object.keys(counts);

    const xLabels = hosts.map(host => ({ label: host }));

    // Collect all amino acids
    const aminoAcids = new Set();
    hosts.forEach(host => {
        Object.keys(counts[host]).forEach(aa => aminoAcids.add(aa));
    });

    const series = Array.from(aminoAcids).map(aa => ({
        label: aa,
        stack: "total",
        data: hosts.map(host =>
            counts[host][aa] ? counts[host][aa].size : 0
        )
    }));

    return {xLabels, series}
}




function useAdaptiveMutationsChart(params) {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/adaptive_mutations_chart/${params}`;
    const { data, ...rest } = useFetch(url);
    // console.log("chart data", data)


    const {xLabels, series} = data ? groupByHost(data) : {}
    console.log("xlabels", xLabels)

    

    // console.log(chart_data)

    return {translated_sequences: {}, xLabels, series};

};

export default useAdaptiveMutationsChart;