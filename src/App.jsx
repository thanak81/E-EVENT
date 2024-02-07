import { useState } from 'react'
import supabase from './config/supabaseClient'
import { useEffect } from 'react';
import { set, useForm } from 'react-hook-form';

function App() {
  const [eventRegister,setEventRegister] = useState([])
  const [events,setEvents] = useState([]);
  const [eventList,setEventList] = useState(events)
  // const [eventName,setEventName] = useState("");
  // const [eventOwner,setEventOwner] = useState("")
  // const [eventTicket,setEventTicket] = useState(0);
  // const [registration_amount,setRegistration_Amount] = useState(0);
  // const [registration_current,setRegistration_current] = useState

  const {
    register,
    handleSubmit,
    watch,
    formState:{errors}
  }  = useForm();

  const onSubmit = (data)=>{
    setEventRegister(data)
    getEvents();
  } 
  useEffect(() => {
    getEvents();
  }, []);

  console.log(events)

async function deleteEvents(events_id){
  const { error } = await supabase
  .from('eventList')
  .delete()
  .eq('id', events_id)
}

  async function getEvents() {
    const { data } = await supabase.from("eventList").select('*,delegates(*)');
    setEvents(data);
  }

  async function insertEvents(){
    try{
      const{data,error} = await supabase
      .from("eventList")
      .insert({
        event_name : eventRegister.eventName,
        event_owner : eventRegister.eventOwner,
        event_price: eventRegister.eventTicket,
        registration_status: eventRegister.registration_status,
        registration_amount:eventRegister.eventAmount,
        registration_current:eventRegister.eventCurrent
      })
      if(data!=null){
        setEventList(data);
        console.log(eventList)
      }
      if(error) throw error;
    }catch(error){
      alert(error.message)
    }
 
  }

  return (
    <>
     <h1>Event Management System</h1>
     <div className="registration-form">
     <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Event Name
      </label>
      <input {...register("eventName",{required:true})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        Event Owner
      </label>
      <input {...register("eventOwner",{required:true})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Event Ticket
      </label>
      <input {...register("eventTicket",{required:true,valueAsNumber:true})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        REGISTRATION AMOUNT
      </label>
      <input {...register("eventAmount",{required:true,valueAsNumber:true})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
      
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        REGISTRATION CURRENT
      </label>
      <input {...register("eventCurrent",{required:true,valueAsNumber:true})} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
      
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        REGISTRATION STATUS
      </label>
      <div className="relative">
        <select {...register("registration_status",{required:true})} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option value="TRUE">Open</option>
          <option value="FALSE">Close</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <button className="event_btn" type="submit" onClick={()=>insertEvents()}>
      Submit
    </button>
    </div>
  </div>
</form>
     </div>
     <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Event Name</th>
          <th>Event Owner</th>
          <th>Event Ticket</th>
          <th>Registration Amount</th>
          <th>Registration Current</th>
          <th>Registration Status</th>
          <th colSpan="2">Details</th>
        </tr>
      </thead>
      <tbody>
        {events?.map((event,index)=>(
          <tr key={event.id}>
            <td>{index+1}</td>
            <td>{event.event_name}</td>
            <td>{event.event_owner}</td>
            <td>${event.event_price}</td>
            <td>{event.registration_amount}</td>
            <td>{event.registration_current}</td>
            <td>{event.registration_status?"Open":"Close"}</td>
            <td><button onClick={()=>deleteEvents(event.id)}>Delete</button></td>
            <td><button>Update</button></td>
          </tr>
        ))}
      </tbody>
     </table>
    </>
  )
}

export default App
