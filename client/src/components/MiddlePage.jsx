import React from 'react'
import Card from './Card'
import user from '../assets/user.jfif'
import doctor from '../assets/doctor.jfif'
import chemist from '../assets/chemist.jpg'

const MiddlePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <div className="grid grid-cols-3 gap-x-56">

                <div className="">
                    <Card name='User' image={user} value="patient" />
                </div>
                <div className="">
                    <Card name='Doctor' image={doctor} value="doctor"/>
                </div>
                <div className="">
                    <Card name='Chemist' image={chemist} value="chemist" />
                </div>
            </div>
        </div>
    )
}

export default MiddlePage