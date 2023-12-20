import './App.css'
import { useRef, useState } from 'react'
import useGoogleAuth from './hooks/useGoogleAuth'
import { useSession, useSessionContext } from '@supabase/auth-helpers-react'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

const App = () => {
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())
  const name = useRef()
  const description = useRef()
  const emails = useRef()

  const { login, logout } = useGoogleAuth()

  const session = useSession()
  const { isLoading } = useSessionContext()

  if(isLoading) {
    return <></>
  }

  const newCalendarEvent = async(e) => {
    e.preventDefault()

    const event = {
      summary: name.current.value,
      description: description.current.value,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      attendees: emails.current.value.split(',').map((email) => { return { email } })
    }

    try {
      const result = await axios.post(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        JSON.stringify(event),
        { headers: { Authorization: `Bearer ${ session.provider_token }` } }
      )
      if(result) {
        Swal.fire('Success', 'Event successfully announced, check Google Calendar', 'success')
        .then(() => { location.reload() })
      }
    }
    catch(err) {
      Swal.fire('Error', err.response.data.error.message, 'error')
    }
  }

  return (
    session ?
    <>
      <header>
        <span>Welcome, { session.user.identities[0].identity_data.full_name }</span>
        <button className='buttonAuthentication' onClick={ () => { logout() } }>Logout</button>
      </header>
      <form onSubmit={ newCalendarEvent }>
        <p>Start of the Event</p>
        <DateTimePicker onChange={ setStart } required value={ start }/>
        <p>End of the Event</p>
        <DateTimePicker onChange={ setEnd } required value={ end }/>
        <p>Event Name</p>
        <input className='inputCustom' ref={ name } required type='text'/>
        <p>Event Description</p>
        <input className='inputCustom' ref={ description } required type='text'/>
        <p>Announce to Emails (Separate with a Coma)</p>
        <textarea className='inputCustom' placeholder='first@gmail.com,second@gmail.com' ref={ emails } required/>
        <button className='buttonAnnounceEvent'>Announce Event</button>
      </form>
    </>
    :
    <div>
      <p>Kommunitas.net - Events Announcer</p>
      <button className='buttonAuthentication' onClick={ () => { login() } }>Login</button>
    </div>
  )
}

export default App