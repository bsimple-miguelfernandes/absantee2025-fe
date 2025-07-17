import { Component, inject, signal } from '@angular/core';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DevicesDataService } from './devices-data.service';
import { DeviceViewModel } from './devices.viewmodel';
import { toDeviceViewModel } from '../collaborators/mappers/device.mapper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-devices',
  imports: [DevicesListComponent, CommonModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  deviceDataService = inject(DevicesDataService)

  devices = signal<DeviceViewModel[]>([]);
  constructor() {
    this.deviceDataService.getDevices().subscribe({
      next: (devices) => {
        const deviceVM = devices.map(toDeviceViewModel)

        this.devices.set(deviceVM);
      },
      error: (err) => {
        alert('Error loading devices');
        console.error('Error loading devices', err);
      }
    })
  }
}
