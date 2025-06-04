// collaborator-mapper.ts
import { Collaborator } from "../collaborator";
import { CollaboratorViewModel } from "../collaborator-details/collaborator.viewmodel";

export function toCollaboratorViewModel(c: Collaborator): CollaboratorViewModel {
  return {
    collabId: c.collabId,
    userId: c.userId,
    names: c.names,
    surnames: c.surnames,
    email: c.email,
    userPeriod: {
      _initDate: new Date(c.userPeriod._initDate),
      _finalDate: new Date(c.userPeriod._finalDate),
    },
    collaboratorPeriod: {
      _initDate: new Date(c.collaboratorPeriod._initDate),
      _finalDate: new Date(c.collaboratorPeriod._finalDate),
    }
  };
}

export function fromCollaboratorViewModel(vm: CollaboratorViewModel): Collaborator {
  return {
    collabId: vm.collabId,
    userId: vm.userId,
    names: vm.names,
    surnames: vm.surnames,
    email: vm.email,
    userPeriod: {
      _initDate: new Date(vm.userPeriod._initDate),
      _finalDate: new Date(vm.userPeriod._finalDate),
    },
    collaboratorPeriod: {
      _initDate: new Date(vm.collaboratorPeriod._initDate),
      _finalDate: new Date(vm.collaboratorPeriod._finalDate),
    }
  };
}


