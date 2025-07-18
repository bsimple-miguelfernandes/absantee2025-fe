import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForceCreateComponent } from './task-force-create.component';

describe('TaskForceCreateComponent', () => {
  let component: TaskForceCreateComponent;
  let fixture: ComponentFixture<TaskForceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskForceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
