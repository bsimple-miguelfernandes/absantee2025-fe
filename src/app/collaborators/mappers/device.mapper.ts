// device-mapper.ts

import { model } from "@angular/core";
import { Device } from "../../devices/devices";
import { DeviceViewModel } from "../../devices/devices.viewmodel";

export function toDeviceViewModel(d: Device): DeviceViewModel {
    return {
        id: d.id,
        description: d.description,
        brand: d.brand,
        model: d.model,
        serialNumber: d.serialNumber
    };
}

export function fromDeviceViewModel(vm: DeviceViewModel): Device {
    return {
        id: vm.id,
        description: vm.description,
        brand: vm.brand,
        model: vm.model,
        serialNumber: vm.serialNumber
    };
}
