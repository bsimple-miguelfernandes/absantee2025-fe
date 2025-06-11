import { TrainingSubject } from "../../training-subjects/training-subject";
import { TrainingSubjectViewModel } from "../../training-subjects/training-subject.viewmodel";

export function toTrainingSubjectViewModel(s: TrainingSubject): TrainingSubjectViewModel {
    return {
        id: s.id,
        subject: s.subject,
        description: s.description
    }
}

export function fromTrainingSubjectViewModel(vm: TrainingSubjectViewModel): TrainingSubject {
    return {
        id: vm.id,
        subject: vm.subject,
        description: vm.description
    }
}