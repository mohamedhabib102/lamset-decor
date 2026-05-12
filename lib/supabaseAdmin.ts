import { createClient } from "@supabase/supabase-js";

// نستخدم نفس المتغيرات الموجودة في .env لضمان الربط
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase URL and Service Role Key are required in lib/supabaseAdmin.ts");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey
);