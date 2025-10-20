import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import '../../assets/styles/pagingButtons.css'


const PagingButtons = ({ data, onPageChange}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [startRecord, setStartRecord] = useState(0);

    useEffect(() => {
        // Calculate the current items based on pagination state
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        // const startRecord = indexOfFirstItem + 1;
        const endRecord = Math.min(indexOfLastItem, data.length);
        setStartRecord(indexOfFirstItem + 1)
        

        // Pass the current items back to the parent component
        onPageChange([currentItems, startRecord, endRecord]);
    }, [currentPage, itemsPerPage, startRecord, data]);

    const handlePageIncrease = () => {setCurrentPage(prev => prev + 1);};
    const handlePageDecrease = () => {setCurrentPage(prev => prev - 1);};

    const firstPage = () => {setCurrentPage(1);};
    const lastPage = () => {
        const lastPage = Math.ceil(data.length / itemsPerPage);
        setCurrentPage(lastPage);
    };

    const onItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when items per page change
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

  return (
    <div>
        <div>
            <Button size="sm" className="paging-buttons" disabled={currentPage === 1} onClick={firstPage}> First</Button> {''}
            <div className="btn-group">
                <Button size="sm" className="paging-buttons" disabled={currentPage === 1 | pageNumbers.length === 0} onClick={handlePageDecrease}> Previous </Button> {''}
                <Button size="sm" className="paging-buttons" disabled={currentPage === pageNumbers.length | pageNumbers.length === 0} onClick={handlePageIncrease}> Next </Button> {''}
            </div> {''}
            <Button size="sm" className="paging-buttons" disabled={currentPage === pageNumbers.length | pageNumbers.length === 0} onClick={lastPage}> Last </Button> {''}
            <Button size="sm" className="paging-buttons dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" >
                Items per page: {itemsPerPage}
            </Button>
            <div className="dropdown-menu custom-dropdown" aria-labelledby="dropdownMenuButton">
                <a onClick={() => onItemsPerPageChange(10)} className="dropdown-item" >10</a>
                <a onClick={() => onItemsPerPageChange(25)} className="dropdown-item" >25</a>
                <a onClick={() => onItemsPerPageChange(50)} className="dropdown-item" >50</a>
            </div>
        </div>
    </div>
  );
};

export default PagingButtons;
