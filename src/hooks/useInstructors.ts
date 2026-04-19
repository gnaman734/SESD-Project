import { useCallback, useEffect, useState } from "react";
import { Instructor } from "../types/domain";
import { InstructorService } from "../services/instructorService";
import { WorkloadUtil } from "../utils/workload";

export const useInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await InstructorService.fetchInstructors();
      setInstructors(WorkloadUtil.computeWorkloadForAll(data));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createInstructor = useCallback(
    async (payload: Partial<Instructor>) => {
      try {
        setError(null);
        await InstructorService.createInstructor(payload);
        await fetchInstructors();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchInstructors]
  );

  const updateInstructor = useCallback(
    async (id: string, payload: Partial<Instructor>) => {
      try {
        setError(null);
        await InstructorService.updateInstructor(id, payload);
        await fetchInstructors();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchInstructors]
  );

  const deleteInstructor = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await InstructorService.deleteInstructor(id);
        await fetchInstructors();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchInstructors]
  );

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  return {
    instructors,
    loading,
    error,
    fetchInstructors,
    createInstructor,
    updateInstructor,
    deleteInstructor,
  };
};
