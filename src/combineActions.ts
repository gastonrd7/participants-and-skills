import { Actions as FetchParticipantsActions } from './actions/fetchParticpants';
import { Actions as FetchSkillsActions } from './actions/fetchSkills';

export type RootActions =
| FetchParticipantsActions
| FetchSkillsActions;