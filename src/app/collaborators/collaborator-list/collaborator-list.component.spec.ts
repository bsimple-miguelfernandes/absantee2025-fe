import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorListComponent } from './collaborator-list.component';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';

describe('CollaboratorListComponent', () => {
  let component: CollaboratorListComponent;
  let fixture: ComponentFixture<CollaboratorListComponent>;
  let collaborators: CollaboratorDetails[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorListComponent);
    component = fixture.componentInstance;

    collaborators = [
      {
        id: "1",
        names: "Alice",
        surnames: "Johnson",
        email: "alice.johnson@example.com",
        periodDateTime: {
          _initDate: new Date(2019, 5, 10),
          _finalDate: new Date(2025, 11, 31)
        }
      },
      {
        id: "2",
        names: "Bob",
        surnames: "Martinez",
        email: "bob.martinez@example.com",
        periodDateTime: {
          _initDate: new Date(2021, 1, 1),
          _finalDate: new Date(2024, 6, 30)
        }
      },
      {
        id: "3",
        names: "Clara",
        surnames: "Nguyen",
        email: "clara.nguyen@example.com",
        periodDateTime: {
          _initDate: new Date(2020, 3, 15),
          _finalDate: new Date(2030, 8, 1)
        }
      }
    ];

    fixture.componentRef.setInput('collaborators', collaborators)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the Collaborators Info in the table', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');

    const cells1 = rows[1].querySelectorAll('td');
    expect(cells1[0].textContent).toBe(collaborators[0].names);
    expect(cells1[1].textContent).toBe(collaborators[0].email);

    const cells2 = rows[2].querySelectorAll('td');
    expect(cells2[0].textContent).toBe(collaborators[1].names);
    expect(cells2[1].textContent).toBe(collaborators[1].email);

    const cells3 = rows[3].querySelectorAll('td');
    expect(cells3[0].textContent).toBe(collaborators[2].names);
    expect(cells3[1].textContent).toBe(collaborators[2].email);
  });

  it('should call onSelectCollaborator with selected collaborator when button is clicked', () => {
    const button1: HTMLElement = fixture.nativeElement.querySelectorAll("button")[1];

    const spy = spyOn(component, 'onSelectCollaborator');
    button1.click();

    expect(spy).toHaveBeenCalledOnceWith(collaborators[1]);
  });

  it('should emit selectedCollaborator when a button is clicked', () => {
    let emittedCollaborator: CollaboratorDetails | undefined;
    component.selectedCollaborator.subscribe(collab => emittedCollaborator = collab);

    const button1: HTMLElement = fixture.nativeElement.querySelectorAll("button")[1];
    button1.click();

    expect(emittedCollaborator).toEqual(collaborators[1]);
  });
});
