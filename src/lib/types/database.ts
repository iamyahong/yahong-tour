export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface FlowStep {
  time: string;
  title: string;
  description: string;
}

export interface GoodToKnowItem {
  title: string;
  body: string;
}

export type SubImage = {
  url: string;
  caption: string;
};

export interface Database {
  public: {
    Tables: {
      modules: {
        Row: {
          id: string;
          category: string;
          title: string;
          subtitle: string | null;
          duration: string;
          duration_label: string | null;
          cost: string;
          cost_label: string | null;
          pace: string | null;
          pace_label: string | null;
          suitable: string | null;
          suitable_label: string | null;
          tags: string[] | null;
          hero_image_url: string;
          flow: FlowStep[];
          favorite_point: string;
          good_to_know: GoodToKnowItem[];
          sub_images: SubImage[];
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          category: string;
          title: string;
          subtitle?: string | null;
          duration: string;
          duration_label?: string | null;
          cost: string;
          cost_label?: string | null;
          pace?: string | null;
          pace_label?: string | null;
          suitable?: string | null;
          suitable_label?: string | null;
          tags?: string[] | null;
          hero_image_url: string;
          flow?: FlowStep[];
          favorite_point?: string;
          good_to_know?: GoodToKnowItem[];
          sub_images?: SubImage[];
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          title?: string;
          subtitle?: string | null;
          duration?: string;
          duration_label?: string | null;
          cost?: string;
          cost_label?: string | null;
          pace?: string | null;
          pace_label?: string | null;
          suitable?: string | null;
          suitable_label?: string | null;
          tags?: string[] | null;
          hero_image_url?: string;
          flow?: FlowStep[];
          favorite_point?: string;
          good_to_know?: GoodToKnowItem[];
          sub_images?: SubImage[];
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      reservations: {
        Row: {
          id: string;
          preferred_date: string;
          alternative_date: string | null;
          num_people: number;
          age_group: string;
          selected_modules: string[];
          request_message: string | null;
          name: string;
          email: string;
          line_id: string;
          stay_period: string | null;
          status: "new" | "contacted" | "confirmed" | "completed" | "cancelled" | "no_show";
          admin_memo: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          preferred_date: string;
          alternative_date?: string | null;
          num_people: number;
          age_group: string;
          selected_modules: string[];
          request_message?: string | null;
          name: string;
          email: string;
          line_id: string;
          stay_period?: string | null;
          status?: "new" | "contacted" | "confirmed" | "completed" | "cancelled" | "no_show";
          admin_memo?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          preferred_date?: string;
          alternative_date?: string | null;
          num_people?: number;
          age_group?: string;
          selected_modules?: string[];
          request_message?: string | null;
          name?: string;
          email?: string;
          line_id?: string;
          stay_period?: string | null;
          status?: "new" | "contacted" | "confirmed" | "completed" | "cancelled" | "no_show";
          admin_memo?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          nickname: string;
          visit_date: string;
          module_id: string | null;
          rating: number;
          language: string;
          content: string;
          photo_urls: string[] | null;
          password_hash: string | null;
          is_seed: boolean;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          nickname: string;
          visit_date: string;
          module_id?: string | null;
          rating: number;
          language?: string;
          content: string;
          photo_urls?: string[] | null;
          password_hash?: string | null;
          is_seed?: boolean;
          is_visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          nickname?: string;
          visit_date?: string;
          module_id?: string | null;
          rating?: number;
          language?: string;
          content?: string;
          photo_urls?: string[] | null;
          password_hash?: string | null;
          is_seed?: boolean;
          is_visible?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Module = Database["public"]["Tables"]["modules"]["Row"];
export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type ReservationStatus = Reservation["status"];
