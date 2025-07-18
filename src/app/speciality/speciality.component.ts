import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SpecialityDataService } from './speciality-data.service';
import { SpecialitySignalsService } from './speciality-signal.service';
import { toSpecialityDTO } from './speciality.mapper';
import { specialityDTO } from './specialityDTO';

import { SpecialityTechnologiesListComponent } from './speciality-technologies-list/speciality-technologies-list.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrl: './speciality.component.css',
  standalone: true,
  imports: [
    SpecialityListComponent,
    SpecialityTechnologiesListComponent,
    RouterOutlet,
    CommonModule
  ]
})
export class SpecialitiesComponent {
  private dataService = inject(SpecialityDataService);
  private signalService = inject(SpecialitySignalsService);

  specialities = signal<specialityDTO[]>([]);
  showTechnology = signal<boolean>(false);

  constructor() {
    this.getSpecialities();

    effect(() => {
      const created = this.signalService.createdSpeciality();
      if (created !== undefined) {
        this.getSpecialities();
        this.signalService.clearCreatedSpeciality();
      }

      const updated = this.signalService.updatedSpeciality();
      if (updated !== undefined) {
        this.getSpecialities();
        this.signalService.clearUpdatedSpeciality();
      }
    });
  }

  private getSpecialities() {
    this.dataService.getAll().subscribe({
      next: (dtos) => this.specialities.set(dtos.map(toSpecialityDTO)),
      error: (err) => console.error('Erro :', err)
    });
  }

  toggleTechnology() {
    this.showTechnology.update((prev) => !prev);
  }
}
