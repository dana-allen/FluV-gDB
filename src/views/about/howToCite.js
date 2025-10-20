const HowToCite = () => {
    return (
        <div className="container ">
            <h2>How to cite {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}</h2>
            <p>Please cite:</p>
            <p>Campbell, K., Gifford, R.J., Singer, J., Hill, V., O’Toole, A., Rambaut, A., Hampson, K. and Brunker, K. 
                (2022). 
                Making genomic surveillance deliver: A lineage classification and nomenclature system to inform rabies elimination. 
                <i> PLOS Pathogens</i>, 18(5), p.e1010023. 
                doi: <a target="_blank" href="https://doi.org/10.1371/journal.ppat.1010023">https://doi.org/10.1101/2021.10.13.464180</a>.
                </p>
        </div>
    );
};
 
export default HowToCite;
