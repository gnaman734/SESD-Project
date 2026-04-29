import { Session } from "@supabase/supabase-js";
import { assertSupabaseConfigured, supabase } from "../supabase/client";
import { User, UserRole } from "../types/domain";

export class AuthService {
  static async signUp(params: {
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    department?: string;
    employeeCode?: string;
  }): Promise<User | null> {
    assertSupabaseConfigured();

    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          full_name: params.fullName,
          role: params.role,
        },
      },
    });
    if (error) {
      throw error;
    }
    if (!data.user) {
      return null;
    }

    let instructorId: string | null = null;
    if (params.role === UserRole.INSTRUCTOR) {
      const { data: instructor, error: instructorError } = await supabase
        .from("instructors")
        .insert({
          full_name: params.fullName,
          email: params.email,
          department: params.department ?? "",
          employee_code: params.employeeCode ?? "",
        })
        .select()
        .single();
      if (instructorError) {
        throw instructorError;
      }
      instructorId = instructor?.id ?? null;
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        email: params.email,
        full_name: params.fullName,
        role: params.role,
        instructor_id: instructorId,
      })
      .select()
      .single();
    if (profileError) {
      throw profileError;
    }

    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        full_name: params.fullName,
        role: params.role,
        instructor_id: instructorId,
      },
    });
    if (metadataError) {
      throw metadataError;
    }

    return profile as User;
  }

  static async fetchUserProfile(userId: string): Promise<User | null> {
    assertSupabaseConfigured();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      throw error;
    }
    return (data as User | null) ?? null;
  }

  static mapSessionToUser(session: Session): User {
    const profile = session.user.user_metadata as Partial<User>;
    return {
      id: session.user.id,
      email: session.user.email ?? "",
      full_name: profile.full_name ?? "",
      role: (profile.role as UserRole) ?? UserRole.INSTRUCTOR,
      instructor_id: profile.instructor_id ?? null,
      created_at: session.user.created_at,
    };
  }

  static async resolveUser(session: Session): Promise<User> {
    const profile = await AuthService.fetchUserProfile(session.user.id);
    return profile ?? AuthService.mapSessionToUser(session);
  }

  static async getCurrentUser(): Promise<User | null> {
    assertSupabaseConfigured();

    const { data } = await supabase.auth.getSession();
    const session = data.session;
    if (!session) {
      return null;
    }
    return AuthService.resolveUser(session);
  }
}
