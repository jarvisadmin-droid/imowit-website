export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_accounts: {
        Row: {
          admin_role: Database["public"]["Enums"]["admin_role"]
          created_at: string
          deleted_at: string | null
          id: string
          profile_id: string
          status: Database["public"]["Enums"]["account_status"]
          updated_at: string
        }
        Insert: {
          admin_role?: Database["public"]["Enums"]["admin_role"]
          created_at?: string
          deleted_at?: string | null
          id?: string
          profile_id: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Update: {
          admin_role?: Database["public"]["Enums"]["admin_role"]
          created_at?: string
          deleted_at?: string | null
          id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string
          customer_account_id: string
          id: string
          property_id: string
          scheduled_end: string | null
          scheduled_start: string
          service_request_id: string | null
          service_schedule_id: string | null
          status: Database["public"]["Enums"]["appointment_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          id?: string
          property_id: string
          scheduled_end?: string | null
          scheduled_start: string
          service_request_id?: string | null
          service_schedule_id?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          id?: string
          property_id?: string
          scheduled_end?: string | null
          scheduled_start?: string
          service_request_id?: string | null
          service_schedule_id?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_schedule_id_fkey"
            columns: ["service_schedule_id"]
            isOneToOne: false
            referencedRelation: "service_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_profile_id: string | null
          created_at: string
          id: string
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
        }
        Insert: {
          action: string
          actor_profile_id?: string | null
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
        }
        Update: {
          action?: string
          actor_profile_id?: string | null
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_profile_id_fkey"
            columns: ["actor_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          created_at: string
          customer_account_id: string
          description: string
          id: string
          property_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["complaint_status"]
          subject: string
          submitted_by: string
          updated_at: string
          work_order_id: string | null
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          description: string
          id?: string
          property_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["complaint_status"]
          subject: string
          submitted_by: string
          updated_at?: string
          work_order_id?: string | null
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          description?: string
          id?: string
          property_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["complaint_status"]
          subject?: string
          submitted_by?: string
          updated_at?: string
          work_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "complaints_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      contractor_accounts: {
        Row: {
          business_name: string | null
          created_at: string
          deleted_at: string | null
          id: string
          profile_id: string
          region: string | null
          status: Database["public"]["Enums"]["contractor_status"]
          stripe_connect_account_id: string | null
          updated_at: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          profile_id: string
          region?: string | null
          status?: Database["public"]["Enums"]["contractor_status"]
          stripe_connect_account_id?: string | null
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          profile_id?: string
          region?: string | null
          status?: Database["public"]["Enums"]["contractor_status"]
          stripe_connect_account_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractor_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contractor_insurance: {
        Row: {
          contractor_account_id: string
          coverage_amount: number | null
          created_at: string
          document_id: string | null
          effective_date: string | null
          expiration_date: string | null
          id: string
          policy_number: string
          provider_name: string
          updated_at: string
          verified: boolean
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          contractor_account_id: string
          coverage_amount?: number | null
          created_at?: string
          document_id?: string | null
          effective_date?: string | null
          expiration_date?: string | null
          id?: string
          policy_number: string
          provider_name: string
          updated_at?: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          contractor_account_id?: string
          coverage_amount?: number | null
          created_at?: string
          document_id?: string | null
          effective_date?: string | null
          expiration_date?: string | null
          id?: string
          policy_number?: string
          provider_name?: string
          updated_at?: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contractor_insurance_contractor_account_id_fkey"
            columns: ["contractor_account_id"]
            isOneToOne: false
            referencedRelation: "contractor_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contractor_insurance_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contractor_insurance_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contractor_rates: {
        Row: {
          base_rate: number
          contractor_account_id: string
          created_at: string
          id: string
          is_active: boolean
          markup_percentage: number
          rate_type: Database["public"]["Enums"]["rate_type"]
          service_type: Database["public"]["Enums"]["service_type"]
          updated_at: string
        }
        Insert: {
          base_rate: number
          contractor_account_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          markup_percentage?: number
          rate_type?: Database["public"]["Enums"]["rate_type"]
          service_type: Database["public"]["Enums"]["service_type"]
          updated_at?: string
        }
        Update: {
          base_rate?: number
          contractor_account_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          markup_percentage?: number
          rate_type?: Database["public"]["Enums"]["rate_type"]
          service_type?: Database["public"]["Enums"]["service_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractor_rates_contractor_account_id_fkey"
            columns: ["contractor_account_id"]
            isOneToOne: false
            referencedRelation: "contractor_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      contractor_service_areas: {
        Row: {
          contractor_account_id: string
          created_at: string
          id: string
          zip_code: string
        }
        Insert: {
          contractor_account_id: string
          created_at?: string
          id?: string
          zip_code: string
        }
        Update: {
          contractor_account_id?: string
          created_at?: string
          id?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractor_service_areas_contractor_account_id_fkey"
            columns: ["contractor_account_id"]
            isOneToOne: false
            referencedRelation: "contractor_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_accounts: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          affiliated_organization_id: string | null
          billing_email: string | null
          company_name: string | null
          created_at: string
          deleted_at: string | null
          id: string
          organization_id: string | null
          phone: string | null
          profile_id: string
          status: Database["public"]["Enums"]["account_status"]
          updated_at: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          affiliated_organization_id?: string | null
          billing_email?: string | null
          company_name?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_id?: string | null
          phone?: string | null
          profile_id: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          affiliated_organization_id?: string | null
          billing_email?: string | null
          company_name?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          organization_id?: string | null
          phone?: string | null
          profile_id?: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_accounts_affiliated_organization_id_fkey"
            columns: ["affiliated_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_accounts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_mowers: {
        Row: {
          created_at: string
          customer_subscription_id: string | null
          deleted_at: string | null
          id: string
          installed_at: string | null
          mower_model_id: string
          property_id: string
          serial_number: string
          status: Database["public"]["Enums"]["mower_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_subscription_id?: string | null
          deleted_at?: string | null
          id?: string
          installed_at?: string | null
          mower_model_id: string
          property_id: string
          serial_number: string
          status?: Database["public"]["Enums"]["mower_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_subscription_id?: string | null
          deleted_at?: string | null
          id?: string
          installed_at?: string | null
          mower_model_id?: string
          property_id?: string
          serial_number?: string
          status?: Database["public"]["Enums"]["mower_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_mowers_customer_subscription_id_fkey"
            columns: ["customer_subscription_id"]
            isOneToOne: false
            referencedRelation: "customer_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_mowers_mower_model_id_fkey"
            columns: ["mower_model_id"]
            isOneToOne: false
            referencedRelation: "mower_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_mowers_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_subscriptions: {
        Row: {
          created_at: string
          customer_account_id: string
          deleted_at: string | null
          id: string
          property_id: string
          purchase_option_eligible_at: string | null
          purchased_at: string | null
          service_plan_id: string
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          deleted_at?: string | null
          id?: string
          property_id: string
          purchase_option_eligible_at?: string | null
          purchased_at?: string | null
          service_plan_id: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          deleted_at?: string | null
          id?: string
          property_id?: string
          purchase_option_eligible_at?: string | null
          purchased_at?: string | null
          service_plan_id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_subscriptions_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_subscriptions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_subscriptions_service_plan_id_fkey"
            columns: ["service_plan_id"]
            isOneToOne: false
            referencedRelation: "service_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          deleted_at: string | null
          document_type: string
          file_path: string
          id: string
          owner_id: string
          owner_type: Database["public"]["Enums"]["document_owner_type"]
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          document_type: string
          file_path: string
          id?: string
          owner_id: string
          owner_type: Database["public"]["Enums"]["document_owner_type"]
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          document_type?: string
          file_path?: string
          id?: string
          owner_id?: string
          owner_type?: Database["public"]["Enums"]["document_owner_type"]
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          amount: number | null
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          unit_price: number
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          currency: string
          customer_account_id: string
          due_date: string | null
          id: string
          paid_at: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id: string | null
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
          work_order_id: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          customer_account_id: string
          due_date?: string | null
          id?: string
          paid_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          work_order_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          customer_account_id?: string
          due_date?: string | null
          id?: string
          paid_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          work_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: true
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      job_assignments: {
        Row: {
          assigned_at: string
          base_rate_snapshot: number
          contractor_account_id: string
          created_at: string
          id: string
          markup_percentage_snapshot: number
          payout_amount: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["job_assignment_status"]
          updated_at: string
          work_order_id: string
        }
        Insert: {
          assigned_at?: string
          base_rate_snapshot: number
          contractor_account_id: string
          created_at?: string
          id?: string
          markup_percentage_snapshot: number
          payout_amount?: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["job_assignment_status"]
          updated_at?: string
          work_order_id: string
        }
        Update: {
          assigned_at?: string
          base_rate_snapshot?: number
          contractor_account_id?: string
          created_at?: string
          id?: string
          markup_percentage_snapshot?: number
          payout_amount?: number | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["job_assignment_status"]
          updated_at?: string
          work_order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_assignments_contractor_account_id_fkey"
            columns: ["contractor_account_id"]
            isOneToOne: false
            referencedRelation: "contractor_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_assignments_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      job_updates: {
        Row: {
          author_profile_id: string
          created_at: string
          id: string
          job_assignment_id: string | null
          message: string | null
          photo_url: string | null
          update_type: Database["public"]["Enums"]["job_update_type"]
          work_order_id: string
        }
        Insert: {
          author_profile_id: string
          created_at?: string
          id?: string
          job_assignment_id?: string | null
          message?: string | null
          photo_url?: string | null
          update_type?: Database["public"]["Enums"]["job_update_type"]
          work_order_id: string
        }
        Update: {
          author_profile_id?: string
          created_at?: string
          id?: string
          job_assignment_id?: string | null
          message?: string | null
          photo_url?: string | null
          update_type?: Database["public"]["Enums"]["job_update_type"]
          work_order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_updates_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_updates_job_assignment_id_fkey"
            columns: ["job_assignment_id"]
            isOneToOne: false
            referencedRelation: "job_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_updates_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          created_at: string
          id: string
          read_at: string | null
          recipient_profile_id: string | null
          related_entity_id: string | null
          related_entity_type: Database["public"]["Enums"]["entity_type"] | null
          sender_profile_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_profile_id?: string | null
          related_entity_id?: string | null
          related_entity_type?:
            | Database["public"]["Enums"]["entity_type"]
            | null
          sender_profile_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_profile_id?: string | null
          related_entity_id?: string | null
          related_entity_type?:
            | Database["public"]["Enums"]["entity_type"]
            | null
          sender_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_profile_id_fkey"
            columns: ["recipient_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_profile_id_fkey"
            columns: ["sender_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mower_models: {
        Row: {
          battery_type: string | null
          created_at: string
          cutting_width_inches: number | null
          id: string
          manufacturer: string
          model_name: string
          model_year: number | null
          msrp: number | null
          specs: Json
          updated_at: string
        }
        Insert: {
          battery_type?: string | null
          created_at?: string
          cutting_width_inches?: number | null
          id?: string
          manufacturer: string
          model_name: string
          model_year?: number | null
          msrp?: number | null
          specs?: Json
          updated_at?: string
        }
        Update: {
          battery_type?: string | null
          created_at?: string
          cutting_width_inches?: number | null
          id?: string
          manufacturer?: string
          model_name?: string
          model_year?: number | null
          msrp?: number | null
          specs?: Json
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          notification_type: string
          profile_id: string
          read_at: string | null
          related_entity_id: string | null
          related_entity_type: Database["public"]["Enums"]["entity_type"] | null
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          notification_type: string
          profile_id: string
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?:
            | Database["public"]["Enums"]["entity_type"]
            | null
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          notification_type?: string
          profile_id?: string
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?:
            | Database["public"]["Enums"]["entity_type"]
            | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          organization_type: Database["public"]["Enums"]["organization_type"]
          postal_code: string | null
          state: string | null
          status: Database["public"]["Enums"]["account_status"]
          updated_at: string
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          name: string
          organization_type?: Database["public"]["Enums"]["organization_type"]
          postal_code?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          organization_type?: Database["public"]["Enums"]["organization_type"]
          postal_code?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_account_id: string
          id: string
          invoice_id: string
          paid_at: string | null
          status: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          customer_account_id: string
          id?: string
          invoice_id: string
          paid_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_account_id?: string
          id?: string
          invoice_id?: string
          paid_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          marketing_email_opt_in: boolean
          marketing_email_opt_in_at: string | null
          marketing_push_opt_in: boolean
          marketing_push_opt_in_at: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          marketing_email_opt_in?: boolean
          marketing_email_opt_in_at?: string | null
          marketing_push_opt_in?: boolean
          marketing_push_opt_in_at?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          marketing_email_opt_in?: boolean
          marketing_email_opt_in_at?: string | null
          marketing_push_opt_in?: boolean
          marketing_push_opt_in_at?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          access_notes: string | null
          address_line1: string
          address_line2: string | null
          city: string
          created_at: string
          customer_account_id: string
          deleted_at: string | null
          id: string
          latitude: number | null
          location_name: string | null
          longitude: number | null
          place_id: string | null
          postal_code: string
          property_type: Database["public"]["Enums"]["property_type"]
          state: string
          status: Database["public"]["Enums"]["account_status"]
          updated_at: string
        }
        Insert: {
          access_notes?: string | null
          address_line1: string
          address_line2?: string | null
          city: string
          created_at?: string
          customer_account_id: string
          deleted_at?: string | null
          id?: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          place_id?: string | null
          postal_code: string
          property_type?: Database["public"]["Enums"]["property_type"]
          state: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Update: {
          access_notes?: string | null
          address_line1?: string
          address_line2?: string | null
          city?: string
          created_at?: string
          customer_account_id?: string
          deleted_at?: string | null
          id?: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          place_id?: string | null
          postal_code?: string
          property_type?: Database["public"]["Enums"]["property_type"]
          state?: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          created_at: string
          customer_account_id: string
          decline_reason: string | null
          description: string
          estimated_amount: number | null
          estimated_at: string | null
          estimated_by: string | null
          id: string
          property_id: string | null
          request_type: Database["public"]["Enums"]["quote_request_type"]
          requested_by: string
          responded_at: string | null
          resulting_work_order_id: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["quote_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          decline_reason?: string | null
          description: string
          estimated_amount?: number | null
          estimated_at?: string | null
          estimated_by?: string | null
          id?: string
          property_id?: string | null
          request_type?: Database["public"]["Enums"]["quote_request_type"]
          requested_by: string
          responded_at?: string | null
          resulting_work_order_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          decline_reason?: string | null
          description?: string
          estimated_amount?: number | null
          estimated_at?: string | null
          estimated_by?: string | null
          id?: string
          property_id?: string | null
          request_type?: Database["public"]["Enums"]["quote_request_type"]
          requested_by?: string
          responded_at?: string | null
          resulting_work_order_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_requests_estimated_by_fkey"
            columns: ["estimated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_requests_resulting_work_order_id_fkey"
            columns: ["resulting_work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      service_plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          monthly_price: number
          name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          purchase_option_enabled: boolean
          purchase_option_price: number | null
          purchase_option_unlock_months: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          monthly_price: number
          name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          purchase_option_enabled?: boolean
          purchase_option_price?: number | null
          purchase_option_unlock_months?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          monthly_price?: number
          name?: string
          plan_type?: Database["public"]["Enums"]["plan_type"]
          purchase_option_enabled?: boolean
          purchase_option_price?: number | null
          purchase_option_unlock_months?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          created_at: string
          customer_account_id: string
          description: string
          id: string
          priority: string
          property_id: string
          requested_by: string
          service_type: Database["public"]["Enums"]["service_type"] | null
          status: Database["public"]["Enums"]["service_request_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          description: string
          id?: string
          priority?: string
          property_id: string
          requested_by: string
          service_type?: Database["public"]["Enums"]["service_type"] | null
          status?: Database["public"]["Enums"]["service_request_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          description?: string
          id?: string
          priority?: string
          property_id?: string
          requested_by?: string
          service_type?: Database["public"]["Enums"]["service_type"] | null
          status?: Database["public"]["Enums"]["service_request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_schedules: {
        Row: {
          created_at: string
          customer_account_id: string
          deleted_at: string | null
          end_date: string | null
          frequency: Database["public"]["Enums"]["schedule_frequency"]
          id: string
          interval_count: number
          is_active: boolean
          next_run_at: string
          price: number
          property_id: string
          service_type: Database["public"]["Enums"]["service_type"]
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          deleted_at?: string | null
          end_date?: string | null
          frequency: Database["public"]["Enums"]["schedule_frequency"]
          id?: string
          interval_count?: number
          is_active?: boolean
          next_run_at: string
          price: number
          property_id: string
          service_type: Database["public"]["Enums"]["service_type"]
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          deleted_at?: string | null
          end_date?: string | null
          frequency?: Database["public"]["Enums"]["schedule_frequency"]
          id?: string
          interval_count?: number
          is_active?: boolean
          next_run_at?: string
          price?: number
          property_id?: string
          service_type?: Database["public"]["Enums"]["service_type"]
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_schedules_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_schedules_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      work_orders: {
        Row: {
          appointment_id: string | null
          completed_at: string | null
          created_at: string
          customer_account_id: string
          id: string
          notes: string | null
          price: number
          property_id: string
          scheduled_date: string | null
          service_request_id: string | null
          service_schedule_id: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["work_order_status"]
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          completed_at?: string | null
          created_at?: string
          customer_account_id: string
          id?: string
          notes?: string | null
          price: number
          property_id: string
          scheduled_date?: string | null
          service_request_id?: string | null
          service_schedule_id?: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["work_order_status"]
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          completed_at?: string | null
          created_at?: string
          customer_account_id?: string
          id?: string
          notes?: string | null
          price?: number
          property_id?: string
          scheduled_date?: string | null
          service_request_id?: string | null
          service_schedule_id?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["work_order_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_service_schedule_id_fkey"
            columns: ["service_schedule_id"]
            isOneToOne: false
            referencedRelation: "service_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_app_role: { Args: never; Returns: string }
      generate_scheduled_work_orders: { Args: never; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
      is_contractor: { Args: never; Returns: boolean }
      is_trusted_backend: { Args: never; Returns: boolean }
      owns_contractor_account: { Args: { target_id: string }; Returns: boolean }
      owns_customer_account: { Args: { target_id: string }; Returns: boolean }
      request_property_assessment: {
        Args: {
          p_access_notes?: string
          p_address_line1: string
          p_address_line2: string
          p_city: string
          p_company_name?: string
          p_latitude: number
          p_location_name?: string
          p_longitude: number
          p_place_id: string
          p_postal_code: string
          p_property_type: Database["public"]["Enums"]["property_type"]
          p_state: string
        }
        Returns: {
          out_property_id: string
          out_quote_request_id: string
        }[]
      }
    }
    Enums: {
      account_status: "active" | "inactive" | "archived"
      account_type: "individual" | "organization"
      admin_role: "super_admin" | "support" | "operations" | "finance"
      appointment_status:
        | "scheduled"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show"
      complaint_status: "open" | "investigating" | "resolved" | "closed"
      contractor_status: "active" | "inactive" | "suspended"
      document_owner_type:
        | "customer_account"
        | "contractor_account"
        | "property"
        | "organization"
        | "work_order"
      entity_type:
        | "service_request"
        | "service_schedule"
        | "appointment"
        | "work_order"
        | "quote_request"
        | "invoice"
        | "complaint"
        | "general"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "void"
      job_assignment_status: "assigned" | "accepted" | "declined" | "completed"
      job_update_type: "status_change" | "note" | "photo" | "issue"
      mower_status: "active" | "maintenance" | "retired" | "returned"
      organization_type: "hoa" | "property_management" | "other"
      payment_status: "pending" | "succeeded" | "failed" | "refunded"
      plan_type: "rental_no_ownership" | "rental_with_purchase_option"
      property_type: "residential" | "commercial"
      quote_request_type: "plan_assessment" | "service_quote"
      quote_status: "pending" | "estimated" | "sent" | "accepted" | "declined"
      rate_type: "hourly" | "per_job" | "per_visit"
      schedule_frequency:
        | "weekly"
        | "biweekly"
        | "monthly"
        | "quarterly"
        | "annually"
      service_request_status:
        | "open"
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
      service_type:
        | "mowing"
        | "fertilization"
        | "fall_cleanup"
        | "shrub_trim"
        | "aeration"
        | "other"
      subscription_status:
        | "active"
        | "paused"
        | "cancelled"
        | "pending_purchase"
      work_order_status:
        | "pending"
        | "assigned"
        | "in_progress"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      account_status: ["active", "inactive", "archived"],
      account_type: ["individual", "organization"],
      admin_role: ["super_admin", "support", "operations", "finance"],
      appointment_status: [
        "scheduled",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ],
      complaint_status: ["open", "investigating", "resolved", "closed"],
      contractor_status: ["active", "inactive", "suspended"],
      document_owner_type: [
        "customer_account",
        "contractor_account",
        "property",
        "organization",
        "work_order",
      ],
      entity_type: [
        "service_request",
        "service_schedule",
        "appointment",
        "work_order",
        "quote_request",
        "invoice",
        "complaint",
        "general",
      ],
      invoice_status: ["draft", "sent", "paid", "overdue", "void"],
      job_assignment_status: ["assigned", "accepted", "declined", "completed"],
      job_update_type: ["status_change", "note", "photo", "issue"],
      mower_status: ["active", "maintenance", "retired", "returned"],
      organization_type: ["hoa", "property_management", "other"],
      payment_status: ["pending", "succeeded", "failed", "refunded"],
      plan_type: ["rental_no_ownership", "rental_with_purchase_option"],
      property_type: ["residential", "commercial"],
      quote_request_type: ["plan_assessment", "service_quote"],
      quote_status: ["pending", "estimated", "sent", "accepted", "declined"],
      rate_type: ["hourly", "per_job", "per_visit"],
      schedule_frequency: [
        "weekly",
        "biweekly",
        "monthly",
        "quarterly",
        "annually",
      ],
      service_request_status: [
        "open",
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
      ],
      service_type: [
        "mowing",
        "fertilization",
        "fall_cleanup",
        "shrub_trim",
        "aeration",
        "other",
      ],
      subscription_status: [
        "active",
        "paused",
        "cancelled",
        "pending_purchase",
      ],
      work_order_status: [
        "pending",
        "assigned",
        "in_progress",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
