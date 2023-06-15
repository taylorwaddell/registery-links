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
          weddingFK: number
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
          weddingFK: number
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
          weddingFK?: number
        }
        Relationships: [
          {
            foreignKeyName: "LinkCards_weddingFK_fkey"
            columns: ["weddingFK"]
            referencedRelation: "WeddingInfo"
            referencedColumns: ["id"]
          }
        ]
      }
      WeddingInfo: {
        Row: {
          addressFour: string | null
          addressOne: string | null
          addressThree: string | null
          addressTwo: string | null
          alias: string
          created_at: string | null
          date: string | null
          deleted: boolean | null
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          addressFour?: string | null
          addressOne?: string | null
          addressThree?: string | null
          addressTwo?: string | null
          alias?: string
          created_at?: string | null
          date?: string | null
          deleted?: boolean | null
          description?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          addressFour?: string | null
          addressOne?: string | null
          addressThree?: string | null
          addressTwo?: string | null
          alias?: string
          created_at?: string | null
          date?: string | null
          deleted?: boolean | null
          description?: string | null
          id?: number
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
