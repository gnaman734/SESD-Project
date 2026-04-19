import { supabase } from "../supabase/client";
import { AnalyticsCache } from "../types/domain";

export class AnalyticsService {
  static async fetchAnalytics(): Promise<AnalyticsCache[]> {
    const { data, error } = await supabase.from("analytics_cache").select("*");
    if (error) {
      throw error;
    }
    return (data ?? []) as AnalyticsCache[];
  }
}
