import React,{useState,useEffect} from 'react'
import SingleConnection from './SingleConnection'
import { getAllChemistConnection } from '../../https';
const ChemistConnections = () => {
  const [chemistConn, setChemistConn] = useState([]);
  useEffect(() => {
  async function fetchChemistConnection(){
    const {data}=await getAllChemistConnection();
    setChemistConn(data.chemistConnections)


    
  }
  fetchChemistConnection()
    
  }, []);

  return (
    <div class="max-w-2xl my-8 mx-auto">
    <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 ">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold leading-none text-gray-900 ">
          Related Chemists
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
            { chemistConn &&
              chemistConn.map(chemist=>(
                <SingleConnection user={chemist}/>
              ))
            }
           
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default ChemistConnections