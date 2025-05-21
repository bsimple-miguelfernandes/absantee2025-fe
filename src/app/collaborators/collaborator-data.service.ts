import { Injectable, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { PeriodDate } from '../PeriodDate';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {

  private collaboratorsSignal = signal<CollaboratorDetails[]>([
    {
      id: "1",
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

  getCollaboratorHolidays(collaboratorId: string): PeriodDate[] {
    return this.CollaboratorHolidays.find(c => c.collaboratorId === collaboratorId)!.holidays;
  };

  editHoliday(collaboratorId: string, index: number, updatedPeriod : PeriodDate){
    const holidays = this.CollaboratorHolidays.find(c => c.collaboratorId === collaboratorId)?.holidays;

    if(holidays !== undefined){
      holidays[index] = updatedPeriod;
    }
  }
}
