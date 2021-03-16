import { RootActions } from '../combineActions';
import { AxiosError } from 'axios';
import { IParticipant } from '../interfaces/participant';

export type State = {
  isFetching: boolean;
  participants: IParticipant[] | null;
  error: AxiosError | null;
  totalCount: number;
};

export const initialState: State = {
  isFetching: false,
  participants: null,
  error: null,
  totalCount: 0
};

export function reducer(state: State = initialState, action: RootActions): State {
  switch (action.type) {
    case 'FETCH_PARTICIPANTS_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_PARTICIPANTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        participants:  action.payload,
        totalCount: action.payload.length,
        error: null
      };
    case 'FETCH_PARTICIPANTS_FAILURE':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
