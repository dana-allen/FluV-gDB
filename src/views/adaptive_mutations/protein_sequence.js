import "../../assets/styles/protein_sequence.css";
import {useState} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const sequence = "MERIKELRDLMSQSRTREILTKTTVDHMAIIKKYTSGRQEKNPALRMKWMMAMKYPITADKRIMEMIPERNEQGQTLWSKTNDAGSDRVMVSPLAVTWWNRNGPTTSTVHYPKVYKTYFEKVERLKHGTFGPVHFRNQVKIRRRVDINPGHADLSAKEAQDVIMEVVFPNEVGARILTSESQLTITKEKKEELQDCKIAPLMVAYMLERELVRKTRFLPVAGGTSSVYIEVLHLTQGTCWEQMYTPGGEVRNDDVDQSLIIAARNIVRRATVSADPLASLLEMCHSTQIGGIRMVDILRQNPTEEQAVDICKAAMGLRISSSFSFGGFTFKRTNGSSVKKEEEVLTGNLQTLKIKVHEGYEEFTMVGRRATAILRKATRRLIQLIVSGRDEQSIAEAIIVAMVFSQEDCMIKAVRGDLNFVNRANQRLNPMHQLLRHFQKDAKVLFQNWGIEPIDNVMGMIGILPDMTPSAEMSLRGVRVSKMGVDEYSSTERVVVSIDRFLRVRDQQGNVLLSPEEVSETQGTEKLTITYSSSMMWEINGPESVLVNTYQWIIRNWETVKIQWSQDPTMLYNKMEFESFQSLVPKAARSQYSGFVRTLFQQMRDVLGTFDTVQIIKLLPFAAAPPEPSRMQFSSLTVNVRGSGMRILVRGNSPVFNYNKATKRLTVLGKDAGALTEDPDEGTAGVESAVLRGFLILGREDKRYGPALSINELSNLAKGEKANVLIMQGDVVLVMKRKRDFSILTDSQTATKRIRMAIN*"



export default function ProteinSequence({selectedSegement, mutations}) {
console.log(mutations)
const mutatedResidues = [
  ...new Set(mutations.map(m => Number(m.position)))
];
  const BLOCK_SIZE = 10;
  const BLOCKS_PER_ROW = 8; // 80 AAs per row
  const AAS_PER_ROW = BLOCK_SIZE * BLOCKS_PER_ROW;

  const blocks = sequence.match(/.{1,10}/g) || [];

  const rows = [];
  for (let i = 0; i < blocks.length; i += BLOCKS_PER_ROW) {
    rows.push(blocks.slice(i, i + BLOCKS_PER_ROW));
  }

  const mutatedSet = new Set(mutatedResidues);


    const [open, setOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedMutations, setSelectedMutations] = useState([]);


    const onResidueClick = (position) => {
        const matches = mutations.filter(
        (m) => Number(m.position) === position
        );

        setSelectedPosition(position);
        setSelectedMutations(matches);
        setOpen(true);
    };

  return (
    <div>
        <div className="protein-sequence">
        {rows.map((row, rowIndex) => {
            const rowStart = rowIndex * AAS_PER_ROW + 1;
            const rowEnd = Math.min(
            rowStart + row.length * BLOCK_SIZE - 1,
            sequence.length
            );

            return (
            <div key={rowIndex} className="aa-row">
                {/* Left label */}
                <div className="position-label left">{rowStart}</div>

                {/* Sequence */}
                <div className="aa-row-content">
                {row.map((block, blockIndex) => (
                    <div key={blockIndex} className="aa-block">
                    {block.split("").map((aa, aaIndex) => {
                        const globalPos =
                        rowIndex * AAS_PER_ROW +
                        blockIndex * BLOCK_SIZE +
                        aaIndex +
                        1;

                        const isMutated = mutatedSet.has(globalPos);

                        return (
                        <span
                            key={aaIndex}
                            className={`aa-box ${
                            isMutated ? "aa-mutated clickable" : ""
                            }`}
                            onClick={
                            isMutated
                                ? () => onResidueClick(globalPos, aa)
                                : undefined
                            }
                            title={
                            isMutated
                                ? `Position ${globalPos}: ${aa}`
                                : undefined
                            }
                        >
                            {aa}
                        </span>
                        );
                    })}
                    </div>
                ))}
                </div>

                {/* Right label */}
                <div className="position-label right">{rowEnd}</div>
            </div>
            );
        })}
        </div>
        <div>
            <DialogContent>
                <strong>Residue {selectedPosition} mutations for {selectedSegement}:</strong>
                <ul>
                    {selectedMutations.map((m, index) => (
                        <li>
                            <div key={index} style={{ marginBottom: 12 }}>
                            <strong style={{color:'var(--primary)'}}>{m.mutation}</strong>
                            {m.virus && <div>Subtype: {m.virus}</div>}
                            {m.discovery && <div>Discovery notes: {m.discovery}</div>}
                            {m.doi && <Link className='gdb-link' to={`https://www.ncbi.nlm.nih.gov/pubmed/${m.doi}`} target="_blank"> <FontAwesomeIcon icon={faLink} /> {m.authors} </Link>}
                            {/* <hr></hr> */}
                            </div>
                        </li>
                        
                    ))}
                </ul>
            </DialogContent>

        </div>
    </div>
  );
}