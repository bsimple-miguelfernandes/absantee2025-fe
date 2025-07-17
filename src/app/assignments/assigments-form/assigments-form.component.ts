import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsDataService } from '../assignments-data.service';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';
import { DevicesDataService } from '../../devices/devices-data.service';
import { AssignmentFormModel } from './assignment-form.model';
import { CommonModule } from '@angular/common';
import { AssignmentCreateRequest } from './assignment-create-request';
import { AssignmentSignalsService } from '../assigments-signals.service';

@Component({
  selector: 'app-assigments-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assigments-form.component.html',
  styleUrl: './assigments-form.component.css'
})
export class AssignmentsFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private dataService = inject(AssignmentsDataService);
  private signalService = inject(AssignmentSignalsService);
  private collaboratorsService = inject(CollaboratorDataService);
  private devicesService = inject(DevicesDataService);

  assignmentForm!: FormGroup;
  isEditMode = false;
  assignmentId?: string;

  collaborators: { id: string; name: string }[] = [];
  devices: { id: string; description: string }[] = [];

  ngOnInit() {
    this.assignmentId = this.route.snapshot.params['assignmentId'];
    this.isEditMode = !!this.assignmentId;

    this.assignmentForm = this.fb.group({
      collaboratorId: ['', Validators.required],
      deviceId: ['', Validators.required],
      initDate: ['', Validators.required],
      finalDate: ['', Validators.required]
    });

    this.loadCollaborators();
    this.loadDevices();

    if (this.isEditMode) {
      // TODO: carregar dados do assignment para edição
    }
  }

  private loadCollaborators() {
    this.collaboratorsService.getCollaborators().subscribe({
      next: res => {
        this.collaborators = res.map(c => ({
          id: c.collabId,
          name: `${c.names} ${c.surnames}`
        }));
      }
    });
  }

  private loadDevices() {
    this.devicesService.getDevices().subscribe({
      next: res => {
        this.devices = res.map(d => ({
          id: d.id,
          description: d.description
        }));
      }
    });
  }

  cancel() {
    this.router.navigate(['/assignments']);
  }

  save() {
    if (this.assignmentForm.invalid) return;

    const formValue = this.assignmentForm.value;

    const request: AssignmentCreateRequest = {
      collaboratorId: formValue.collaboratorId,
      deviceId: formValue.deviceId,
      periodDate: {
        initDate: new Date(formValue.initDate).toISOString().split('T')[0],
        finalDate: new Date(formValue.finalDate).toISOString().split('T')[0]
      }
    };

    if (this.isEditMode && this.assignmentId) {
      // TODO: fazer update com PUT
    } else {
      this.dataService.createAssignment(request).subscribe({
        next: (res) => {
          this.signalService.saveCreatedAssignment({
            id: res.id,
            collaboratorName: '',
            collaboratorEmail: '',
            deviceDescription: '',
            deviceModel: '',
            deviceSerialNumber: '',
            period: {
              initDate: new Date(request.periodDate.initDate),
              finalDate: new Date(request.periodDate.finalDate)
            }
          });
          this.cancel();
        },
        error: (err) => console.error('Erro ao criar assignment:', err)
      });
    }
  }
}