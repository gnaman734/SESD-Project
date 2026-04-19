import { supabase } from "../supabase/client";
import { Room } from "../types/domain";

export class RoomService {
  static async fetchRooms(): Promise<Room[]> {
    const { data, error } = await supabase.from("rooms").select("*");
    if (error) {
      throw error;
    }
    return (data ?? []) as Room[];
  }

  static async createRoom(payload: Partial<Room>): Promise<Room> {
    const { data, error } = await supabase.from("rooms").insert(payload).select().single();
    if (error) {
      throw error;
    }
    return data as Room;
  }

  static async updateRoom(id: string, payload: Partial<Room>): Promise<Room> {
    const { data, error } = await supabase
      .from("rooms")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data as Room;
  }

  static async deleteRoom(id: string): Promise<void> {
    const { error } = await supabase.from("rooms").delete().eq("id", id);
    if (error) {
      throw error;
    }
  }
}
