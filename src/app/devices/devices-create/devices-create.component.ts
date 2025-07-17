import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DevicesDataService } from '../devices-data.service';
import { DeviceSignalsService } from '../devices-signals.service';

@Component({
  selector: 'app-devices-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './devices-create.component.html',
  styleUrl: './devices-create.component.css'
})
export class DevicesCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dataService = inject(DevicesDataService);
  private signalService = inject(DeviceSignalsService);

  deviceForm!: FormGroup;

  ngOnInit() {
    this.deviceForm = this.fb.group({
      description: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required]
    });
  }

  cancel() {
    this.router.navigate(['/devices']);
  }

  save() {
    if (this.deviceForm.invalid) return;

    const newDevice = this.deviceForm.value;

    this.dataService.createDevice(newDevice).subscribe({
      next: (res) => {
        this.signalService.saveDevice(res);
        this.cancel();
      },
      error: (err) => console.error('Add device failed:', err)
    });
  }
}
