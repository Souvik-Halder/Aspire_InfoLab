import React from "react";
import { sendConnectionRequest } from "../../https";

const Data = {
  name: "Neil Sims",
  expericence: "3+ years experience",
  img: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
};

const SingleConnection = ({user}) => {
  async function connectionRequestHandler(userId){ 
    const {data}=await sendConnectionRequest(userId);
    console.log(data)
  }
  return (
    <div key={user._id} className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.name}
        </p>
        <p className="text-sm text-gray-500 truncate ">
          {user.role}
        </p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900">
        <button onClick={()=>connectionRequestHandler(user._id)} className="hover:border-gray-900 hover:bg-gray-300 delay-100 duration-100 border border-gray-500 rounded-full text-gray-700 inline-flex px-3 py-1 text-md mr-3">
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
          Connect
        </button>
      </div>
    </div>
  );
};

export default SingleConnection;
