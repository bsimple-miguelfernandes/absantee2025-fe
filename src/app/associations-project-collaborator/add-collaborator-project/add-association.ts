export interface AssociationProjectCollaboratorCreateRequest {
    collaboratorId: string;
    projectId: string;
    periodDate: {
        initDate: string;
        finalDate: string;
    };
}
