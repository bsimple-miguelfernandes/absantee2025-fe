import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorDetailsComponent } from './collaborators/collaborator-details/collaborator-details.component';
import { resolverCollaborator } from './collaborators/resolvers/collaborator-resolver.resolver';
import { CollaboratorHolidaysComponent } from './collaborators/collaborator-holidays/collaborator-holidays.component';
import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator/associations-project-collaborator.component';
import { ProjectComponent } from './projects/project/project.component';
import { AddCollaboratorProjectComponent } from './associations-project-collaborator/add-collaborator-project/add-collaborator-project.component';
import { projectResolver } from './projects/resolvers/project.resolver';

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
                    project: projectResolver
                }
            },
            {
                path: 'associations/:projectId',
                component: AssociationsProjectCollaboratorComponent,
                resolve: {
                    project: projectResolver
                }
            },
            {
                path: 'associations/add-collaborator/:projectId',
                component: AddCollaboratorProjectComponent,
                resolve: {
                    project: projectResolver
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
                    collaborator: resolverCollaborator
                }
            },
            {
                path: 'holidayPlan/:collabId',
                component: CollaboratorHolidaysComponent,
                resolve: {
                    collaborator: resolverCollaborator
                }
            },
            {
                path: 'associations/:collabId',
                component: AssociationsProjectCollaboratorComponent,
                resolve: {
                    collaborator: resolverCollaborator
                }
            },
            {
                path: 'associations/add-project/:collabId',
                component: AddCollaboratorProjectComponent,
                resolve: {
                    collaborator: resolverCollaborator
                }
            }
        ]
    }
];
