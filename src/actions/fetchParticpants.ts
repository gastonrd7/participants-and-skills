import axios, { AxiosError } from 'axios';
import { IParticipant } from '../interfaces/participant';
import { RootState } from '../combineReducers';
import { ThunkAction } from 'redux-thunk';

const fetchParticipantsRequest = () =>
  ({
    type: 'FETCH_PARTICIPANTS_REQUEST'
  } as const);

const fetchParticipantsSuccess = (payload: IParticipant[]) =>
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
      // const { data } = await axios.get<IParticipant[]>(
      //   `/api/Participants`,
      //   //{ params }
      // );

      const item1 : IParticipant = {
        id: '111',
        fullNane: "Gaston Ruiz Diaz",
        profilePicture: "https://material-ui.com/static/images/avatar/1.jpg",
        bib: 1,
        age: 32,
        gender: 'M',
        time: "11: 45",
        score: 100
      }

      const ite2 : IParticipant = {
        id: '2',
        fullNane: "Guillermina Hermosa Diaz ",
        profilePicture: "https://material-ui.com/static/images/avatar/1.jpg",
        bib: 2,
        age: 62,
        gender: 'F',
        time: "12: 45",
        score: 200
      }
      const data :IParticipant []  = [
        item1, ite2
      ]

      dispatch(fetchParticipantsSuccess(data));
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
      } else {
        const { participants } = getState().Participants;
        participants && resolve(participants);
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