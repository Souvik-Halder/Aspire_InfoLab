import React,{useState,useEffect} from 'react'
import SingleConnection from './SingleConnection'
import { getAllPatientConnection } from '../../https';
import DoctorConnections from './DoctorConnections'
import ChemistConnections from './ChemistConnections';
const Connections = () => {
  const [patientConn, setPatientConn] = useState([]);
  useEffect(() => {
  async function fetchPatientConnection(){
    const {data}=await getAllPatientConnection();
    setPatientConn(data.patientConnections);

    
  }
  fetchPatientConnection()
    
  }, []);

  return (
 <>
    <div class="max-w-2xl my-8 mx-auto">
    <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 ">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold leading-none text-gray-900 ">
          Related Patients
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
            { patientConn &&
              patientConn.map(patient=>(
                <SingleConnection user={patient}/>
              ))
            }
           
          </li>
        </ul>
      </div>
    </div>
  </div>
<DoctorConnections/>
<ChemistConnections/>
 </>

  )
}

export default Connections