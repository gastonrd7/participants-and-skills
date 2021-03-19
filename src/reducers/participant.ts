import { RootActions } from '../combineActions';
import { AxiosError } from 'axios';
import { IParticipant } from '../interfaces/participant';

export type State = {
  isFetching: boolean;
  participants: IParticipant[] | null;
  participantsAdded: boolean;
  error: AxiosError | null;
  totalCount: number;
};

export const initialState: State = {
  isFetching: false,
  participants: null,
  participantsAdded: false,
  error: null,
  totalCount: 0
};

export function reducer(state: State = initialState, action: RootActions): State {
  switch (action.type) {
    case 'ADD_PARTICIPANTS_REQUEST':
    case 'FETCH_PARTICIPANTS_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'ADD_PARTICIPANTS_SUCCESS':
        return {
          ...state,
          isFetching: false,
          participantsAdded: true,
        };
    case 'FETCH_PARTICIPANTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        participants:  action.payload,
        totalCount: action.payload ? action.payload.length : 0,
        participantsAdded: action.payload ? action.payload.length > 0 ? true : false : false,
        error: null
      };
    case 'FETCH_PARTICIPANTS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
