import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Skills from './skills';
import Avatar from '@material-ui/core/Avatar';
import { IParticipant } from '../interfaces/participant';
import { IAllSkillsRow } from '../interfaces/skills';
import CircularProgress from '@material-ui/core/CircularProgress';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
  },
});

type Props = {
  participants: IParticipant[] | null;
  fetchSkills: (id: string) => void;
  rowsData : {
    [participantId: string]: IAllSkillsRow;
  }
}

const Row : React.FC<{item: IParticipant, fetchSkills: (id: string) => void, skills: IAllSkillsRow}> = ({item, fetchSkills, skills}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => { !open && fetchSkills(item._id); setOpen(!open)}}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" size="small">{item._id}</TableCell>
        <TableCell align="center" size="small">
        <Avatar alt="Remy Sharp" src={item.profilePicture} />
        </TableCell>
        <TableCell align="left">{item.fullNane}</TableCell>
        <TableCell align="center">{item.bib}</TableCell>
        <TableCell align="center">{item.age}</TableCell>
        <TableCell align="center">{item.gender}</TableCell>
        <TableCell align="center">{item.time}</TableCell>
        <TableCell align="center">{item.score}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {
              skills && skills.isFetching ? <CircularProgress /> : <Skills skills={skills} />
            }          
            
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const CollapsibleTable: React.FC<Props> = ({participants, fetchSkills, rowsData}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align="center">BIB</TableCell>
            <TableCell align="center">AGE</TableCell>
            <TableCell align="center">GENDER</TableCell>
            <TableCell align="center">TIME</TableCell>
            <TableCell align="center">SCORE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants ? participants.map((item: IParticipant) => (
            <Row item={item} fetchSkills={fetchSkills} skills={rowsData[item._id]} />
          )) : "There is not any row"
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
