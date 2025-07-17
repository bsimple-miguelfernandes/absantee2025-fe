export interface CollaboratorDetails {
    collabId: string;
    userId: string;
    names: string;
    surnames: string;
    email: string;
    collaboratorPeriod: {
        _initDate: string;
        _finalDate: string;
    };
}