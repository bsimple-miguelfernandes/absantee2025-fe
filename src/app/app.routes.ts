import { Routes } from '@angular/router';
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
import { SubjectsComponent } from './subjects/subjects.component';
import { TaskForcesComponent } from './task-forces/task-forces.component';
import { TaskForceEditComponent } from './task-forces/task-force-edit/task-force-edit.component';
import { TaskForceCollaboratorsComponent } from './task-forces/task-force-collaborators/task-force-collaborators.component';
import { TaskForceCreateComponent } from './task-forces/task-force-create/task-force-create.component';

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
            }
        ]
    },
    {
        path: 'subjects',
        component: SubjectsComponent
    },
    {
        path: 'taskforces',
        component: TaskForcesComponent,
        children: [
            { path: 'create', component: TaskForceCreateComponent },
            { path: 'edit/:taskForceId', component: TaskForceEditComponent },
            { path: 'collaborators/:taskForceId', component: TaskForceCollaboratorsComponent }
        ]
    }
];
