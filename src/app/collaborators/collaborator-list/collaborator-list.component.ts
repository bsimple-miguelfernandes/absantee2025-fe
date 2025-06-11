import { Component, effect, input } from '@angular/core';
import { Collaborator } from '../collaborator.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchCollaboratorsComponent } from "./search-collaborators/search-collaborators.component";

@Component({
  selector: 'app-collaborator-list',
  imports: [CommonModule, RouterLink, SearchCollaboratorsComponent],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaborators = input.required<Collaborator[]>();
  filter: boolean = false;
  filteredCollaborators: Collaborator[] = [];

  constructor() {
    effect(() => {
      this.filteredCollaborators = this.collaborators();
    })
  }

  startFilter() {
    this.filter = !this.filter;
  }

  onFilter(newCollabs: string[]) {
    this.filteredCollaborators = this.filteredCollaborators.filter(c => newCollabs.includes(c.collabId));
  }
}
