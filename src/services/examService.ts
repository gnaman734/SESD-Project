import { supabase } from "../supabase/client";
import { Exam } from "../types/domain";

export class ExamService {
  static async fetchExams(): Promise<Exam[]> {
    const { data, error } = await supabase.from("exams").select("*");
    if (error) {
      throw error;
    }
    return (data ?? []) as Exam[];
  }

  static async createExam(payload: Partial<Exam>): Promise<Exam> {
    const { data, error } = await supabase.from("exams").insert(payload).select().single();
    if (error) {
      throw error;
    }
    return data as Exam;
  }

  static async updateExam(id: string, payload: Partial<Exam>): Promise<Exam> {
    const { data, error } = await supabase
      .from("exams")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Exam;
  }

  static async deleteExam(id: string): Promise<void> {
    const { error } = await supabase.from("exams").delete().eq("id", id);
    if (error) {
      throw error;
    }
  }
}
