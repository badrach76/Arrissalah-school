// بيانات الاتصال بمشروع Supabase الخاص بك
const SUPABASE_URL = 'https://ginohutluqeprmkrodbb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_HnxeYpiIqU7BXYJ5EfCTtQ_Xtom-SXC';

// تهيئة العميل (Client)
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { _supabase };
