import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { TrainingModulesComponent } from './trainingModules/training-modules/training-modules.component';

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
        component: CollaboratorsComponent
    },
    {
        path: 'trainingModules',
        component: TrainingModulesComponent
    }
];
