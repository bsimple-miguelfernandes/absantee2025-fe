import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingSubjectComponent } from './create-training-subject.component';

describe('CreateTrainingSubjectComponent', () => {
  let component: CreateTrainingSubjectComponent;
  let fixture: ComponentFixture<CreateTrainingSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrainingSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrainingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
