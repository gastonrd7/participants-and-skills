import { combineReducers } from 'redux';
import { reducer as Participants, 
    State as ParticipantsState } from './reducers/participant';
import { reducer as Skills, 
    State as SkillsState } from './reducers/skills';
import { RootActions } from './combineActions';

export type RootState = {
  Participants: ParticipantsState;
  Skills: SkillsState;
}

export const rootReducer = combineReducers<RootState, RootActions>({
  Participants,
  Skills
});