import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RootActions } from '../combineActions';
import { RootState } from '../combineReducers';
import { fetchParticipantsIfNeeded } from '../actions/fetchParticpants';
import { fetchAddParticipantsIfNeeded } from '../actions/addParticipants';
import { fetchSkillsIfNeeded } from '../actions/fetchSkills';
import '../App.css';
import Table from '../components/grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const mapStateToProps = ({
  Participants: {isFetching: isFetchingParticipants, participants, participantsAdded},
  Skills: {rowsData}
}: RootState) => ({
  isFetchingParticipants,
  participants,
  rowsData,
  participantsAdded
  });

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, null, RootActions>,
  ) => ({
    fetchParticipantsIfNeeded: () =>
        dispatch(fetchParticipantsIfNeeded()),
    fetchSkillsIfNeeded: (participantId: string) =>
        dispatch(fetchSkillsIfNeeded(participantId)),
    fetchAddParticipantsIfNeeded: () =>
        dispatch(fetchAddParticipantsIfNeeded()),
  });

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Participants extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
      props.fetchParticipantsIfNeeded();
    }

    fetchParticipants = ()  => {
      this.props.fetchParticipantsIfNeeded();
    }

    fetchSkills = (participantId: string) => {
      this.props.fetchSkillsIfNeeded(participantId);
    }
    addParticipants = () => {
      this.props.fetchAddParticipantsIfNeeded();
    }

    render() {
        const { participants, isFetchingParticipants, rowsData, participantsAdded } = this.props;
        return (
          <div className="App">
            <body className="App-body">
              {
                !participantsAdded ?  
                <Button 
                 onClick={this.addParticipants} 
                 style={{ backgroundColor: 'white' }}>
                  Add Participants
                </Button> : !participants ?  <Button 
                 onClick={this.fetchParticipants} 
                 style={{ backgroundColor: 'white' }}>
                  Get Participants
                </Button> :
                isFetchingParticipants ? <CircularProgress /> : 
                <Table 
                participants={participants}
                fetchSkills={this.fetchSkills}
                rowsData={rowsData}
                 /> 
              }
            
            
            </body>
          </div>
            
        );
    }
}

export const ParticipantsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Participants);