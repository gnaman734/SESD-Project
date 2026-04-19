import { useCallback, useEffect, useState } from "react";
import { Exam, Room } from "../types/domain";
import { ExamService } from "../services/examService";
import { RoomService } from "../services/roomService";

export const useExamsRooms = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [examData, roomData] = await Promise.all([
        ExamService.fetchExams(),
        RoomService.fetchRooms(),
      ]);
      setExams(examData);
      setRooms(roomData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createExam = useCallback(
    async (payload: Partial<Exam>) => {
      try {
        setError(null);
        await ExamService.createExam(payload);
        await fetchAll();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchAll]
  );

  const updateExam = useCallback(
    async (id: string, payload: Partial<Exam>) => {
      try {
        setError(null);
        await ExamService.updateExam(id, payload);
        await fetchAll();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchAll]
  );

  const deleteExam = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await ExamService.deleteExam(id);
        await fetchAll();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchAll]
  );

  const createRoom = useCallback(
    async (payload: Partial<Room>) => {
      try {
        setError(null);
        await RoomService.createRoom(payload);
        await fetchAll();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchAll]
  );

  const updateRoom = useCallback(
    async (id: string, payload: Partial<Room>) => {
      try {
        setError(null);
        await RoomService.updateRoom(id, payload);
        await fetchAll();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchAll]
  );

  const deleteRoom = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await RoomService.deleteRoom(id);
        await fetchAll();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [fetchAll]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    exams,
    rooms,
    loading,
    error,
    fetchAll,
    createExam,
    updateExam,
    deleteExam,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};
