import '../../../assets/styles/genome_viewer.css'

const LabelBlock = ({showProtein, showNucleotide, alignmentResults}) => {

    const rows = [
        ...(showProtein ? [{ label: "Codon" }] : []),
        { label: "Reference" },
        ...(showNucleotide && showProtein ? [{ label: "" }] : []),
        { type: "divider" },
        ...alignmentResults.flatMap((a) => [
            { label: a.query },
            ...(showNucleotide && showProtein ? [{ label: "" }] : []),
        ]),
        ...(showNucleotide ? [{ label: "Nucleotide" }] : []),
    ];
    return (
        <div className='labels-block'>
            {rows.map((row, i) =>
                row.type === "divider" ? (
                <hr key={i} />
                ) : (
                <Label key={i} label={row.label} />
                )
            )}
        </div>
    );

};

const Label = ({ label }) => (
    <div className='label-block'
        style={{ visibility: label ? "visible" : "hidden" }}
    >
        {label || "\u00A0"}
    </div>
);

export default LabelBlock;