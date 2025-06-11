import { Component, inject, input } from '@angular/core';
import { Collaborator } from '../collaborator.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-collaborator-list',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaborators = input.required<Collaborator[]>();

  router = inject(Router);
  route = inject(ActivatedRoute);

  selectedCollaborator!: string;

  selectRoute(url: string, id: string) {
    const currentUrl = this.router.url;

    if (this.selectedCollaborator === id && currentUrl.includes(url)) {
      this.router.navigate(['/collaborators']);
      this.selectedCollaborator = "";
    } else {
      this.router.navigate([url, id], { relativeTo: this.route });
      this.selectedCollaborator = id;
    }
  }
}
