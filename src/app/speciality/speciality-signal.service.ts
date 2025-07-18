import { Injectable, signal } from '@angular/core';
import { specialityDTO } from './specialityDTO';

@Injectable({
  providedIn: 'root'
})
export class SpecialitySignalsService {
  private createdSpecialitySignal = signal<specialityDTO | undefined>(undefined);
  readonly createdSpeciality = this.createdSpecialitySignal.asReadonly();

  private updatedSpecialitySignal = signal<specialityDTO | undefined>(undefined);
  readonly updatedSpeciality = this.updatedSpecialitySignal.asReadonly();

  saveCreatedSpeciality(speciality: specialityDTO | undefined) {
    this.createdSpecialitySignal.set(speciality);
  }
    clearCreatedSpeciality() {
        this.createdSpecialitySignal.set(undefined);
    }

  updateSpeciality(speciality: specialityDTO | undefined) {
    this.updatedSpecialitySignal.set(speciality);
  }
  clearUpdatedSpeciality() {
    this.updatedSpecialitySignal.set(undefined);
  }
}
