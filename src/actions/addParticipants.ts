import axios, { AxiosError } from 'axios';
import { RootState } from '../combineReducers';
import { ThunkAction } from 'redux-thunk';

const addParticipantsRequest = () =>
  ({
    type: 'ADD_PARTICIPANTS_REQUEST'
  } as const);

const addParticipantsSuccess = () =>
  ({
    type: 'ADD_PARTICIPANTS_SUCCESS'
  } as const);

const addParticipantsFailure = (error: AxiosError) => {
  return {
    type: 'ADD_PARTICIPANTS_FAILURE',
    error
  } as const;
};

const shouldAddParticipants = (
  { Participants: { isFetching, participants } }: RootState
) =>{
    return (!participants && !isFetching);
}
  

const addParticipants = (
): ThunkAction<Promise<void>, RootState, null, Actions> => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(addParticipantsRequest());
      await axios.post<{success: boolean, message: string}>(
        `http://localhost:3001/Api/initAndGetParticipants`,
      );
      dispatch(addParticipantsSuccess());
      resolve();
    } catch (error) {
      dispatch(addParticipantsFailure(error));
      reject();
    }
  });

export const fetchAddParticipantsIfNeeded = (
): ThunkAction<Promise<void>, RootState, null, Actions> => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    try {
      if (shouldAddParticipants(getState())) {
        await dispatch(addParticipants());
        //await dispatch(fetchParticipantsIfNeeded());
        resolve();
      } else dispatch(addParticipantsSuccess());
    } catch (error) {
      dispatch(addParticipantsFailure(error));
      reject();
    }
  });

export type Actions =
  | ReturnType<typeof addParticipantsRequest>
  | ReturnType<typeof addParticipantsSuccess>
  | ReturnType<typeof addParticipantsFailure>;