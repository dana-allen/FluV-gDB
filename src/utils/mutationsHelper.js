import * as d3 from "d3";
import { scaleOrdinal } from 'd3-scale'
const get_mutation_counts = (data) => {
    const mutationCounts = {};
    data.forEach(({ host, mutations }) => {
      if (!mutationCounts[host]) mutationCounts[host] = {};
      Object.entries(mutations).forEach(([codon, mutation]) => {
        if (!mutationCounts[host][codon]) mutationCounts[host][codon] = {};
        mutationCounts[host][codon][mutation] =
          (mutationCounts[host][codon][mutation] || 0) + 1;
      });
    });

    return mutationCounts

}

const get_total_mutations_per_host = (uniqueHosts, mutationCounts) => {
    
    const hostTotals = {};
    uniqueHosts.forEach((host) => {
        hostTotals[host] = Object.values(mutationCounts[host] || {}).reduce(
            (sum, codonData) => sum + Object.values(codonData).reduce((s, c) => s + c, 0),
            0
        );
    });

    return hostTotals;
}

function valueFormatter(value) {
    if (value > 0 && value != undefined) {
      return `${value.toFixed(2)}%`;
    }
  }


export const processMutationsData = (data) => {
    
    
    const uniqueHosts = [...new Set(data.map((d) => d.host))];
    const uniqueCodons = [...new Set(data.flatMap((d) => Object.keys(d.mutations))),];
    const uniqueMutations = [...new Set(data.flatMap((d) => Object.values(d.mutations))),];

    // Count mutations per codon per host
    const mutationCounts = get_mutation_counts(data)

    // Compute total mutations per host
    // const hostTotals = get_total_mutations_per_host(uniqueHosts)

    // Generate xLabels (Host-Codon pairs)
    const xLabels = uniqueHosts.flatMap((host) =>
      uniqueCodons.map((codon) => ({ host, codon, label: `${host}\n${codon}` }))
    );


    const colorScale = d3.scaleOrdinal()
                         .domain(uniqueMutations)
                         .range(uniqueMutations.map((_, i) => d3.interpolateTurbo(i / uniqueMutations.length * 0.8 + 0.1)));

    const series = uniqueMutations.map((mutation) => ({
        label: mutation,
        data: xLabels.map(({ host, codon }) => {
            const count = mutationCounts[host]?.[codon]?.[mutation] || 0;
        
            // Total count for this specific (host, codon) pair
            const codonTotal = Object.values(mutationCounts[host]?.[codon] || {}).reduce((sum, c) => sum + c, 0);
        
            return codonTotal > 0 ? (count / codonTotal) * 100 : 0; // Normalize per host+codon
        }),
        stack: "total",
        color: colorScale(mutation),
        valueFormatter
    }));
    


    return { xLabels, uniqueHosts, series };
  };


export const loadJsonFromPublic = async (path, callback) => {

  try {
    const res = await fetch(process.env.PUBLIC_URL + path);
    if (!res.ok) throw new Error('Failed to load JSON');

    const data = await res.json();
    callback(data);
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
};
