import { Injectable, signal } from "@angular/core";
import { Device } from "./devices";

@Injectable({
    providedIn: 'root'
})
export class DeviceSignalsService {
    private createdDeviceSignal = signal<Device | undefined>(undefined);
    readonly createdDevice = this.createdDeviceSignal.asReadonly();

    saveDevice(device: Device | undefined) {
        this.createdDeviceSignal.set(device);
    }

    clearCreatedDevice() {
        this.createdDeviceSignal.set(undefined);
    }
}
