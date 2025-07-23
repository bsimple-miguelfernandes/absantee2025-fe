import { Routes } from '@angular/router'
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorDetailsComponent } from './collaborators/collaborator-details/collaborator-details.component';
import { CollaboratorDetailsResolver } from './collaborator-details.resolver';
import { CollaboratorHolidaysResolver } from './collaborator-holidays.resolver';
import { CollaboratorHolidaysComponent } from './collaborators/collaborator-holidays/collaborator-holidays.component';
import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator/associations-project-collaborator.component';
import { AssociationCollaboratorResolver } from './association-collaborator.resolver';
import { ProjectComponent } from './projects/project/project.component';
import { AssociationProjectResolver } from './association-project.resolver';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectDetailsResolver } from './projects/resolvers/project-details.resolver';
import { TrainingSubjectFormComponent } from './training-subjects/training-subject-form/training-subject-form.component';
import { TrainingSubjectsComponent } from './training-subjects/training-subjects.component';
import { TrainingSubjectDetailsResolver } from './training-subjects/training-subject.resolver';
import { TrainingModulesComponent } from './training-modules/training-modules.component';
import { resolverTrainingModule, TrainingModuleDetailsComponent } from './training-modules/training-module-details/training-module-details.component';
import { TrainingSubjectDetailsComponent } from './training-subjects/training-subject-details/training-subject-details.component';
import { AssociationsTrainingmoduleCollaboratorComponent } from './associations-trainingmodule-collaborator/associations-trainingmodule-collaborator.component';
import { AssociationCollaboratorTrainingModuleResolver } from './associations-trainingmodule-collaborator/resolvers/association-collaborator-trainingmodule.resolver';
import { AssociationTrainingModuleCollaboratorResolver } from './associations-trainingmodule-collaborator/resolvers/association-trainingmodule-collaborator.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      {
        path: 'details/:projectId',
        component: ProjectComponent,
        resolve: {
          ProjectData: ProjectDetailsResolver
        }
      },
      {
        path: 'create',
        component: ProjectFormComponent
      },
      {
        path: 'edit/:projectId',
        component: ProjectFormComponent,
        resolve: {
          ProjectData: ProjectDetailsResolver
        }
      },
      {
        path: 'associations/:selectedId',
        component: AssociationsProjectCollaboratorComponent,
        resolve: {
          AssociationData: AssociationProjectResolver
        }
      }
    ]
  },
  {
    path: 'collaborators',
    component: CollaboratorsComponent,
    children: [
      {
        path: 'details/:collabId',
        component: CollaboratorDetailsComponent,
        resolve: {
          DetailsData: CollaboratorDetailsResolver
        }
      },
      {
        path: 'holidays/:collabId',
        component: CollaboratorHolidaysComponent,
        resolve: {
          HolidaysData: CollaboratorHolidaysResolver
        }
      },
      {
        path: 'associations/:selectedId',
        component: AssociationsProjectCollaboratorComponent,
        resolve: {
          AssociationData: AssociationCollaboratorResolver
        }
      },
      {
        path: 'associations-trainingmodule/:selectedId',
        component: AssociationsTrainingmoduleCollaboratorComponent,
        resolve: {
          AssociationData: AssociationCollaboratorTrainingModuleResolver
        }
      }
    ]
  },
  {
    path: 'training-modules',
    component: TrainingModulesComponent,
    children: [
      {
        path: 'subjects/create',
        component: TrainingSubjectFormComponent
      },
      {
        path: ':trainingModuleId',
        component: TrainingModuleDetailsComponent,
        resolve: { trainingModule: resolverTrainingModule }
      },
      {
        path: 'associations-trainingmodule/:selectedId',
        component: AssociationsTrainingmoduleCollaboratorComponent,
        resolve: {
          AssociationData: AssociationTrainingModuleCollaboratorResolver
        }
      }
    ]
  },
  {
    path: 'training-subjects',
    component: TrainingSubjectsComponent,
    children: [
      {
        path: 'create',
        component: TrainingSubjectFormComponent,
      },
      {
        path: ':trainingSubjectId',
        component: TrainingSubjectDetailsComponent,
        resolve: {
          trainingSubject: TrainingSubjectDetailsResolver,
        }
      },
      {
        path: ':trainingSubjectId/edit',
        component: TrainingSubjectFormComponent,
        resolve: {
          trainingSubject: TrainingSubjectDetailsResolver
        }
      }
    ]
  }
];
