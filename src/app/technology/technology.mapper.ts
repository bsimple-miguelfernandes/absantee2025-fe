import { Injectable } from "@angular/core";
import { Technology } from "./technology";
import { TechnologyDTO } from "./technology.DTO";

export function toTecnologyDTO(t: Technology): TechnologyDTO {
    return {
        id: t.id,
        description: t.description
    };
}

export function fromTechnologyDTO(t: TechnologyDTO): Technology {
    return {
        id: t.id,
        description: t.description
    };
}