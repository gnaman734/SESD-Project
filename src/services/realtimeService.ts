import { supabase } from "../supabase/client";

export class RealtimeService {
  static subscribeToDuties(callback: (payload: unknown) => void) {
    return supabase
      .channel("duties-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "duties" },
        (payload) => callback(payload)
      )
      .subscribe();
  }
}
