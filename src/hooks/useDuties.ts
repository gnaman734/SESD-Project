import { useCallback, useEffect, useState } from "react";
import { Duty, DutyDetailed, PunctualityStatus } from "../types/domain";
import { DutyService } from "../services/dutyService";
import { PunctualityUtil } from "../utils/punctuality";

export const useDuties = (instructorId?: string) => {
  const [duties, setDuties] = useState<DutyDetailed[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDuties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = instructorId
        ? await DutyService.fetchInstructorDuties(instructorId)
        : await DutyService.fetchDuties();
      setDuties(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [instructorId]);

  const createDuty = useCallback(
    async (payload: Partial<Duty>) => {
      try {
        setError(null);
        await DutyService.createDuty(payload);
        await fetchDuties();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchDuties]
  );

  const updateDuty = useCallback(
    async (id: string, payload: Partial<Duty>) => {
      try {
        setError(null);
        await DutyService.updateDuty(id, payload);
        await fetchDuties();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchDuties]
  );

  const deleteDuty = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await DutyService.deleteDuty(id);
        await fetchDuties();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchDuties]
  );

  const markArrival = useCallback(
    async (dutyId: string, reportingTime: Date) => {
      const punctuality = PunctualityUtil.detectPunctuality(new Date(), reportingTime);
      await DutyService.markArrival(dutyId, punctuality as PunctualityStatus);
      await fetchDuties();
    },
    [fetchDuties]
  );

  useEffect(() => {
    fetchDuties();
  }, [fetchDuties]);

  return {
    duties,
    loading,
    error,
    fetchDuties,
    createDuty,
    updateDuty,
    deleteDuty,
    markArrival,
  };
};
