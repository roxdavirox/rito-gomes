import { useState } from 'react';

import {
  Card,
  Table,
  Stack,

  TextField,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,

  Box,
  Grid,
} from '@mui/material';

import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import { HistoryListHead } from '../components/_dashboard/matchHistory';
import useRiot from 'src/hooks/useRiot';

const TABLE_HEAD = [
  { id: 'champion', label: 'Champion', alignRight: true },
  { id: 'kda', label: 'K/DA', alignRight: false },
  { id: 'farm', label: 'Minions Killed', alignRight: false },
  { id: 'win', label: 'Win', alignRight: false },
];

export default function MatchHistory() {
  const { matchHistory, searchMatchHistoryByName } = useRiot();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => searchMatchHistoryByName(searchTerm);
  
  return (
    <Page title="Match History">
      <Container>
        <Card>
          <Box style={{ display: 'flex' }}>
            <Grid item sx={10} sm={10} lg={10}>
              <TextField fullWidth onChange={e => setSearchTerm(e.target.value)}/>
            </Grid>
            <Grid item sx={10} sm={2} lg={2}>            
              <Button onClick={handleSearch} fullWidth style={{ height: '100%' }} variant="outlined">Find</Button>
            </Grid>
          </Box>
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <HistoryListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {matchHistory.length > 0 && matchHistory
                    .map((row, id) => {
                      const { championName, totalMinionsKilled, kills, deaths, assists, win } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                        >
                          <TableCell component="th" scope="row" padding="10px">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {championName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{`${kills}/${deaths}/${assists}`}</TableCell>
                          <TableCell align="left">{totalMinionsKilled}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="filled"
                              color={(Boolean(win) && 'success') || 'error'}
                            >
                              {win}
                            </Label>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
