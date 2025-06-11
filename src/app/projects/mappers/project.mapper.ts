import { ProjectViewModel } from "../models/project-view-model.model";
import { Project } from "../models/project.model";

export function toProjectViewModel(project: Project): ProjectViewModel {
    return {
        id: project.id,
        title: project.title,
        acronym: project.acronym,
        periodDate: project.periodDate
    };
}

export function fromProjectViewModel(projectVM: ProjectViewModel): Project {
    return {
        id: projectVM.id,
        title: projectVM.title,
        acronym: projectVM.acronym,
        periodDate: projectVM.periodDate
    };
}