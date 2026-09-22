// Hand-written to match supabase/migrations/*.sql. Regenerate from the live
// schema once these migrations are applied, e.g.:
//   supabase gen types typescript --linked > src/types/database.types.ts
// The shape here matches that command's output so it's a drop-in replacement.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      admin_accounts: {
        Row: {
          id: string;
          profile_id: string;
          admin_role: Database["public"]["Enums"]["admin_role"];
          status: Database["public"]["Enums"]["account_status"];
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          admin_role?: Database["public"]["Enums"]["admin_role"];
          status?: Database["public"]["Enums"]["account_status"];
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["admin_accounts"]["Insert"]>;
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          organization_type: Database["public"]["Enums"]["organization_type"];
          contact_name: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          postal_code: string | null;
          status: Database["public"]["Enums"]["account_status"];
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          organization_type?: Database["public"]["Enums"]["organization_type"];
          contact_name?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
      };
      customer_accounts: {
        Row: {
          id: string;
          profile_id: string;
          account_type: Database["public"]["Enums"]["account_type"];
          organization_id: string | null;
          affiliated_organization_id: string | null;
          billing_email: string | null;
          phone: string | null;
          status: Database["public"]["Enums"]["account_status"];
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          account_type?: Database["public"]["Enums"]["account_type"];
          organization_id?: string | null;
          affiliated_organization_id?: string | null;
          billing_email?: string | null;
          phone?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["customer_accounts"]["Insert"]>;
      };
      documents: {
        Row: {
          id: string;
          owner_type: Database["public"]["Enums"]["document_owner_type"];
          owner_id: string;
          document_type: string;
          file_path: string;
          uploaded_by: string | null;
          created_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          owner_type: Database["public"]["Enums"]["document_owner_type"];
          owner_id: string;
          document_type: string;
          file_path: string;
          uploaded_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Insert"]>;
      };
      contractor_accounts: {
        Row: {
          id: string;
          profile_id: string;
          business_name: string | null;
          region: string | null;
          status: Database["public"]["Enums"]["contractor_status"];
          stripe_connect_account_id: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          business_name?: string | null;
          region?: string | null;
          status?: Database["public"]["Enums"]["contractor_status"];
          stripe_connect_account_id?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["contractor_accounts"]["Insert"]>;
      };
      contractor_rates: {
        Row: {
          id: string;
          contractor_account_id: string;
          service_type: Database["public"]["Enums"]["service_type"];
          base_rate: number;
          rate_type: Database["public"]["Enums"]["rate_type"];
          markup_percentage: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          contractor_account_id: string;
          service_type: Database["public"]["Enums"]["service_type"];
          base_rate: number;
          rate_type?: Database["public"]["Enums"]["rate_type"];
          markup_percentage?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contractor_rates"]["Insert"]>;
      };
      contractor_service_areas: {
        Row: {
          id: string;
          contractor_account_id: string;
          zip_code: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          contractor_account_id: string;
          zip_code: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contractor_service_areas"]["Insert"]>;
      };
      contractor_insurance: {
        Row: {
          id: string;
          contractor_account_id: string;
          provider_name: string;
          policy_number: string;
          coverage_amount: number | null;
          effective_date: string | null;
          expiration_date: string | null;
          document_id: string | null;
          verified: boolean;
          verified_by: string | null;
          verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          contractor_account_id: string;
          provider_name: string;
          policy_number: string;
          coverage_amount?: number | null;
          effective_date?: string | null;
          expiration_date?: string | null;
          document_id?: string | null;
          verified?: boolean;
          verified_by?: string | null;
          verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contractor_insurance"]["Insert"]>;
      };
      mower_models: {
        Row: {
          id: string;
          manufacturer: string;
          model_name: string;
          model_year: number | null;
          cutting_width_inches: number | null;
          battery_type: string | null;
          msrp: number | null;
          specs: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          manufacturer: string;
          model_name: string;
          model_year?: number | null;
          cutting_width_inches?: number | null;
          battery_type?: string | null;
          msrp?: number | null;
          specs?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["mower_models"]["Insert"]>;
      };
      service_plans: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          plan_type: Database["public"]["Enums"]["plan_type"];
          monthly_price: number;
          purchase_option_enabled: boolean;
          purchase_option_unlock_months: number | null;
          purchase_option_price: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          plan_type: Database["public"]["Enums"]["plan_type"];
          monthly_price: number;
          purchase_option_enabled?: boolean;
          purchase_option_unlock_months?: number | null;
          purchase_option_price?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["service_plans"]["Insert"]>;
      };
      properties: {
        Row: {
          id: string;
          customer_account_id: string;
          property_type: Database["public"]["Enums"]["property_type"];
          address_line1: string;
          address_line2: string | null;
          city: string;
          state: string;
          postal_code: string;
          latitude: number | null;
          longitude: number | null;
          access_notes: string | null;
          status: Database["public"]["Enums"]["account_status"];
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_type?: Database["public"]["Enums"]["property_type"];
          address_line1: string;
          address_line2?: string | null;
          city: string;
          state: string;
          postal_code: string;
          latitude?: number | null;
          longitude?: number | null;
          access_notes?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
      };
      customer_subscriptions: {
        Row: {
          id: string;
          customer_account_id: string;
          property_id: string;
          service_plan_id: string;
          status: Database["public"]["Enums"]["subscription_status"];
          start_date: string;
          purchase_option_eligible_at: string | null;
          purchased_at: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_id: string;
          service_plan_id: string;
          status?: Database["public"]["Enums"]["subscription_status"];
          start_date?: string;
          purchase_option_eligible_at?: string | null;
          purchased_at?: string | null;
          stripe_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["customer_subscriptions"]["Insert"]>;
      };
      customer_mowers: {
        Row: {
          id: string;
          mower_model_id: string;
          property_id: string;
          customer_subscription_id: string | null;
          serial_number: string;
          status: Database["public"]["Enums"]["mower_status"];
          installed_at: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          mower_model_id: string;
          property_id: string;
          customer_subscription_id?: string | null;
          serial_number: string;
          status?: Database["public"]["Enums"]["mower_status"];
          installed_at?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["customer_mowers"]["Insert"]>;
      };
      service_requests: {
        Row: {
          id: string;
          customer_account_id: string;
          property_id: string;
          requested_by: string;
          service_type: Database["public"]["Enums"]["service_type"] | null;
          description: string;
          status: Database["public"]["Enums"]["service_request_status"];
          priority: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_id: string;
          requested_by: string;
          service_type?: Database["public"]["Enums"]["service_type"] | null;
          description: string;
          status?: Database["public"]["Enums"]["service_request_status"];
          priority?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["service_requests"]["Insert"]>;
      };
      service_schedules: {
        Row: {
          id: string;
          customer_account_id: string;
          property_id: string;
          service_type: Database["public"]["Enums"]["service_type"];
          price: number;
          frequency: Database["public"]["Enums"]["schedule_frequency"];
          interval_count: number;
          start_date: string;
          end_date: string | null;
          next_run_at: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_id: string;
          service_type: Database["public"]["Enums"]["service_type"];
          price: number;
          frequency: Database["public"]["Enums"]["schedule_frequency"];
          interval_count?: number;
          start_date: string;
          end_date?: string | null;
          next_run_at: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["service_schedules"]["Insert"]>;
      };
      appointments: {
        Row: {
          id: string;
          customer_account_id: string;
          property_id: string;
          service_request_id: string | null;
          service_schedule_id: string | null;
          scheduled_start: string;
          scheduled_end: string | null;
          status: Database["public"]["Enums"]["appointment_status"];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_id: string;
          service_request_id?: string | null;
          service_schedule_id?: string | null;
          scheduled_start: string;
          scheduled_end?: string | null;
          status?: Database["public"]["Enums"]["appointment_status"];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["appointments"]["Insert"]>;
      };
      work_orders: {
        Row: {
          id: string;
          customer_account_id: string;
          property_id: string;
          appointment_id: string | null;
          service_request_id: string | null;
          service_schedule_id: string | null;
          service_type: Database["public"]["Enums"]["service_type"];
          price: number;
          status: Database["public"]["Enums"]["work_order_status"];
          scheduled_date: string | null;
          completed_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_id: string;
          appointment_id?: string | null;
          service_request_id?: string | null;
          service_schedule_id?: string | null;
          service_type: Database["public"]["Enums"]["service_type"];
          price: number;
          status?: Database["public"]["Enums"]["work_order_status"];
          scheduled_date?: string | null;
          completed_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["work_orders"]["Insert"]>;
      };
      job_assignments: {
        Row: {
          id: string;
          work_order_id: string;
          contractor_account_id: string;
          service_type: Database["public"]["Enums"]["service_type"];
          base_rate_snapshot: number;
          markup_percentage_snapshot: number;
          payout_amount: number;
          status: Database["public"]["Enums"]["job_assignment_status"];
          assigned_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          work_order_id: string;
          contractor_account_id: string;
          service_type: Database["public"]["Enums"]["service_type"];
          base_rate_snapshot: number;
          markup_percentage_snapshot: number;
          status?: Database["public"]["Enums"]["job_assignment_status"];
          assigned_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["job_assignments"]["Insert"]>;
      };
      job_updates: {
        Row: {
          id: string;
          work_order_id: string;
          job_assignment_id: string | null;
          author_profile_id: string;
          update_type: Database["public"]["Enums"]["job_update_type"];
          message: string | null;
          photo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          work_order_id: string;
          job_assignment_id?: string | null;
          author_profile_id: string;
          update_type?: Database["public"]["Enums"]["job_update_type"];
          message?: string | null;
          photo_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["job_updates"]["Insert"]>;
      };
      quote_requests: {
        Row: {
          id: string;
          customer_account_id: string;
          property_id: string | null;
          requested_by: string;
          description: string;
          status: Database["public"]["Enums"]["quote_status"];
          estimated_amount: number | null;
          estimated_by: string | null;
          estimated_at: string | null;
          sent_at: string | null;
          responded_at: string | null;
          decline_reason: string | null;
          resulting_work_order_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_id?: string | null;
          requested_by: string;
          description: string;
          status?: Database["public"]["Enums"]["quote_status"];
          estimated_amount?: number | null;
          estimated_by?: string | null;
          estimated_at?: string | null;
          sent_at?: string | null;
          responded_at?: string | null;
          decline_reason?: string | null;
          resulting_work_order_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["quote_requests"]["Insert"]>;
      };
      invoices: {
        Row: {
          id: string;
          customer_account_id: string;
          work_order_id: string | null;
          status: Database["public"]["Enums"]["invoice_status"];
          subtotal: number;
          tax_amount: number;
          total_amount: number;
          currency: string;
          due_date: string | null;
          sent_at: string | null;
          paid_at: string | null;
          stripe_invoice_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          work_order_id?: string | null;
          status?: Database["public"]["Enums"]["invoice_status"];
          subtotal?: number;
          tax_amount?: number;
          total_amount?: number;
          currency?: string;
          due_date?: string | null;
          sent_at?: string | null;
          paid_at?: string | null;
          stripe_invoice_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>;
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity?: number;
          unit_price: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["invoice_items"]["Insert"]>;
      };
      payments: {
        Row: {
          id: string;
          invoice_id: string;
          customer_account_id: string;
          amount: number;
          currency: string;
          status: Database["public"]["Enums"]["payment_status"];
          stripe_payment_intent_id: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          customer_account_id: string;
          amount: number;
          currency?: string;
          status?: Database["public"]["Enums"]["payment_status"];
          stripe_payment_intent_id?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
      complaints: {
        Row: {
          id: string;
          customer_account_id: string;
          property_id: string | null;
          work_order_id: string | null;
          submitted_by: string;
          subject: string;
          description: string;
          status: Database["public"]["Enums"]["complaint_status"];
          resolution_notes: string | null;
          resolved_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_account_id: string;
          property_id?: string | null;
          work_order_id?: string | null;
          submitted_by: string;
          subject: string;
          description: string;
          status?: Database["public"]["Enums"]["complaint_status"];
          resolution_notes?: string | null;
          resolved_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["complaints"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          related_entity_type: Database["public"]["Enums"]["entity_type"] | null;
          related_entity_id: string | null;
          sender_profile_id: string;
          recipient_profile_id: string | null;
          body: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          related_entity_type?: Database["public"]["Enums"]["entity_type"] | null;
          related_entity_id?: string | null;
          sender_profile_id: string;
          recipient_profile_id?: string | null;
          body: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          profile_id: string;
          notification_type: string;
          title: string;
          body: string | null;
          related_entity_type: Database["public"]["Enums"]["entity_type"] | null;
          related_entity_id: string | null;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          notification_type: string;
          title: string;
          body?: string | null;
          related_entity_type?: Database["public"]["Enums"]["entity_type"] | null;
          related_entity_id?: string | null;
          read_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      audit_logs: {
        Row: {
          id: string;
          actor_profile_id: string | null;
          action: string;
          table_name: string;
          record_id: string | null;
          old_values: Json | null;
          new_values: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_profile_id?: string | null;
          action: string;
          table_name: string;
          record_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Insert"]>;
      };
    };
    Enums: {
      account_type: "individual" | "organization";
      organization_type: "hoa" | "property_management" | "other";
      account_status: "active" | "inactive" | "archived";
      contractor_status: "active" | "inactive" | "suspended";
      admin_role: "super_admin" | "support" | "operations" | "finance";
      property_type: "residential" | "commercial";
      mower_status: "active" | "maintenance" | "retired" | "returned";
      plan_type: "rental_no_ownership" | "rental_with_purchase_option";
      subscription_status: "active" | "paused" | "cancelled" | "pending_purchase";
      service_type: "mowing" | "fertilization" | "fall_cleanup" | "shrub_trim" | "aeration" | "other";
      rate_type: "hourly" | "per_job" | "per_visit";
      schedule_frequency: "weekly" | "biweekly" | "monthly" | "quarterly" | "annually";
      service_request_status: "open" | "scheduled" | "in_progress" | "completed" | "cancelled";
      appointment_status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";
      work_order_status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled";
      job_assignment_status: "assigned" | "accepted" | "declined" | "completed";
      job_update_type: "status_change" | "note" | "photo" | "issue";
      quote_status: "pending" | "estimated" | "sent" | "accepted" | "declined";
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "void";
      payment_status: "pending" | "succeeded" | "failed" | "refunded";
      complaint_status: "open" | "investigating" | "resolved" | "closed";
      entity_type:
        | "service_request"
        | "service_schedule"
        | "appointment"
        | "work_order"
        | "quote_request"
        | "invoice"
        | "complaint"
        | "general";
      document_owner_type: "customer_account" | "contractor_account" | "property" | "organization" | "work_order";
    };
  };
};
