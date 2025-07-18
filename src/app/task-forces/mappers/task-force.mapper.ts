import { TaskForceCollaboratorDTO, TaskForceDTO } from "../models/task-force.model";
import { TaskForceCollaboratorViewModel, TaskForceViewModel } from "../models/task-force.view-model";

export function toTaskForceModelView(taskForce: TaskForceDTO): TaskForceViewModel {
    return {
        id: taskForce.id,
        subjectId: taskForce.subjectId,
        projectId: taskForce.projectId,
        description: taskForce.description,
        initDate: taskForce.initDate,
        endDate: taskForce.endDate
    };
}

export function fromTaskForceModelView(taskForce: TaskForceViewModel): TaskForceDTO {
    return {
        id: taskForce.id,
        subjectId: taskForce.subjectId,
        projectId: taskForce.projectId,
        description: taskForce.description,
        initDate: taskForce.initDate,
        endDate: taskForce.endDate
    };
}

export function toTaskForceCollaboratorModelView(taskForceCollaborator: TaskForceCollaboratorDTO): TaskForceCollaboratorViewModel {
    return {
        id: taskForceCollaborator.id,
        taskForceId: taskForceCollaborator.taskForceId,
        collaboratorId: taskForceCollaborator.collaboratorId
    };
}

export function fromTaskForceCollaboratorModelView(taskForceCollaborator: TaskForceCollaboratorViewModel): TaskForceCollaboratorDTO {
    return {
        id: taskForceCollaborator.id,
        taskForceId: taskForceCollaborator.taskForceId,
        collaboratorId: taskForceCollaborator.collaboratorId
    };
}
