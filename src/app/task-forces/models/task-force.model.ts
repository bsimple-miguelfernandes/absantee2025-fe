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
    initDate: Date;
    endDate: Date;
    projectInitDate: Date;
    projectEndDate: Date;
    collaborators: string[];
}

export interface UpdateDTO {
    initDate?: Date;
    endDate?: Date;
    description?: string;
}

export interface UpdateTaskForceCollaboratorsDTO {
    collaborators: string[];
}