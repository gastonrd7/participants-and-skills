export interface ISkills { 
    id: string,
    ParticipantId: string,
    Strength: number,
    Endurance: number,
    Dexterity: number,
    decisionMaking: number,
    items: [{
        name: string
        Order: 1,
        P: boolean,
        R: boolean,
        W: boolean,
        F: boolean,
        time: string,
        score: number,
        from: "PostApocalypticHighway" | "CostaRicaCaves"
    }]
}