import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TechnologyDataService } from '../technology-data.service';
import { TechnologySignalService } from '../technology-signal.service';

@Component({
  selector: 'app-technologies-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './technology-create.html',
  styleUrl: './technology-create.css'
})
export class TechnologyCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dataService = inject(TechnologyDataService);
  private signalService = inject(TechnologySignalService);

  technologyForm!: FormGroup;

  ngOnInit() {
    this.technologyForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  cancel() {
    this.router.navigate(['/technology']);
  }

  save() {
    if (this.technologyForm.invalid) return;

    const technology = this.technologyForm.value;

    this.dataService.AddTechnology(technology).subscribe({
      next: (res) => {
        this.signalService.TechnologySaved(res);
        this.cancel();
      },
      error: (err) => console.error('Add failed:', err)
    });
  }
}