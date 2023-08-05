export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      LinkCards: {
        Row: {
          admin_id: string
          column: number | null
          created_at: string | null
          deleted: boolean | null
          id: number
          isDisabled: boolean
          isNavCard: boolean | null
          link: string | null
          summary: string | null
          title: string | null
          wedding_fk: number
        }
        Insert: {
          admin_id: string
          column?: number | null
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          isDisabled?: boolean
          isNavCard?: boolean | null
          link?: string | null
          summary?: string | null
          title?: string | null
          wedding_fk: number
        }
        Update: {
          admin_id?: string
          column?: number | null
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          isDisabled?: boolean
          isNavCard?: boolean | null
          link?: string | null
          summary?: string | null
          title?: string | null
          wedding_fk?: number
        }
        Relationships: [
          {
            foreignKeyName: "LinkCards_admin_id_fkey"
            columns: ["admin_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "LinkCards_wedding_fk_fkey"
            columns: ["wedding_fk"]
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
          admin_id: string
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
          admin_id: string
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
          admin_id?: string
          alias?: string
          created_at?: string | null
          date?: string | null
          deleted?: boolean | null
          description?: string | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "WeddingInfo_admin_id_fkey"
            columns: ["admin_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
