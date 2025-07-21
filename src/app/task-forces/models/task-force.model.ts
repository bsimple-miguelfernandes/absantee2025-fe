export interface TaskForceDTO {
    id: string;
    subjectId: string;
    projectId: string;
    description: string;
    initDate: string;
    endDate: string;
}

export interface TaskForceCollaboratorDTO {
    id: string;
    taskForceId: string;
    collaboratorId: string;
}

export interface CreateTaskForceDTO {
    subjectId: string;
    projectId: string;
    description: string;
    initDate: string;
    endDate: string;
    projectInitDate: string;
    projectEndDate: string;
    collaborators: string[];
}

export interface UpdateDTO {
    initDate?: string;
    endDate?: string;
    description?: string;
}

export interface UpdateTaskForceCollaboratorsDTO {
    collaborators: string[];
}