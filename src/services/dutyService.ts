import { supabase } from "../supabase/client";
import { Duty, DutyDetailed, DutyStatus, PunctualityStatus } from "../types/domain";

export class DutyService {
  static async fetchDuties(): Promise<DutyDetailed[]> {
    const { data, error } = await supabase
      .from("duties_detailed")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return (data ?? []) as DutyDetailed[];
  }

  static async fetchInstructorDuties(instructorId: string): Promise<DutyDetailed[]> {
    const { data, error } = await supabase
      .from("duties_detailed")
      .select("*")
      .eq("instructor_id", instructorId)
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return (data ?? []) as DutyDetailed[];
  }

  static async createDuty(payload: Partial<Duty>): Promise<Duty> {
    const { data, error } = await supabase.from("duties").insert(payload).select().single();
    if (error) {
      throw error;
    }
    return data as Duty;
  }

  static async updateDuty(id: string, payload: Partial<Duty>): Promise<Duty> {
    const { data, error } = await supabase
      .from("duties")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Duty;
  }

  static async deleteDuty(id: string): Promise<void> {
    const { error } = await supabase.from("duties").delete().eq("id", id);
    if (error) {
      throw error;
    }
  }

  static async markArrival(dutyId: string, punctualityStatus: PunctualityStatus): Promise<Duty> {
    const { data, error } = await supabase
      .from("duties")
      .update({
        arrival_time: new Date().toISOString(),
        punctuality_status: punctualityStatus,
        status: DutyStatus.CONFIRMED,
      })
      .eq("id", dutyId)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Duty;
  }
}
