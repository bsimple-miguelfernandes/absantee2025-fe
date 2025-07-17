import { Component, inject, effect, signal } from '@angular/core';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DevicesDataService } from './devices-data.service';
import { DeviceViewModel } from './devices.viewmodel';
import { toDeviceViewModel } from '../collaborators/mappers/device.mapper';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeviceSignalsService } from './devices-signals.service';

@Component({
  selector: 'app-devices',
  imports: [DevicesListComponent, CommonModule, RouterModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  private deviceDataService = inject(DevicesDataService);
  private signalService = inject(DeviceSignalsService);

  deviceCreated = this.signalService.createdDevice;
  devices = signal<DeviceViewModel[]>([]);

  constructor() {
    this.loadDevices();

    effect(() => {
      if (this.deviceCreated()) {
        this.loadDevices();
        this.signalService.clearCreatedDevice();
      }
    });
  }

  loadDevices() {
    this.deviceDataService.getDevices().subscribe({
      next: (devices) => {
        const deviceVM = devices.map(toDeviceViewModel);
        this.devices.set(deviceVM);
      },
      error: (err) => {
        alert('Error loading devices');
        console.error('Error loading devices', err);
      }
    });
  }
}
