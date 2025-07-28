import { Component, inject } from '@angular/core';
import { ProjectsDataService } from '../projects/projects-data.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CommonModule, DatePipe } from '@angular/common';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { AddCollaboratorProjectComponent } from "./add-collaborator-project/add-collaborator-project.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-associations-project-collaborator',
  imports: [DatePipe, RouterModule, CommonModule, AddCollaboratorProjectComponent, FiltersComponent],
  standalone: true,
  templateUrl: './associations-project-collaborator.component.html',
  styleUrl: './associations-project-collaborator.component.css'
})
export class AssociationsProjectCollaboratorComponent {
  collaboratorDataService = inject(CollaboratorDataService);
  projectsDataService = inject(ProjectsDataService);
  associations: AssociationProjectCollaborators[] = [];
  filteredAssociations: AssociationProjectCollaborators[] = [];

  selectedId!: string;
  isInProject!: boolean;
  showCreateForm = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = params.get("selectedId")!;
      this.isInProject = this.route.parent?.snapshot.toString().includes("projects") ?? false;

      this.loadAssociations();
    });
  }

  loadAssociations() {
    const callback = (data: AssociationProjectCollaborators[]) => {
      this.associations = data;
      this.filteredAssociations = [...data];
    };

    if (this.isInProject) {
      this.projectsDataService.getAssociations(this.selectedId).subscribe(callback);
    } else {
      this.collaboratorDataService.getAssociations(this.selectedId).subscribe(callback);
    }
  }

  onStartCreate() {
    this.showCreateForm = true;
  }

  onCancelCreate() {
    this.showCreateForm = false;
    this.loadAssociations();
  }

  onFilterChanged(filters: Record<string, string>) {
    const { initDate, finalDate } = filters;

    this.filteredAssociations = this.associations.filter(assoc => {
      const assocInit = new Date(assoc.periodDate.initDate);
      const assocFinal = new Date(assoc.periodDate.finalDate);

      const fromDate = initDate ? new Date(initDate) : null;
      const toDate = finalDate ? new Date(finalDate) : null;

      const initOk = !fromDate || assocInit >= fromDate;
      const finalOk = !toDate || assocFinal <= toDate;

      return initOk && finalOk;
    });
  }

}
