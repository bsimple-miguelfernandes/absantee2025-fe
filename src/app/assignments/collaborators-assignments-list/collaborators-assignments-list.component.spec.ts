import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsAssignmentsListComponent } from './collaborators-assignments-list.component';

describe('CollaboratorsAssignmentsListComponent', () => {
  let component: CollaboratorsAssignmentsListComponent;
  let fixture: ComponentFixture<CollaboratorsAssignmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorsAssignmentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsAssignmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
