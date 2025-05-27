import { inject, Injectable, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { PeriodDate } from '../PeriodDate';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { HolidayPeriod } from './collaborator-holidays/holiday-period';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {

  private httpClient = inject(HttpClient);

  private collaboratorsSignal = signal<CollaboratorDetails[]>([
    {
      id: "019686f6-6850-73f9-b931-99ca52b7ca32",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date("2019-06-10"),
        _finalDate: new Date("2025-12-31")
      }
    },
    {
      id: "2",
      names: "Bob",
      surnames: "Martinez",
      email: "bob.martinez@example.com",
      periodDateTime: {
        _initDate: new Date("2021-02-01"),
        _finalDate: new Date("2024-07-30")
      }
    },
    {
      id: "3",
      names: "Clara",
      surnames: "Nguyen",
      email: "clara.nguyen@example.com",
      periodDateTime: {
        _initDate: new Date("2020-04-15"),
        _finalDate: new Date("2030-09-01")
      }
    }
  ]);

  readonly collaborators = this.collaboratorsSignal.asReadonly();

  getCollaboratorByEmail(email: string): CollaboratorDetails {
    return this.collaboratorsSignal().find(c => c.email === email)!;
  }

  updateCollaborator(updatedCollaborator: CollaboratorDetails) {
    this.collaboratorsSignal.update(list =>
      list.map(c => c.id === updatedCollaborator.id ? updatedCollaborator : c)
    );
  }

  private CollaboratorHolidays: { collaboratorId: string, holidays: PeriodDate[] }[] = [
    {
      collaboratorId: "1",
      holidays: [
        {
          initDate: new Date("2020-01-01"),
          finalDate: new Date("2020-01-10")
        },
        {
          initDate: new Date("2020-12-01"),
          finalDate: new Date("2020-12-10")
        }
      ]
    },
    {
      collaboratorId: "2",
      holidays: [
        {
          initDate: new Date("2020-06-06"),
          finalDate: new Date("2020-06-16")
        }
      ]
    },
    {
      collaboratorId: "3",
      holidays: []
    }
  ]

    getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriod[]> {
    return this.httpClient.get<HolidayPeriod[]>("http://localhost:5073/api/collaborators/"+ collaboratorId + "/holidayplan/holidayperiod");
  };

  editHoliday(collaboratorId: string, updatedPeriod: HolidayPeriod){
    return this.httpClient.put("http://localhost:5073/api/collaborators/"+ collaboratorId + "/holidayplan/holidayperiod", updatedPeriod);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaborators[]>('http://localhost:5073/api/collaborators/' + id + "/associations");
  }
}
