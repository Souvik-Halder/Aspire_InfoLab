import React,{useState,useEffect} from 'react'
import SingleConnection from './SingleConnection'
import { acceptConnection, getAllDoctorConnection, getAllRequets } from '../../https';
import { useNavigate } from 'react-router-dom';
const AllRequests = () => {
  const navigate=useNavigate();
  const [requests, setRequests] = useState([]);
  useEffect(() => {
  async function fetchPatientConnection(){
    const {data}=await getAllRequets();
    console.log(data);
    setRequests(data.connectionRequests)

    
  }
  fetchPatientConnection()
    
  }, []);
  async function acceptRequestHandler(requestId){ 
   const {data}=await acceptConnection(requestId);
   console.log(data);
  }
  return (
    <div class="max-w-2xl my-8 mx-auto">
    <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 ">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold leading-none text-gray-900 ">
         Your Connection Requests
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
            { requests &&
              requests.map(user=>(
             
            
                  <div key={user._id} className="flex items-center my-4 space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate ">
                        {user.from.role}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      <button onClick={()=>acceptRequestHandler(user._id)} className="hover:border-gray-900 hover:bg-gray-300 delay-100 duration-100 border border-gray-500 rounded-full text-gray-700 inline-flex px-3 py-1 text-md mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Accept
                      </button>
                    </div>
                  </div>
                
              ))
            }
           
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default AllRequests