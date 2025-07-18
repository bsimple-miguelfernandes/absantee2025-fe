import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsDataService } from '../assignments-data.service';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';
import { DevicesDataService } from '../../devices/devices-data.service';
import { CommonModule } from '@angular/common';
import { AssignmentCreateRequest } from './assignment-create-request';
import { AssignmentSignalsService } from '../assigments-signals.service';
import { AssignmentViewModel } from '../assignment.viewmodel';

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
  assignmentId: string | null = null;

  collaborators: { id: string; name: string }[] = [];
  devices: { id: string; description: string }[] = [];

  useNewDevice = signal(false);

  ngOnInit() {
    this.assignmentId = this.route.snapshot.params['assignmentId'];
    this.isEditMode = !!this.assignmentId;

    if (this.isEditMode && this.assignmentId) {
      this.dataService.getAssignmentById(this.assignmentId).subscribe({
        next: (assignment) => {
          this.assignmentForm.patchValue({
            collaboratorId: assignment.collaboratorId,
            deviceId: assignment.deviceId,
            initDate: assignment.periodDate.initDate,
            finalDate: assignment.periodDate.finalDate
          });

          this.useNewDevice.set(false);
        },
        error: err => console.error('Erro ao carregar assignment', err)
      });
    }


    this.assignmentForm = this.fb.group({
      collaboratorId: [''],
      useNewDevice: [false],
      deviceId: [''],
      deviceDescription: [''],
      deviceBrand: [''],
      deviceModel: [''],
      deviceSerialNumber: [''],
      initDate: ['', Validators.required],
      finalDate: ['', Validators.required]
    });

    this.assignmentForm.get('useNewDevice')?.valueChanges.subscribe(val => {
      this.useNewDevice.set(val);
    });

    this.loadCollaborators();
    this.loadDevices();
  }

  private loadCollaborators() {
    this.collaboratorsService.getCollaborators().subscribe({
      next: res => {
        this.collaborators = res.map(c => ({
          id: c.collabId,
          name: `${c.names} ${c.surnames}`
        }));
      },
      error: err => console.error('Error loading collabs', err)
    });
  }

  private loadDevices() {
    this.devicesService.getDevices().subscribe({
      next: res => {
        this.devices = res.map(d => ({
          id: d.id,
          description: d.description
        }));
      },
      error: err => console.error('Erro loading devices', err)
    });
  }

  cancel() {
    this.router.navigate(['/assignments']);
  }

  save() {
    if (this.assignmentForm.invalid) return;

    const formValue = this.assignmentForm.value;

    const periodDate = {
      initDate: new Date(formValue.initDate).toISOString().split('T')[0],
      finalDate: new Date(formValue.finalDate).toISOString().split('T')[0]
    };

    if (this.isEditMode && this.assignmentId) {
      const updateRequest = {
        id: this.assignmentId,
        collaboratorId: formValue.collaboratorId,
        deviceId: formValue.deviceId,
        periodDate
      };

      this.dataService.updateAssignment(updateRequest).subscribe({
        next: () => {
          this.signalService.updateAssignment({ id: this.assignmentId! } as AssignmentViewModel);
          this.cancel();
        },
        error: (err) => console.error('Erro ao atualizar assignment:', err)
      });
    } else {
      if (formValue.useNewDevice) {
        this.dataService.createAssignmentWithDevice({
          collaboratorId: formValue.collaboratorId,
          periodDate,
          deviceDescription: formValue.deviceDescription,
          deviceBrand: formValue.deviceBrand,
          deviceModel: formValue.deviceModel,
          deviceSerialNumber: formValue.deviceSerialNumber
        }).subscribe({
          next: (res) => {
            this.signalService.saveCreatedAssignment(undefined);
            this.cancel();
          },
          error: (err) => console.error('Error creating assignment:', err)
        });
      } else {
        const request: AssignmentCreateRequest = {
          collaboratorId: formValue.collaboratorId,
          deviceId: formValue.deviceId,
          periodDate
        };

        this.dataService.createAssignment(request).subscribe({
          next: (res) => {
            this.signalService.saveCreatedAssignment({ id: res.id } as AssignmentViewModel);
            this.cancel();
          },
          error: (err) => console.error('Error creating assignment:', err)
        });
      }
    }
  }
}

