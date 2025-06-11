import { Component, input } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collaborator-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaborators = input.required<Collaborator[]>();
}
