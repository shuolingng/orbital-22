import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from "@env";

//const SUPABASE_URL = "https://zcbyscwhbgkzklgqgznt.supabase.co"

//const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYnlzY3doYmdremtsZ3Fnem50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIxMDcyMDEsImV4cCI6MTk2NzY4MzIwMX0.FpSOOUcKQFbnU2b6V4lB2dsL6umZfhChnrhFbKahiJE'
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
    localStorage: AsyncStorage,
});
    
export { supabase };

//if (!SUPABASE_URL || !supabaseKey) {
//    console.error("[Supabase] URL and Key not found in environment variables.");
//}

//console.log('SUPABASE_URL');
