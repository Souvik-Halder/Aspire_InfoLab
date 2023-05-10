import React,{useState,useEffect} from 'react'
import SingleConnection from './SingleConnection'
import { getAllPatientConnection } from '../../https';
import DoctorConnections from './DoctorConnections'
import ChemistConnections from './ChemistConnections';
import { Link } from 'react-router-dom';
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
    <div class="max-w-2xl my-8 mx-auto mt-24">
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
<div className=" flex gap-20 justify-center pr-52">

<Link to='/allrequests'>
<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ml-4">All Requests</button>
</Link>
<Link to='/acceptedRequests'>
<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ml-4">Accepted Requests</button>
</Link>
</div>

 </>

  )
}

export default Connections