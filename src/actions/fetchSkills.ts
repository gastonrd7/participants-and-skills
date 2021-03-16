import axios, { AxiosError } from 'axios';
import { ISkills } from '../interfaces/skills';
import { RootState } from '../combineReducers';
import { ThunkAction } from 'redux-thunk';
import { IAllSkillsRow } from '../reducers/skills';

const fetchSkillsRequest = (participantId: string) => ({
    type: 'FETCH_SKILLS_REQUEST',
    payload: {
        participantId
    }
  } as const);

const fetchSkillsSuccess = (participantId: string, skills: ISkills) =>
  ({
    type: 'FETCH_SKILLS_SUCCESS',
    payload: { skills, participantId }
  } as const);

const fetchSkillsFailure = (participantId: string, error: AxiosError) => {
  return {
    type: 'FETCH_SKILLS_FAILURE',
    payload: { error, participantId }
  } as const;
};

const shouldFetchSkills = (
  { Skills: { rowsData } }: RootState,
  participantId: string
) => 
{
    const itemSelected : IAllSkillsRow  =  rowsData[participantId];
    debugger
    return !(itemSelected && !itemSelected.isFetching);
}

const fetchSkills = (
    participantId: string
): ThunkAction<Promise<ISkills>, RootState, null, Actions> => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(fetchSkillsRequest(participantId));
      // const { data } = await axios.get<IParticipant[]>(
      //   `/api/Participants`,
      //   //{ params }
      // );

      const item : ISkills = {
        id: '1',
        ParticipantId: '111',
        Strength: 10,
        Endurance: 11, 
        Dexterity: 12,
        decisionMaking: 13,
        items: [{
            name: "Hill Climb",
            Order: 1,
            P: true,
            R: true,
            W: true,
            F: true,
            time: "00: 17: 34",
            score: 5,
            from: "PostApocalypticHighway"
        }]
      }

      dispatch(fetchSkillsSuccess(participantId, item));
      resolve(item);
    } catch (error) {
      dispatch(fetchSkillsFailure(participantId, error));
      reject();
    }
  });

export const fetchSkillsIfNeeded = (
    participantId: string
): ThunkAction<Promise<ISkills>, RootState, null, Actions> => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    try {
      if (shouldFetchSkills(getState(), participantId)) {
        const data = await dispatch(fetchSkills(participantId));
        resolve(data);
      } 
    //   else {
    //     const { skills } = getState().Skills;
    //     skills && resolve(skills);
    //   }
    } catch (error) {
      dispatch(fetchSkillsFailure(participantId, error));
      reject();
    }
  });

export type Actions =
  | ReturnType<typeof fetchSkillsRequest>
  | ReturnType<typeof fetchSkillsSuccess>
  | ReturnType<typeof fetchSkillsFailure>;