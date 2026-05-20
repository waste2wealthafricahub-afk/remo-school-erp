import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dqwfeayduvjqquttzknp.supabase.co";

const supabaseKey = "sb_publishable_HXQgjGtLgVD20LApiHoeEw_cxYWuFGz";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);