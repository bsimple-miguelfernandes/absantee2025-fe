import { Component, inject, signal, effect } from '@angular/core';
import { CollaboratorListComponent } from "./collaborator-list/collaborator-list.component";
import { CollaboratorHolidaysComponent } from "./collaborator-holidays/collaborator-holidays.component";
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";
import { CollaboratorDataService } from './collaborator-data.service';
import { CommonModule } from '@angular/common';
import { CollaboratorViewModel } from './collaborator-details/collaborator.viewmodel';
import { toCollaboratorViewModel } from './mappers/collaborator.mapper';
import { RouterOutlet } from '@angular/router';
import { CollaboratorFormComponent } from './collaborator-form/collaborator-form.component';
import { CollaboratorSignalService } from './collaborator-signal.service';
@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [
    CommonModule,
    CollaboratorListComponent,
    CollaboratorFormComponent,
    RouterOutlet
  ],
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {
  collaboratorDataService = inject(CollaboratorDataService);
  collaboratorSignalService = inject(CollaboratorSignalService);

  collaborators = signal<CollaboratorViewModel[]>([]);
  isCreatingCollaboratorSignal = this.collaboratorSignalService.isCreatingCollaborator;
  isEditingCollaboratorSignal = this.collaboratorSignalService.isEditingCollaborator;
 ngOnInit() {
    this.collaboratorDataService.getCollabs().subscribe({
      next: list => {
        const vmList = list.map(toCollaboratorViewModel);
        this.collaboratorSignalService.setCollaborators(vmList);
      },
      error: err => console.error('Erro ao carregar colaboradores', err)
    });
  }
  constructor() {
    this.collaboratorDataService.getCollabs().subscribe({
      next: (collaborators) => {
        const collabVM = collaborators.map(toCollaboratorViewModel)

        this.collaborators.set(collabVM);
      },
      error: (err) => {
        alert('Error loading collaborators');
        console.error('Error loading collaborators', err);
      }
    });
  }
}
