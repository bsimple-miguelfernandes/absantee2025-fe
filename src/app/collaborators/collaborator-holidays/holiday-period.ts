import { PeriodDateString } from "../../PeriodDate";

export interface HolidayPeriod {
    id: string,
    periodDate: PeriodDateString
}

export interface HolidayPeriodDTO {
    id: string,
    periodDate: PeriodDateString
}

export function mapHolidayPeriodDtoToHolidayPeriod(dto: HolidayPeriodDTO) : HolidayPeriod {
    return {
        id: dto.id,
        periodDate: dto.periodDate
    };
}