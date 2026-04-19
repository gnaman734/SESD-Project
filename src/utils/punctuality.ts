import { addMinutes, isBefore } from "date-fns";
import { PunctualityStatus } from "../types/domain";

export class PunctualityUtil {
  static readonly BUFFER_MINUTES = 30;

  static computeDeadline(reportingTime: Date): Date {
    return addMinutes(reportingTime, -PunctualityUtil.BUFFER_MINUTES);
  }

  static isLate(arrivalTime: Date, reportingTime: Date): boolean {
    const deadline = PunctualityUtil.computeDeadline(reportingTime);
    return isBefore(deadline, arrivalTime);
  }

  static detectPunctuality(arrivalTime: Date, reportingTime: Date): PunctualityStatus {
    return PunctualityUtil.isLate(arrivalTime, reportingTime)
      ? PunctualityStatus.LATE
      : PunctualityStatus.ON_TIME;
  }

  static formatPunctualityRate(rate: number): string {
    if (Number.isNaN(rate)) {
      return "0%";
    }
    return `${Math.round(rate * 100)}%`;
  }
}
