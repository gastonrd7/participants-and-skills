import { RootActions } from '../combineActions';
import { AxiosError } from 'axios';
import { ISkills } from '../interfaces/skills';

export type IAllSkillsRow = {
    data: ISkills | null;
    isFetching: boolean;
    error: AxiosError | null;
  };

export type State = {
    rowsData: {
    [participantId: string]: IAllSkillsRow;
  };
    expandedRows: string[];
};

// export type State = {
//   isFetching: boolean;
//   skills: ISkills | null;
//   error: AxiosError | null;
// };

export const initialState: State = {
    rowsData: {},
    expandedRows: []
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
