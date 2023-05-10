import React from 'react'

const DisesCard = (props) => {
    let percentage = props.per;
    let colour
   
        if (percentage < 30){

            colour = "bg-green-600";
        }
        else if (percentage > 30 && percentage <= 60){

            colour = "bg-yellow-600";
        }
        
        else {

            colour = "bg-red-600";
        }

    

    return (

        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{props.name}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <p className='font-bold'>Risk</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 my-4 ">
                <div class={`${colour} h-2.5 rounded-full`} style={{ width: `${props.per}%` }}></div>
            </div>

            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                Read more
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>

    )
}

export default DisesCard