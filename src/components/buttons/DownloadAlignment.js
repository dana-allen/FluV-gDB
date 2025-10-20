import { useState } from 'react';

import AlignmentFilter from '../filters/AlignmentFilter'

const DownloadAlignment = ({filters, sequences}) => {

    const [show, setShow] = useState(false)
    const handleClose = () => { setShow(false) }
    const download = () => { setShow(true)}


    return (
        <div>
            <a onClick={download}>Download Alignments</a>
            <AlignmentFilter show={show} onClose={handleClose} params={filters} sequences={sequences}/>
        </div>

    );
};

export default DownloadAlignment;