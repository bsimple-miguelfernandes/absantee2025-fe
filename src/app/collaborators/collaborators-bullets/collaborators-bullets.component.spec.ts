import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsBulletsComponent } from './collaborators-bullets.component';

describe('CollaboratorsBulletsComponent', () => {
  let component: CollaboratorsBulletsComponent;
  let fixture: ComponentFixture<CollaboratorsBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorsBulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
