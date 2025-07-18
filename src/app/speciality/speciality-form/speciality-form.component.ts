import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialityDataService } from '../speciality-data.service'; // suposto serviço
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TOOLTIP_PANEL_CLASS } from '@angular/material/tooltip';

@Component({
  selector: 'app-speciality-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './speciality-form.component.html',
  styleUrls: ['./speciality-form.component.css']
})
export class SpecialityFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private specialityService = inject(SpecialityDataService);

  specialityForm!: FormGroup;
  isEditMode = false;
  specialityId: string | null = null;

  ngOnInit() {
    this.specialityId = this.route.snapshot.params['specialityId'];
    this.isEditMode = !!this.specialityId;

    this.specialityForm = this.fb.group({
      id: [''], // geralmente id não se edita mas podes mostrar
      description: ['', Validators.required],
      collaboratorId: ['', Validators.required],
      technologyId: ['', Validators.required],
      initDate: ['', Validators.required],
      finalDate: ['', Validators.required]
    });

    if (this.isEditMode && this.specialityId) {
      this.specialityService.getById(this.specialityId).subscribe({
        next: speciality => {
        console.log('speciality:', speciality);

          this.specialityForm.patchValue({
    id: speciality.id,
    description: speciality.description,
    collaboratorId: speciality.collaboratorId,
    technologyId: speciality.technologyId,
    initDate: this.formatDateForInput(speciality.periodDate.initDate),
    finalDate: this.formatDateForInput(speciality.periodDate.finalDate)
  });

        },
        error: err => console.error('Erro ao carregar', err)
      });
    }
  }

  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString().split('T')[0];
  }

  cancel() {
    this.router.navigate(['/speciality']);
  }

  save() {
    if (this.specialityForm.invalid) return;

    const formValue = this.specialityForm.value;
    const payload = {
      id: formValue.id,
      description: formValue.description,
      collaboratorId: formValue.collaboratorId,
      technologyId: formValue.technologyId,
      periodDate: {
        initDate: new Date(formValue.initDate).toISOString().split('T')[0],
        finalDate: new Date(formValue.finalDate).toISOString().split('T')[0]
      }
    };


    if (this.isEditMode && this.specialityId) {
      this.specialityService.updateSpeciality(payload).subscribe({
        next: () => this.cancel(),
        error: err => console.error('Erro ao atualizar speciality', err)
      });
    } else {
      this.specialityService.createSpeciality(payload).subscribe({
        next: () => this.cancel(),
        error: err => console.error('Erro ao criar speciality', err)
      });
    }
  }
}
