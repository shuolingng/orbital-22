import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wdigoxnrzzyoarvatlkl.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkaWdveG5yenp5b2FydmF0bGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTcwOTc4MzMsImV4cCI6MTk3MjY3MzgzM30.nM4qu1fboOi2SdVQRPpbI0pjAES1WFiX1Nu7U7rqQSQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)