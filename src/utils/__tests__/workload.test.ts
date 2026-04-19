import { describe, expect, it } from "vitest";
import { WorkloadUtil } from "../workload";
import { Instructor } from "../../types/domain";

describe("WorkloadUtil", () => {
  it("computes average duties", () => {
    const instructors: Instructor[] = [
      { id: "1", full_name: "A", email: "a", department: "d", employee_code: "e", total_duties: 2, on_time_count: 0, late_count: 0, punctuality_rate: 0, created_at: "", updated_at: "" },
      { id: "2", full_name: "B", email: "b", department: "d", employee_code: "e", total_duties: 4, on_time_count: 0, late_count: 0, punctuality_rate: 0, created_at: "", updated_at: "" },
    ];
    expect(WorkloadUtil.computeAverage(instructors)).toBe(3);
  });

  it("assigns workload status", () => {
    expect(WorkloadUtil.getWorkloadStatus(12, 10)).toBe("overloaded");
    expect(WorkloadUtil.getWorkloadStatus(7, 10)).toBe("underutilized");
    expect(WorkloadUtil.getWorkloadStatus(10, 10)).toBe("balanced");
  });
});
