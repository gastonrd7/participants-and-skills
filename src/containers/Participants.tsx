import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RootActions } from '../combineActions';
import { RootState } from '../combineReducers';
import { IParticipant } from '../interfaces/participant';
import { fetchParticipantsIfNeeded } from '../actions/fetchParticpants';
import { fetchSkillsIfNeeded } from '../actions/fetchSkills';
import '../App.css';
import Table from '../components/grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = (state: RootState) => state.Participants;

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, null, RootActions>,
  ) => ({
    fetchParticipantsIfNeeded: () =>
        dispatch(fetchParticipantsIfNeeded()),
    fetchSkillsIfNeeded: (participantId: string) =>
        dispatch(fetchSkillsIfNeeded(participantId)),
  });

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Participants extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
      props.fetchParticipantsIfNeeded();
    }

    fetchSkills = (participantId: string) => {
      this.props.fetchSkillsIfNeeded(participantId);
    }

    render() {
        const { participants, isFetching } = this.props;
    
        return (
          <div className="App">
            <body className="App-body">
              {
                isFetching ? <CircularProgress /> : 
                <Table 
                participants={participants}
                fetchSkills={this.fetchSkills}
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