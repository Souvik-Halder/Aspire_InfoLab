import React,{useState,useEffect} from 'react'
import SingleConnection from './SingleConnection'
import { getAllDoctorConnection } from '../../https';
const Connections = () => {
  const [doctorConn, setDoctorConn] = useState([]);
  useEffect(() => {
  async function fetchPatientConnection(){
    const {data}=await getAllDoctorConnection();
    setDoctorConn(data.doctorConnections)


    
  }
  fetchPatientConnection()
    
  }, []);

  return (
    <div class="max-w-2xl my-8 mx-auto">
    <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 ">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold leading-none text-gray-900 ">
          Related Doctors
        </h3>
        <a
          href="#"
          class="text-sm font-medium text-blue-600 hover:underline ">
          View all
        </a>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <li class="py-3 sm:py-4">
            { doctorConn &&
              doctorConn.map(doctor=>(
                <SingleConnection user={doctor}/>
              ))
            }
           
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Connections