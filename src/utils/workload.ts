import { Instructor, WorkloadStatus } from "../types/domain";

export class WorkloadUtil {
  static readonly OVERLOAD_THRESHOLD = 1.2;
  static readonly UNDERUTILIZE_THRESHOLD = 0.8;

  static computeAverage(instructors: Instructor[]): number {
    if (!instructors.length) {
      return 0;
    }
    const total = instructors.reduce((sum, instructor) => sum + instructor.total_duties, 0);
    return total / instructors.length;
  }

  static computeVariance(totalDuties: number, average: number): number {
    if (average === 0) {
      return 0;
    }
    return totalDuties / average;
  }

  static getWorkloadStatus(totalDuties: number, average: number): WorkloadStatus {
    if (average === 0) {
      return WorkloadStatus.BALANCED;
    }
    const ratio = totalDuties / average;
    if (ratio > WorkloadUtil.OVERLOAD_THRESHOLD) {
      return WorkloadStatus.OVERLOADED;
    }
    if (ratio < WorkloadUtil.UNDERUTILIZE_THRESHOLD) {
      return WorkloadStatus.UNDERUTILIZED;
    }
    return WorkloadStatus.BALANCED;
  }

  static getSuggestedInstructor(instructors: Instructor[]): Instructor | null {
    if (!instructors.length) {
      return null;
    }
    return instructors.reduce((min, current) =>
      current.total_duties < min.total_duties ? current : min
    );
  }

  static computeWorkloadForAll(instructors: Instructor[]): Instructor[] {
    const average = WorkloadUtil.computeAverage(instructors);
    return instructors.map((instructor) => ({
      ...instructor,
      duty_variance: WorkloadUtil.computeVariance(instructor.total_duties, average),
      workload_status: WorkloadUtil.getWorkloadStatus(instructor.total_duties, average),
    }));
  }
}
