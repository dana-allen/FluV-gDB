import { Tabs, Tab } from 'react-bootstrap';

import '../../assets/styles/about.css'

const Help = () => {
    return (
        <div className="container">
            <h2>Help</h2>

            <Tabs defaultActiveKey="mutations" id="tabs" className="mb-3">
                <Tab eventKey="mutations" title="Mutations">
                    <p> 
                        The Mutations Explorer finds the frequency of amino acids at various genome regions for the associated traits selected.
                    </p>
                    <h4>Inputs</h4>
                    <div className="row">

                        <div className="col-7">
                            <ul>
                                <li>
                                    <a className='input-a'><i>Host(s)</i></a>: 
                                    Select host(s) from dropdown menu. The mutations will 
                                    be calculated per host.
                                </li>
                                <li>
                                    <a className='input-a'><i>Clade</i></a>:
                                    Major/minor clade you want to filter sequences on.
                                </li>
                                <li>
                                    <a classname='input-a'><i>Region</i></a>:
                                    Section of virus genome.
                                </li>
                                <li>
                                    <a className='input-a'><i>Codon(s)</i></a>:
                                    Select codon(s) from drop down list. You can select as 
                                    many codons as you would like. The mutations are calculated
                                    for all of the codons/amino acid at that codon position.

                                </li>
                            </ul>
                        </div>
                        
                        <div className="col-5">
                            <img className='img' src='/mutations.png'></img>
                        </div>
                    </div>
                    
                    <hr></hr>

                    <h4>Results</h4>
                    
                    

                    <div className="row">
                        <div className="col-6">
                            <a className='input-a'><i>Mutations Chart</i></a>
                            <p>
                                The chart shows the percentage of the combintation of mutations for codons
                                for each host submitted. The chart shows the top 80% of mutations combinations. 
                                The last 20% is condensed into an "other" category. 
                            </p>

                        </div>
                        <div className="col-6">
                            <img src='/mutations_chart.png' className='img'></img>

                        </div>

                    </div>
                    
                    <div className="row">
                        <div className="col-6">
                            <a className='input-a'><i>Mutations Table</i></a>
                            <p>
                                The 
                            </p>

                        </div>
                        <div className="col-6">
                            <img className='img' src='/mutations_table.png'></img>
                        </div>
                    </div>

                    



                </Tab>
                <Tab eventKey="alignment" title="Sequence Alignment">
                    <h4>Inputs</h4>
                    <div className="row">

                        <div className="col-5">
                            <ul>
                                <li>
                                    <a className='input-a'><i>Query sequence(s)</i></a>: 
                                    Enter sequence(s) in fasta format with each sequence seperated by a newline.
                                    <p className='font-sm'>
                                        Example format: 
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&gt;sequence_id_1
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;ATTCA..
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&gt;sequence_id_2
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;CGTGA..
                                    </p>
                                </li>
                                <li>
                                    <a className='input-a'><i>FASTA file</i></a>:
                                    Upload .fasta file.
                                </li>
                                <li><i>Note: none of the sequences or files submitted will be stored</i></li>
                            
                            </ul>
                        </div>
                        
                        <div className="col-7">
                            <img className='img' src='/alignment_input.png'></img>
                        </div>
                    </div>

                    <hr></hr>

                    <h4>Results</h4>
                    <div className="row">
                        <p>
                            <ol>
                                <li>
                                    <a className='input-a'><i>BLAST search</i></a>
                                    <br></br>
                                    <p>
                                        V-gTK does a BLAST search of the submitted sequences against the
                                        {process.env.REACT_APP_VIRUS_ABB}-gDB reference sequences to find
                                        the best match reference to align against. Each sequence will be 
                                        indivindually blasted to find the best reference.
                                    </p>
                                </li>
                                <li>
                                    <a classname='input-a'><i>MAFFT Alignment</i></a>
                                     <br></br>
                                    <p>
                                        Once the best reference has been found, each sequence will be aligned to
                                        it's reference sequence using MAFFT.
                                    </p>
                                </li>
                                <li>
                                   <a className='input-a'><i>Clade Assignment/Phylogeny Tree</i></a>
                                   <br></br>
                                   <p>
                                    Using USHER, the major and minor clade for each submitted sequence is identified. 
                                    The sequences are then formatted into a phylogeny tree.  
                                   </p>
                                </li>
                            </ol>
                        </p>

                    </div>
                </Tab>
            </Tabs>
            
        </div>
    );
};
 
export default Help;
