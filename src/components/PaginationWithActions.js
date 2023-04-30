import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { IconButton, TablePagination } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { updatePageNumber } from '../catalog/catalogSlice';

function PaginationWithActions(props) {
  return (
    <TablePagination
      {...props}
      component='div'
      ActionsComponent={TablePaginationActions}
    />
  );
}

function TablePaginationActions(props) {
  const dispatch = useDispatch();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = () => {
    dispatch(updatePageNumber(0));
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = () => {
    dispatch(updatePageNumber(page + 1));
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage)) - 1);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        <KeyboardArrowRightIcon />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default PaginationWithActions;
