import { Subject } from "../models/subject.model";
import { SubjectViewModel } from "../models/subject.view-model";

export function toSubjectViewModel(subject: Subject): SubjectViewModel {
    return {
        id: subject.id,
        description: subject.description,
        details: subject.details
    };
}

export function fromSubjectViewModel(subjectVM: SubjectViewModel): Subject {
    return {
        id: subjectVM.id,
        description: subjectVM.description,
        details: subjectVM.details
    };
}
