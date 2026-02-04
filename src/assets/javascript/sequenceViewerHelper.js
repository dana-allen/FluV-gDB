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

function splitIntoCodons(seq) {
  const codons = [];
  for (let i = 0; i < seq.length; i += 3) {
    codons.push(seq.slice(i, i + 3));
  }
  return codons;
}

export const getMismatches = (ref, query) => {
  
  let mismatches = [];
  const minLength = Math.min(ref.length, query.length);
  for (let i = 0; i < minLength; i++) {
  if (ref[i] !== query[i] && query[i] != '-') {
      mismatches.push(i)
  }

  }
  return mismatches
}





export const codonTable = {
    'ATA': 'I', 'ATC': 'I', 'ATT': 'I', 'ATG': 'M',
    'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACT': 'T',
    'AAC': 'N', 'AAT': 'N', 'AAA': 'K', 'AAG': 'K',
    'AGC': 'S', 'AGT': 'S', 'AGA': 'R', 'AGG': 'R',
    'CTA': 'L', 'CTC': 'L', 'CTG': 'L', 'CTT': 'L',
    'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCT': 'P',
    'CAC': 'H', 'CAT': 'H', 'CAA': 'Q', 'CAG': 'Q',
    'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGT': 'R',
    'GTA': 'V', 'GTC': 'V', 'GTG': 'V', 'GTT': 'V',
    'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCT': 'A',
    'GAC': 'D', 'GAT': 'D', 'GAA': 'E', 'GAG': 'E',
    'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGT': 'G',
    'TCA': 'S', 'TCC': 'S', 'TCG': 'S', 'TCT': 'S',
    'TTC': 'F', 'TTT': 'F', 'TTA': 'L', 'TTG': 'L',
    'TAC': 'Y', 'TAT': 'Y', 'TAA': '*', 'TAG': '*',
    'TGC': 'C', 'TGT': 'C', 'TGA': '*', 'TGG': 'W'
};

export const nucColors = {
    'A': '#64F73F',
    'C': '#FFB340',
    'G': '#EB413C',
    'T': '#3C88EE', 
}

// Using JalView clustal color scheme
// https://www.jalview.org/old/v2_10_2/help/html/colourSchemes/index.html
export const aaColors = {
    'A': '#80A0F0', 'R': '#F01505', 'N': '#00FF00', 'D': '#C048C0',
    'C': '#F08080', 'Q': '#00FF00', 'E': '#C048C0', 'G': '#F09048',
    'H': '#15A4A4', 'I': '#80A0F0', 'L': '#*0A0F0', 'K': '#F01505',
    'M': '#80A0F0', 'F': '#80A0F0', 'P': '#FFFF00', 'S': '#00FF00',
    'T': '#00FF00', 'W': '#80A0F0', 'Y': '#15A4A4', 'V': '#80A0F0',
}

// Function to get color based on nucleotide
export const getNucColor = (nucleotide) => {
  switch (nucleotide) {
    case 'A': return '#6D9F71'; // Muted Forest Green
    case 'T': return '#7393B3'; // Desaturated Blue
    case 'C': return '#E0C785'; // Warm Beige-Yellow
    case 'G': return '#C37D6B'; // Muted Rust Red
    case '-': return 'transparent'; // Gap
    default: return '#B0AFAF'; // Neutral Grey
  }
};

// Function to get color based on nucleotide
export const getAAColor = (nucleotide) => {
  switch (nucleotide) {
    case 'A': return '#6D9F71'; // Muted Forest Green
    case 'T': return '#7393B3'; // Desaturated Blue
    case 'C': return '#E0C785'; // Warm Beige-Yellow
    case 'G': return '#C37D6B'; // Muted Rust Red
    case '-': return 'transparent'; // Gap
    default: return '#B0AFAF'; // Neutral Grey
  }
};

export const getSequenceData = (start, end, referenceSequence, currentSequences, nucIndexes) => {

  const fullResults = [];
  const nucleotideResults = [];
  const aminoAcidResults = [];
  const tracked_codons = [];

  const currentSequencesRegions = currentSequences ? currentSequences.map(q => q.seq.slice(start, end)) : [];
  const refSequenceRegion = referenceSequence ? referenceSequence.slice(start, end) : '';
  console.log(referenceSequence)
  const refCodonsArray = splitIntoCodons(refSequenceRegion);
  const currentCodonArrays = currentSequencesRegions.map(seq => splitIntoCodons(seq));
  const startIndex = start;

  for (let i = 0; i < nucIndexes.length; i++) {
    const index = nucIndexes[i];
    const codonIndex = Math.floor((index - startIndex) / 3);

    // Track codons for amino acid / sequence blocks
    if (!tracked_codons.includes(codonIndex)) {
      tracked_codons.push(codonIndex);

      const refCodon = refCodonsArray[codonIndex] || '';
      const refAA = codonTable[refCodon] || '-';
      const codonStart = startIndex + codonIndex * 3;
      const nuc_index = [codonStart + 1, codonStart + 2, codonStart + 3];

      // Full sequence/codon info
      console.log("refCodon: ", refCodon)
      console.log("codon index", codonIndex)
      console.log("codon array", refCodonsArray.length)
      const fullCodon = {
        codon_index: codonIndex + 1,
        ref: { aa: refAA, nuc: refCodon.split(''), mismatch: referenceSequence[index] },
        seq: [],
        nuc_index,
        mismatch_index: index + 1
      };

      // Amino acid block (non-synonymous)
      let hasMismatchAA = false;
      const aaCodon = { codon_index: codonIndex + 1, ref: { aa: refAA }, seq: [] };

      for (let j = 0; j < currentSequences.length; j++) {
        const codon = currentCodonArrays[j][codonIndex] || '---';
        const codonAA = codonTable[codon] || '-';
        if (codonAA !== refAA && codonAA !== '-') hasMismatchAA = true;
        console.log("codon: ", codon)
        fullCodon.seq[j] = { aa: codonAA, nuc: codon.split(''), mismatch: currentSequences[j].seq[index] };
        aaCodon.seq[j] = { aa: codonAA };
      }

      fullResults.push(fullCodon);
      if (hasMismatchAA) aminoAcidResults.push(aaCodon);
    }

    // Nucleotide block
    const nucEntry = { ref: { nuc: referenceSequence[index] }, seq: [], nuc_index: index+1 };
    for (let j = 0; j < currentSequences.length; j++) {
      nucEntry.seq[j] = { nuc: currentSequences[j].seq[index] };
    }
    nucleotideResults.push(nucEntry);
  }

  return {
    fullResults,      // Like original getSequenceBlock
    nucleotideResults, // Like original getNucleotideBlock
    aminoAcidResults  // Like original getAminoAcidBlock
  };
};

// export const getSequenceBlock = (start, end, referenceSequence, currentSequences, nucIndexes) => {

//   const results = [];
//   const tracked_codons = [];

//   const currentSequencesRegions = currentSequences ? currentSequences.map(q => q.seq.slice(start, end)) : null;
//   const refSequenceRegion = referenceSequence ? referenceSequence.slice(start, end) : null;
//   const refCodonsArray = splitIntoCodons(refSequenceRegion);
//   const currentCodonArrays = currentSequencesRegions ? currentSequencesRegions.map(seq => splitIntoCodons(seq)) : null;
//   const startIndex = start

//   for (let i = 0; i < nucIndexes.length; i++) {

//       const index = nucIndexes[i]
//       const codonIndex = Math.floor((index - startIndex) / 3);


//       if (!tracked_codons.includes(codonIndex) ){
//         tracked_codons.push(codonIndex)

//         // const codonIndex = mismatches[mismatchIndex];
//         const refCodon = refCodonsArray[codonIndex];
//         const codonStart = startIndex + codonIndex * 3;
//         const nuc_index = [codonStart+1, codonStart + 2, codonStart + 3];

//         const parsedCodon = {
//           codon_index: codonIndex + 1,
//           ref: {
//             aa: codonTable[refCodon] || '-',
//             nuc: refCodon.split(''),
//             mismatch: referenceSequence[index]
            
//           },
//           seq: [],
//           nuc_index: nuc_index,
//           mismatch_index: index + 1
//         };

//         for (let j = 0; j < currentSequences.length; j++) {
//           const codon = currentCodonArrays[j][codonIndex] || '---';

//           const codonNucs = codon.split('');
//           parsedCodon.seq[j] = {
//             aa: codonTable[codon] || '-',
//             nuc: codonNucs,
//             mismatch: currentSequences[j].seq[index]
//           };
//         }

//         results.push(parsedCodon);
//       }
//   }
//   return results

// }

// export const getNucleotideBlock = (referenceSequence, currentSequences, nucIndexes) => {

//   const results = [];

  
//   for (let i = 0; i < nucIndexes.length; i++) {

//       const index = nucIndexes[i]

//       const parsedCodon = {
//         ref: {
//           nuc: referenceSequence[index],  
//         },
//         seq: [],
//         nuc_index: index,
//       };

//         for (let j = 0; j < currentSequences.length; j++) {
        
//           parsedCodon.seq[j] = {
//             nuc: currentSequences[j].seq[index],
//           };
//         }

//         results.push(parsedCodon);
//       }
//   return results

// }

// export const getAminoAcidBlock = (start, end, referenceSequence, currentSequences, nucIndexes) => {

//   const results = [];
//   const tracked_codons = [];

//   const currentSequencesRegions = currentSequences
//     ? currentSequences.map(q => q.seq.slice(start, end))
//     : null;
//   const refSequenceRegion = referenceSequence ? referenceSequence.slice(start, end) : null;

//   const refCodonsArray = splitIntoCodons(refSequenceRegion);
//   const currentCodonArrays = currentSequencesRegions
//     ? currentSequencesRegions.map(seq => splitIntoCodons(seq))
//     : null;

//   const startIndex = start;

//   for (let i = 0; i < nucIndexes.length; i++) {

//     const index = nucIndexes[i];
//     const codonIndex = Math.floor((index - startIndex) / 3);

//     if (!tracked_codons.includes(codonIndex)) {
//       tracked_codons.push(codonIndex);

//       const refCodon = refCodonsArray[codonIndex];
//       const refAA = codonTable[refCodon] || '-';
//       const codonStart = startIndex + codonIndex * 3;
//       const nuc_index = [codonStart + 1, codonStart + 2, codonStart + 3];

//       const parsedCodon = {
//         codon_index: codonIndex + 1,
//         ref: {
//           aa: refAA,
//         },
//         seq: [],
//       };

//       let hasMismatchAA = false;

//       for (let j = 0; j < currentSequences.length; j++) {
//         const codon = currentCodonArrays[j][codonIndex] || '---';
//         const codonAA = codonTable[codon] || '-';

//         if (codonAA !== refAA) {
//           hasMismatchAA = true;
//         }

//         parsedCodon.seq[j] = {
//           aa: codonAA,
        
//         };
//       }

//       if (hasMismatchAA) {
//         results.push(parsedCodon);
//       }
//     }
//   }

//   return results;
// };


