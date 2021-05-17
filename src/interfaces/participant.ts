export interface IParticipant { 
    _id: string;
    fullName: string;
    profilePicture: string;
    bib: number;
    age: number;
    gender: 'M' | 'F' | 'OTHER';
    time: string;
    score: number;
}