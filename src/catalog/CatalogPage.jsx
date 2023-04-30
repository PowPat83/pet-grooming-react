import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IndividualServiceListing from './IndividualServiceListing';
import { ButtonGroup } from '@mui/material';
import PaginationWithActions from '../components/PaginationWithActions';
import { useNavigate } from 'react-router-dom';
import {
  getAllGroomingServices,
  updatePageNumber,
  updateRowsPerPage,
} from './catalogSlice';

const ITEMS_PER_ROW = 5;
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

function CatalogPage() {
  const dispatch = useDispatch();

  const handleChangePage = (_event, pageNum) => {
    dispatch(updatePageNumber(pageNum));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(updateRowsPerPage(event.target.value));
    dispatch(updatePageNumber(0));
  };

  const parseArray = (arr) => {
    const tempArr = arr.slice();
    const newArr = [];
    while (tempArr.length) newArr.push(tempArr.splice(0, ITEMS_PER_ROW));
    return newArr;
  };

  const { listOfServices, totalElements, pageSize, pageNumber, type } =
    useSelector(({ catalog }) => catalog);

  useEffect(() => {
    dispatch(getAllGroomingServices());
  }, [pageNumber, pageSize, type]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Grooming Services</h1>
      {/* TODO: come up with design, if it should be on left or center
          this is just a placeholder
      */}
      <ButtonGroup
        variant='text'
        size='large'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      ></ButtonGroup>
      <br />
      {/* TODO: better styling for row, layout will be weird when not multiple of 5.
          Maybe can consider put inside table with no border */}
      {parseArray(listOfServices).map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {row.map((col, colIndex) => (
            <IndividualServiceListing key={colIndex} service={col} />
          ))}
        </div>
      ))}
      <br />
      <br />
      <PaginationWithActions
        count={totalElements}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={pageNumber}
      />
    </div>
  );
}

export default CatalogPage;
