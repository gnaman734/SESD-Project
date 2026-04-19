import { describe, expect, it } from "vitest";
import { PunctualityUtil } from "../punctuality";

const makeDate = (time: string) => new Date(`2026-04-19T${time}:00`);

describe("PunctualityUtil", () => {
  it("flags late arrivals", () => {
    const reporting = makeDate("10:00");
    const arrival = makeDate("09:45");
    expect(PunctualityUtil.isLate(arrival, reporting)).toBe(true);
  });

  it("flags on-time arrivals", () => {
    const reporting = makeDate("10:00");
    const arrival = makeDate("09:15");
    expect(PunctualityUtil.isLate(arrival, reporting)).toBe(false);
  });
});
