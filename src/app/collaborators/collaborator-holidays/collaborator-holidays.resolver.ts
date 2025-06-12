import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CollaboratorDataService } from '../collaborator-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HolidayPeriod } from './holiday-period';

@Injectable({ providedIn: 'root' })
export class CollaboratorHolidaysResolver implements Resolve<HolidayPeriod[]> {
  constructor(private service: CollaboratorDataService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<HolidayPeriod[]> {
    var colaborador= route.paramMap.get('collabId')
    /* var collab:string;
    collab='ss'; */
    if (!colaborador) {
      throw new Error('Collaborator ID is required');
    }
    return this.service.getCollaboratorHolidays(colaborador);
  }
}
