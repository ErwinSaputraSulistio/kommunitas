import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  'https://wgznjyrkpbkbiiycpjxz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnem5qeXJrcGJrYmlpeWNwanh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwNjQ5ODgsImV4cCI6MjAxODY0MDk4OH0.gsag2AkhBqdls5voQzph7szD2M6AOSW0nuHF2hKh6DM'
)

const root = createRoot(document.getElementById('root'))
root.render(
  <SessionContextProvider supabaseClient={ supabase }>
    <App/>
  </SessionContextProvider>
)
