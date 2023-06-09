import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWebRTC } from '../../hooks/useWebRTC';
import {useSelector} from 'react-redux'
import styles from './Room.module.css'
import { getRoom } from '../../https/index';
const Room = () => {
    const {id : roomId}=useParams();
    const [isMute, setIsMute] = useState(true);
    const {user}=useSelector(state=>state.auth); 
   
    const navigate=useNavigate();
  const [room, setRoom] = useState(null);
 
  useEffect(()=>{
    const fetchRoom=async()=>{
    const {data}=await getRoom(roomId);
   
    setRoom((prev)=>data)
    }
    fetchRoom();
  },[roomId])


  useEffect(() => {
   
   handleMute(isMute,user?._id)
  }, [isMute]);

    const {clients,provideRef,handleMute}=useWebRTC(roomId,user);
    
    const handManualLeave=()=>{
     navigate('/rooms')
    }
    const handleMuteClick=(clientId)=>{
      //it will simply change the upper isMute Variable after changing the upper variable the useEffect automatically change the component
      if(clientId!==user.id) return;
      //the upper code says that if the mike is not mine then we can't mute/unmute it
      //so if the client displys on the screen is not me then it simply return so that i can't mute or unmute them
    //   console.log('client mute ',clientId)
      setIsMute((isMute)=>!isMute); 

    }
  


  return (
    <div>
    <div className="container">
        <button onClick={handManualLeave} className={styles.goBack}>
            <img src="/images/arrow-left.png" alt="arrow-left" />
            <span>All voice rooms</span>
        </button>
    </div>
    <div className={styles.clientsWrap}>
        <div className={styles.header}>
    { room &&    <h2 className={styles.topic}>{room.topic}</h2>}
            <div className={styles.actions}>
                <button className={styles.actionBtn}>
                    <img src="/images/palm.png" alt="palm-icon" />
                </button>
                <button
                    onClick={handManualLeave}
                    className={styles.actionBtn}
                >
                    <img src="/images/win.png" alt="win-icon" />
                    <span>Leave quietly</span>
                </button>
            </div>
        </div>
        <div className={styles.clientsList}>
            {clients.map((client) => {
                return (
                    <div className={styles.client} key={client.id}>
                        <div className={styles.userHead}>
                            <img
                                className={styles.userAvatar}
                                src={client.avatar}
                                alt=""
                            />
                            <audio
                                autoPlay
                                ref={(instance) => {
                                    provideRef(instance, client.id);
                                }}
                            />
                            <button
                                onClick={() =>
                                    handleMuteClick(client.id)
                                }
                                className={styles.micBtn}
                            >
                                {client.muted ? (
                                    <img
                                        className={styles.mic}
                                        src="/images/mic-mute.png"
                                        alt="mic"
                                    />
                                ) : (
                                    <img
                                        className={styles.micImg}
                                        src="/images/mic.png"
                                        alt="mic"
                                    />
                                )}
                            </button>
                        </div>
                        <h4>{client.name}</h4>
                    </div>
                );
            })}
        </div>
    </div>
</div>

  )
}

export default Room
