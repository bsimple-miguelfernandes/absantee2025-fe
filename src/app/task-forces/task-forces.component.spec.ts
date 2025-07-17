import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForcesComponent } from './task-forces.component';

describe('TaskForcesComponent', () => {
  let component: TaskForcesComponent;
  let fixture: ComponentFixture<TaskForcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskForcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
