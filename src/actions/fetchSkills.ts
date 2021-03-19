import axios, { AxiosError } from 'axios';
import { ISkills } from '../interfaces/skills';
import { RootState } from '../combineReducers';
import { ThunkAction } from 'redux-thunk';
import { IAllSkillsRow } from '../interfaces/skills';

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
    return !(itemSelected && !itemSelected.isFetching);
}

const fetchSkills = (
    participantId: string
): ThunkAction<Promise<ISkills>, RootState, null, Actions> => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(fetchSkillsRequest(participantId));
      const { data : {skill} } = await axios.get<{skill: ISkills[]}>(
        `http://localhost:3001/Api/getSkills/${participantId}`,
      );
      dispatch(fetchSkillsSuccess(participantId, skill[0]));
      resolve(skill[0]);
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
    } catch (error) {
      dispatch(fetchSkillsFailure(participantId, error));
      reject();
    }
  });

export type Actions =
  | ReturnType<typeof fetchSkillsRequest>
  | ReturnType<typeof fetchSkillsSuccess>
  | ReturnType<typeof fetchSkillsFailure>;