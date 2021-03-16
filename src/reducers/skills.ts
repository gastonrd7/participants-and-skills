import { RootActions } from '../combineActions';
import { IAllSkillsRow } from '../interfaces/skills';


export type State = {
    rowsData: {
    [participantId: string]: IAllSkillsRow;
  };
};

export const initialState: State = {
    rowsData: {}
};

export function reducer(state: State = initialState, action: RootActions): State {
  switch (action.type) {
    case 'FETCH_SKILLS_REQUEST':
      return {
        ...state,
        rowsData: {
            ...state.rowsData,
            [action.payload.participantId]: {
              data: null,
              isFetching: true,
              error: null
            }
          }
      };
    case 'FETCH_SKILLS_SUCCESS':
      return {
        ...state,
        rowsData: {
          ...state.rowsData,
          [action.payload.participantId]: {
            data: action.payload.skills,
            isFetching: false,
            error: null
          }
        }
      };
    case 'FETCH_SKILLS_FAILURE':
      return {
        ...state,
        rowsData: {
          ...state.rowsData,
          [action.payload.participantId]: {
            data: null,
            isFetching: false,
            error: action.payload.error
          }
        }
      };
    default:
      return state;
  }
}
