export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      LinkCards: {
        Row: {
          column: number | null
          created_at: string | null
          deleted: boolean | null
          id: number
          isNavCard: boolean | null
          link: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          column?: number | null
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          isNavCard?: boolean | null
          link?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          column?: number | null
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          isNavCard?: boolean | null
          link?: string | null
          summary?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
