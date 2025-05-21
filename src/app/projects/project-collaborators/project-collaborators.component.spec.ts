import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCollaboratorsComponent } from './project-collaborators.component';

describe('ProjectCollaboratorsComponent', () => {
  let component: ProjectCollaboratorsComponent;
  let fixture: ComponentFixture<ProjectCollaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCollaboratorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
