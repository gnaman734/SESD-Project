import { supabase } from "../supabase/client";
import { Instructor } from "../types/domain";

export class InstructorService {
  static async fetchInstructors(): Promise<Instructor[]> {
    const { data, error } = await supabase.from("instructors").select("*");
    if (error) {
      throw error;
    }
    return (data ?? []) as Instructor[];
  }

  static async createInstructor(payload: Partial<Instructor>): Promise<Instructor> {
    const { data, error } = await supabase
      .from("instructors")
      .insert(payload)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Instructor;
  }

  static async updateInstructor(id: string, payload: Partial<Instructor>): Promise<Instructor> {
    const { data, error } = await supabase
      .from("instructors")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Instructor;
  }

  static async deleteInstructor(id: string): Promise<void> {
    const { error } = await supabase.from("instructors").delete().eq("id", id);
    if (error) {
      throw error;
    }
  }
}
