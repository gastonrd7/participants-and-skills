import axios, { AxiosError } from 'axios';
import { IParticipant } from '../interfaces/participant';
import { RootState } from '../combineReducers';
import { ThunkAction } from 'redux-thunk';

const fetchParticipantsRequest = () =>
  ({
    type: 'FETCH_PARTICIPANTS_REQUEST'
  } as const);

const fetchParticipantsSuccess = (payload: IParticipant[] | null) =>
  ({
    type: 'FETCH_PARTICIPANTS_SUCCESS',
    payload
  } as const);

const fetchParticipantsFailure = (error: AxiosError) => {
  return {
    type: 'FETCH_PARTICIPANTS_FAILURE',
    error
  } as const;
};

const shouldFetchParticipants = (
  { Participants: { isFetching, participants } }: RootState
) =>
  (!participants && !isFetching);

const fetchParticipants = (
): ThunkAction<Promise<IParticipant[]>, RootState, null, Actions> => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(fetchParticipantsRequest());
      const { data } = await axios.get<IParticipant[]>(
        `http://localhost:3001/Api/getParticipants`,
      );

      dispatch(fetchParticipantsSuccess(data.length > 0 ? data : null));
      resolve(data);
    } catch (error) {
      dispatch(fetchParticipantsFailure(error));
      reject();
    }
  });

export const fetchParticipantsIfNeeded = (
): ThunkAction<Promise<IParticipant[]>, RootState, null, Actions> => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    try {
      if (shouldFetchParticipants(getState())) {
        const data = await dispatch(fetchParticipants());
        resolve(data);
      }
    } catch (error) {
      dispatch(fetchParticipantsFailure(error));
      reject();
    }
  });

export type Actions =
  | ReturnType<typeof fetchParticipantsRequest>
  | ReturnType<typeof fetchParticipantsSuccess>
  | ReturnType<typeof fetchParticipantsFailure>;