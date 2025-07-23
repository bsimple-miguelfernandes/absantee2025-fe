import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSubjectsComponent } from './training-subjects.component';

describe('TrainingSubjectsComponent', () => {
  let component: TrainingSubjectsComponent;
  let fixture: ComponentFixture<TrainingSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
