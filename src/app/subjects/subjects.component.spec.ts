import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsComponent } from './subjects.component';
import { SubjectService } from './services/subject.service';
import { Subject } from './models/subject.model';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;
  let mockSubjectService: jasmine.SpyObj<SubjectService>;

  const mockSubjects = [
    { id: '1', description: 'Math', details: 'Algebra' },
    { id: '2', description: 'Science', details: 'Biology' },
  ];

  beforeEach(async () => {
    mockSubjectService = jasmine.createSpyObj('SubjectService', ['getSubjects', 'addSubject']);
    mockSubjectService.getSubjects.and.returnValue(of({ pageSubjects: mockSubjects }));

    await TestBed.configureTestingModule({
      imports: [SubjectsComponent],
      providers: [
        { provide: SubjectService, useValue: mockSubjectService },
        provideHttpClient(),
        provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load subjects on init', () => {
    expect(mockSubjectService.getSubjects).toHaveBeenCalledWith(1, 5);
    expect(component.subjects.length).toBe(2);
  });

  it('should toggle form visibility', () => {
    expect(component.showAddForm).toBeFalse();
    component.toggleForm();
    expect(component.showAddForm).toBeTrue();
  });

  it('should not add subject if form is invalid', () => {
    spyOn(component.subjectForm, 'markAllAsTouched');
    component.addSubject();
    expect(component.subjectForm.markAllAsTouched).toHaveBeenCalled();
    expect(mockSubjectService.addSubject).not.toHaveBeenCalled();
  });

  it('should add a valid subject', () => {
    const newSubject = {
      id: '3',
      description: 'History',
      details: 'Ancient History'
    };
    mockSubjectService.addSubject.and.returnValue(of(newSubject));

    component.subjectForm.setValue({
      description: 'History',
      details: 'Ancient History'
    });

    component.addSubject();

    expect(mockSubjectService.addSubject).toHaveBeenCalledWith('History', 'Ancient History');
    expect(component.subjects[0].description).toBe('History');
  });

  it('should handle addSubject error', () => {
    spyOn(console, 'error');
    mockSubjectService.addSubject.and.returnValue(throwError(() => new Error('Failed to add')));

    component.subjectForm.setValue({
      description: 'Art',
      details: ''
    });

    component.addSubject();

    expect(console.error).toHaveBeenCalledWith('Failed to add subject:', jasmine.any(Error));
  });

  it('should go to next and previous pages', () => {
    component.pageIndex = 1;
    component.nextPage();
    expect(component.pageIndex).toBe(2);

    component.prevPage();
    expect(component.pageIndex).toBe(1);
  });

});
