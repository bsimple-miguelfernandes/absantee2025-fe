export interface TaskForceViewModel {
    id: string;
    subjectId: string;
    projectId: string;
    description: string;
    initDate: string;
    endDate: string;
}

export interface TaskForceCollaboratorViewModel {
    id: string;
    taskForceId: string;
    collaboratorId: string;
}