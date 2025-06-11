import { Project } from "../project/project.model";
import { ProjectViewModel } from "../project/project.viewmodel";

export function toProjectViewModel(p: Project): ProjectViewModel {
    return {
        id: p.id,
        title: p.title,
        acronym: p.acronym,
        periodDate: p.periodDate
    };
}

export function fromProjectViewModel(vm: ProjectViewModel): Project {
    return {
        id: vm.id,
        title: vm.title,
        acronym: vm.acronym,
        periodDate: vm.periodDate
    };
}


