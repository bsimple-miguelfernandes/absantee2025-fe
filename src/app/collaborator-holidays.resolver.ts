import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CollaboratorDataService } from './collaborators/collaborator-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HolidayPeriod } from './collaborators/collaborator-holidays/holiday-period';

@Injectable({ providedIn: 'root' })
export class CollaboratorHolidaysResolver implements Resolve<HolidayPeriod[]> {
  constructor(private service: CollaboratorDataService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<HolidayPeriod[]> {
    return this.service.getCollaboratorHolidays(route.paramMap.get('id')!);
  }
}
