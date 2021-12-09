import PropTypes from 'prop-types';
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

HistoryListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function HistoryListHead({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
