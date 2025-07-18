import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForceCollaboratorsComponent } from './task-force-collaborators.component';

describe('TaskForceCollaboratorsComponent', () => {
  let component: TaskForceCollaboratorsComponent;
  let fixture: ComponentFixture<TaskForceCollaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForceCollaboratorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskForceCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
