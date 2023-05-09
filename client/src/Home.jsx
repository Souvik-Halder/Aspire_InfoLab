import React from 'react'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <div className="grid grid-cols-3 gap-72">

                <div className=" p-20 bg-green-400 rounded-xl">
                    <div className="bg-blue-500 rounded-full h-24 w-24 flex items-center justify-center text-white text-lg font-bold">User</div>
                </div>
                <div className=" p-20 bg-green-400 rounded-xl">
                    <div className="bg-blue-500 rounded-full h-24 w-24 flex items-center justify-center text-white text-lg font-bold">Doctor</div>
                </div>
                <div className=" p-20 bg-green-400 rounded-xl">
                    <div className="bg-blue-500 rounded-full h-24 w-24 flex items-center justify-center text-white text-lg font-bold">Chemist</div>
                </div>
            </div>
        </div>
    )
}

export default Home