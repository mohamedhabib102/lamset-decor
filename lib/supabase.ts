import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
// هذا المتغير متاح فقط على السيرفر، وسيكون undefined في المتصفح
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase URL or Anon Key.');
}

// العميل العادي للمتصفح والسيرفر
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// --- هذه الدالة الوحيدة التي تتكلم مع Supabase مباشرة لرفع الصور كما طلبت ---
export const createProject = async (title: string, file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("Imges")
      .upload(fileName, file);

    if (uploadError) throw new Error(`Upload Error: ${uploadError.message}`);

    const { error: dbError } = await supabase
      .from("projects")
      .insert({
        title: title,
        name: fileName,
      });

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);
    return { success: true };
  } catch (error: any) {
    console.error(error.message);
    return { success: false, error: error.message };
  }
};

// --- التعامل مع الرسائل (Direct Supabase) ---
export const createMessage = async (data: { fullName: string, email: string, phone: string, message: string }) => {
  const { error } = await supabase.from('messages').insert(data);
  if (error) return { success: false, error: error.message };
  return { success: true };
};

export const getMessages = async () => {
  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  if (error) return { success: false, error: error.message };
  return { success: true, data };
};