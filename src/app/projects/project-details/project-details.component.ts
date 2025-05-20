import { Component, inject, input, OnInit } from '@angular/core';
import { AddAssociationProjectCollaborator, Project } from '../project/project';
import { ProjectService } from '../project.service';
import { DatePipe } from '@angular/common';
import { CollaboratorSignalService } from '../../collaborators/collaborator-signal.service';
import { FormsModule } from '@angular/forms';
import { AddCollaboratorProjectComponent } from '../add-collaborator-project/add-collaborator-project.component';

@Component({
  selector: 'app-project-details',
  imports: [DatePipe, FormsModule, AddCollaboratorProjectComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  projectId = input.required<string>();
  project : Project | undefined;
  projectCollaboratorsIds : string[] = [];
  private projectService = inject(ProjectService);
  private collaboratorService = inject(CollaboratorSignalService);
  addCollaborator = false;
  allCollaboratorsIds : string[] = [];

  ngOnInit(): void {
    this.projectService.getProject(this.projectId()).subscribe(data => {
      this.project = data
    })

    this.projectService.getProjectCollaborators(this.projectId()).subscribe(data => {
      this.projectCollaboratorsIds = data.map(p => p.id)
    })
  }

  onAddCollaborator(){
    this.addCollaborator = true;

    const projectCollaboratorsIdsSet = new Set(this.projectCollaboratorsIds);
    // this.collaboratorService.getCollaboratorsIds().subscribe(data => {
    //   this.allCollaboratorsIds = data.filter(c => !projectCollaboratorsIdsSet.has(c));
    // })
  }

  addCollaboratorToProject(association : AddAssociationProjectCollaborator){
    this.projectService.addCollaboratorToProject(this.projectId(), association).subscribe({
      next: () => {
        this.projectCollaboratorsIds = [...this.projectCollaboratorsIds, association.collaboratorId];
      },
      error: (err) => {
        console.error('Error adding collaborator:', err);
      }
    });

    this.addCollaborator = false;
  }

  closeForm(){
    this.addCollaborator = false;
  }
}
