import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorAssignmentsComponent } from './collaborator-assignments.component';

describe('CollaboratorAssignmentsComponent', () => {
  let component: CollaboratorAssignmentsComponent;
  let fixture: ComponentFixture<CollaboratorAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorAssignmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
