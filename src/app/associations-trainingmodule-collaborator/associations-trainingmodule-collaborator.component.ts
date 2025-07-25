import { DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { AssociationTrainingModuleCollaborators } from './models/association-trainingmodule-collaborator.model';
import { Subscription } from 'rxjs';
import { Collaborator } from '../collaborators/collaborator';
import { CreateAssociationTrainingmoduleCollaboratorComponent } from "./create-association-trainingmodule-collaborator/create-association-trainingmodule-collaborator.component";
import { AssociationTrainingmoduleCollaboratorService } from './services/association-trainingmodule-collaborator.service';
import { AssociationTrainingmoduleCollaboratorSignalService } from './services/association-trainingmodule-collaborator-signal.service';

@Component({
  selector: 'app-associations-trainingmodule-collaborator',
  imports: [DatePipe, RouterModule, CreateAssociationTrainingmoduleCollaboratorComponent],
  templateUrl: './associations-trainingmodule-collaborator.component.html',
  styleUrl: './associations-trainingmodule-collaborator.component.css'
})
export class AssociationsTrainingmoduleCollaboratorComponent {
  // --- Dependencies ---
  private collaboratorDataService = inject(CollaboratorDataService);
  private associationTMCDataService = inject(AssociationTrainingmoduleCollaboratorService);
  private associationTMCSignalService = inject(AssociationTrainingmoduleCollaboratorSignalService);
  private route = inject(ActivatedRoute);

  // --- Parameters
  associations: AssociationTrainingModuleCollaborators[] = [];
  selectedId!: string;
  isInTrainingModule!: boolean;
  isCreating = this.associationTMCSignalService.isCreatingAssociationTMC;
  isLoading: boolean = true;
  private subscriptions = new Subscription();

  ngOnInit() {
    const routeSelectedId = this.route.snapshot.paramMap.get("selectedId");
    const parentRouteSegments = this.route.parent?.snapshot.url.map(segment => segment.path);

    if (routeSelectedId === null) {
      console.error("Selected Id does not exist!");
      this.isLoading = false;
      return;
    }

    this.selectedId = routeSelectedId;

    if (parentRouteSegments && parentRouteSegments.length > 0) {
      const primaryParentSegment = parentRouteSegments[0];

      if (primaryParentSegment === "training-modules") {
        this.isInTrainingModule = true;
      } else if (primaryParentSegment === "collaborators") {
        this.isInTrainingModule = false;
      } else {
        console.error("Could not determine association perspective. Unexpected parent segment:", primaryParentSegment);
        this.isLoading = false;
        return;
      }
    } else {
      console.error("Parent route segments not found. Cannot determine association perspective.");
      this.isLoading = false;
      return;
    }

    this.loadAndPopulateAssociations();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadAndPopulateAssociations() {
    this.isLoading = true;
    this.subscriptions.add(
      this.route.data.subscribe({
        next: (data) => {
          const initialAssociations = data["AssociationData"] as AssociationTrainingModuleCollaborators[];

          if (initialAssociations.length === 0) {
            this.associations = [];
            this.isLoading = false;
            return;
          }

          this.associations = initialAssociations;

          let detailsFetchedCount = 0;
          const totalAssociationsToDetail = initialAssociations.length;

          if (totalAssociationsToDetail === 0) {
            this.isLoading = false;
            return;
          }

          this.associations.forEach((assoc, index) => {
            if (this.isInTrainingModule) {
              this.subscriptions.add(
                this.collaboratorDataService.getCollabById(assoc.collaboratorId).subscribe({
                  next: (collab: Collaborator) => {
                    this.associations[index] = { ...this.associations[index], collaboratorEmail: collab.email };
                    detailsFetchedCount++;
                    if (detailsFetchedCount === totalAssociationsToDetail) {
                      this.isLoading = false;
                    }
                  },
                  error: (err) => {
                    console.error('Error fetching collaborator details for association:', err);
                    detailsFetchedCount++;
                    if (detailsFetchedCount === totalAssociationsToDetail) {
                      this.isLoading = false;
                    }
                  }
                })
              );
            } else {
              detailsFetchedCount++;
              if (detailsFetchedCount === totalAssociationsToDetail) {
                this.isLoading = false;
              }
            }
          });
        },
        error: (err) => {
          console.error('Error getting initial association data from resolver:', err);
          this.isLoading = false;
        }
      })
    );
  }

  constructor() {
    effect(() => {
      const assocCreated = this.associationTMCSignalService.createdAssociationTMC();

      if (assocCreated) {
        const exists = this.associations.some(a => a.id === assocCreated.id);

        if (!exists) {
          this.isLoading = true;
          if (this.isInTrainingModule) {
            this.subscriptions.add(
              this.collaboratorDataService.getCollabById(assocCreated.collaboratorId).subscribe({
                next: (data) => {
                  const newAssocWithDetails = { ...assocCreated, collaboratorEmail: data.email };
                  this.associations.push(newAssocWithDetails);
                  this.isLoading = false;
                },
                error: (err) => {
                  console.error('Error fetching collaborator details for new association:', err);
                  this.isLoading = false;
                }
              })
            );
          } else {
            this.associations.push(assocCreated);
            this.isLoading = false;
          }
        }
        this.associationTMCSignalService.createAssociationTMC(undefined);
      }
    });
  }

  switchCreatingState(state: boolean) {
    this.associationTMCSignalService.changeAssociationTMCCreationState(state);
  }

  removeAssociation(id: string) {
    this.isLoading = true;
    this.associationTMCDataService.removeAssociationTMC(id).subscribe({
      next: () => {
        this.associations = this.associations.filter(a => a.id !== id);
        this.isLoading = false;
      },
      error: (err) => {
        alert('Error removing an association');
        console.error('Error removing an association', err);
        this.isLoading = false;
      }
    });
  }
}
