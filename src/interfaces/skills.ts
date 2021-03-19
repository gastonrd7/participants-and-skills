import { AxiosError } from 'axios';

export type IAllSkillsRow = {
    data: ISkills | null;
    isFetching: boolean;
    error: AxiosError | null;
  };

export interface ISkills { 
    _id: string,
    participantId: string,
    header: {
        name: string,
        value: number,
        total:number,
        percentage: number
    }[],
    items: {
        name: string
        order: number,
        P: boolean,
        R: boolean,
        W: boolean,
        F: boolean,
        time: string,
        score: number,
        from: "PostApocalypticHighway" | "CostaRicaCaves"
    }[]
}