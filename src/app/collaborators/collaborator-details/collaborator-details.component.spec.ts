import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CollaboratorDetails } from './collaborator-details';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let collaborator: CollaboratorDetails;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;

    collaborator =
    {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };

    fixture.componentRef.setInput('collaborator', collaborator);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have in form the values of selected collaborator', () => {
    const nameInput : HTMLInputElement = fixture.nativeElement.querySelector('#names');
    const surnamesInput : HTMLInputElement = fixture.nativeElement.querySelector('#surnames');
    const emailInput : HTMLInputElement = fixture.nativeElement.querySelector('#email');
    const initDateInput : HTMLInputElement = fixture.nativeElement.querySelector('#initDate');
    const endDateInput : HTMLInputElement = fixture.nativeElement.querySelector('#endDate');

    expect(nameInput.value).toBe(collaborator.names);
    expect(surnamesInput.value).toBe(collaborator.surnames);
    expect(emailInput.value).toBe(collaborator.email);
    expect(initDateInput.value).toBe(collaborator.periodDateTime._initDate.toISOString().split('T')[0]);
    expect(endDateInput.value).toBe(collaborator.periodDateTime._finalDate.toISOString().split('T')[0]);
  });

  it('should update form inputs when collaborator input changes', () => {
    const newCollaborator = {
        id: "2",
        names: "Bob",
        surnames: "Martinez",
        email: "bob.martinez@example.com",
        periodDateTime: {
          _initDate: new Date(2021, 1, 1),
          _finalDate: new Date(2024, 6, 30)
        }
      };

    fixture.componentRef.setInput('collaborator', newCollaborator);

    fixture.detectChanges();

    const nameInput : HTMLInputElement = fixture.nativeElement.querySelector('#names');
    const surnamesInput : HTMLInputElement = fixture.nativeElement.querySelector('#surnames');
    const emailInput : HTMLInputElement = fixture.nativeElement.querySelector('#email');
    const initDateInput : HTMLInputElement = fixture.nativeElement.querySelector('#initDate');
    const endDateInput : HTMLInputElement = fixture.nativeElement.querySelector('#endDate');

    expect(nameInput.value).toBe(newCollaborator.names);
    expect(surnamesInput.value).toBe(newCollaborator.surnames);
    expect(emailInput.value).toBe(newCollaborator.email);
    expect(initDateInput.value).toBe(newCollaborator.periodDateTime._initDate.toISOString().split('T')[0]);
    expect(endDateInput.value).toBe(newCollaborator.periodDateTime._finalDate.toISOString().split('T')[0]);
  });

  it('should emit updated collaborator when form is submitted', () => {
    const updateCollaborator = collaborator;
    const emailInput : HTMLInputElement = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'email-changed@test.com';

    let changedCollab : CollaboratorDetails | undefined;
    component.changedCollaborator.subscribe(c => changedCollab = c);

    const button : HTMLElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(changedCollab).toEqual(updateCollaborator);
  });
});
