import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectViewModel } from './models/subject.view-model';
import { SubjectService } from './services/subject.service';
import { toSubjectViewModel } from './mappers/subject.mapper';

@Component({
  selector: 'app-subjects',
  imports: [ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  subjects: SubjectViewModel[] = [];
  pageIndex: number = 1;
  pageSize: number = 5;

  showAddForm = false;

  subjectForm = new FormGroup({
    description: new FormControl('', [Validators.required,
    Validators.maxLength(50)]),
    details: new FormControl('', [Validators.maxLength(500)]),
  });

  subjectService = inject(SubjectService);

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getSubjects(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.subjects = data.pageSubjects.map(toSubjectViewModel);
      },
      error: (err) => console.error(err)
    });
  }

  nextPage() {
    this.pageIndex++;
    this.loadSubjects();
  }

  prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.loadSubjects();
    }
  }

  toggleForm() {
    this.showAddForm = !this.showAddForm;
  }

  addSubject() {
    if (this.subjectForm.valid) {
      const { description, details } = this.subjectForm.value!;

      this.subjectService.addSubject(description!, details ?? '').subscribe({
        next: (createdSubject) => {
          const newSubject: SubjectViewModel = toSubjectViewModel(createdSubject);

          this.subjects.unshift(newSubject);

          this.subjectForm.reset();
          this.showAddForm = false;
        },
        error: (err) => {
          console.error('Failed to add subject:', err);
        }
      });
    } else {
      this.subjectForm.markAllAsTouched();
    }
  }

}
