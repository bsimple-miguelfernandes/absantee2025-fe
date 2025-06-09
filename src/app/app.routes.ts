import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { TrainingModulesComponent } from './training-modules/training-modules.component';
import { CollaboratorDetailsComponent, resolverCollaborator } from './collaborators/collaborator-details/collaborator-details.component';
import { resolverTrainingModule, TrainingModuleDetailsComponent } from './training-modules/training-module-details/training-module-details.component';
import { resolverTrainingSubject, TrainingSubjectDetailsComponent } from './training-modules/training-subject-details/training-subject-details.component';
import { TrainingSubjectFormComponent } from './training-modules/training-subject-form/training-subject-form.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'collaborators',
        component: CollaboratorsComponent,
        children: [
            {
                path: 'details/:collabId',
                component: CollaboratorDetailsComponent,
                resolve: {
                    collaborator: resolverCollaborator
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
      path: 'subjects/:trainingSubjectId/edit',
      component: TrainingSubjectFormComponent,
      resolve: { trainingSubject: resolverTrainingSubject }
    },
    {
      path: 'subjects/:trainingSubjectId',
      component: TrainingSubjectDetailsComponent,
      resolve: { trainingSubject: resolverTrainingSubject }
    },
    {
      path: ':trainingModuleId',
      component: TrainingModuleDetailsComponent,
      resolve: { trainingModule: resolverTrainingModule }
    }
  ]
}
];
