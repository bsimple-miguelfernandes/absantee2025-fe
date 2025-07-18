import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForceEditComponent } from './task-force-edit.component';

describe('TaskForceEditComponent', () => {
  let component: TaskForceEditComponent;
  let fixture: ComponentFixture<TaskForceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskForceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
