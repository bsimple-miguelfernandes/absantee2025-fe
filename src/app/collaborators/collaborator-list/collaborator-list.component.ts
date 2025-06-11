import { Component, effect, inject, input } from '@angular/core';
import { Collaborator } from '../collaborator.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SearchCollaboratorsComponent } from "../search-collaborators/search-collaborators.component";

@Component({
  selector: 'app-collaborator-list',
  imports: [CommonModule, RouterOutlet, SearchCollaboratorsComponent],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaborators = input.required<Collaborator[]>();
  filter: boolean = false;
  filteredCollaborators: Collaborator[] = [];

  router = inject(Router);
  route = inject(ActivatedRoute);

  selectedCollaborator!: string;

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

  select(url: string, id: string) {
    this.router.navigate([url, id], { relativeTo: this.route });
    this.selectedCollaborator = id;
  }
}
