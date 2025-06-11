import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsBulletsComponent } from './collaborators-bullets.component';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { Collaborator } from '../collaborator.model';

describe('CollaboratorsBulletsComponent', () => {
  let component: CollaboratorsBulletsComponent;
  let fixture: ComponentFixture<CollaboratorsBulletsComponent>;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let collaborators: Collaborator[];

  beforeEach(async () => {
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['selectCollaborator']);

    await TestBed.configureTestingModule({
      imports: [CollaboratorsBulletsComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsBulletsComponent);
    component = fixture.componentInstance;

    collaborators = [
      {
        collabId: "0196b4ee-a7fc-750f-a698-6a5dfd27ce71",
        userId: "37726a9c-7246-4074-bd06-f2a58b494230",
        names: "John",
        surnames: "Doe",
        email: "john.doe@example.com",
        userPeriod: {
          _initDate: new Date("2022-05-28T13:07:27.358Z"),
          _finalDate: new Date("2027-05-28T13:07:27.358Z")
        },
        collaboratorPeriod: {
          _initDate: new Date("2023-05-28T13:07:27.358Z"),
          _finalDate: new Date("2026-05-28T13:07:27.358Z")
        }
      },
      {
        collabId: "b2c7e5d1-8f3a-4c2e-9a1b-2e5d7f8c9b10",
        userId: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
        names: "Jane",
        surnames: "Smith",
        email: "jane.smith@example.com",
        userPeriod: {
          _initDate: new Date("2021-03-15T09:00:00.000Z"),
          _finalDate: new Date("2026-03-15T09:00:00.000Z")
        },
        collaboratorPeriod: {
          _initDate: new Date("2022-04-01T08:30:00.000Z"),
          _finalDate: new Date("2025-04-01T08:30:00.000Z")
        }
      }
    ];

    fixture.componentRef.setInput('collaborators', collaborators);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
