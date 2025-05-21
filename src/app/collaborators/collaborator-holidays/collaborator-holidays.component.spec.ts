import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorHolidaysComponent } from './collaborator-holidays.component';

describe('CollaboratorHolidaysComponent', () => {
  let component: CollaboratorHolidaysComponent;
  let fixture: ComponentFixture<CollaboratorHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorHolidaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
