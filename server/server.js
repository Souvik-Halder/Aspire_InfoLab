const express=require('express');
const app=express();
const PORT =process.env.PORT||4000
const cookieSession=require('cookie-session')
const dBconfig=require('./config/dataBase')
const server=require('http').createServer(app);
const ACTIONS = require('./actions');

require('dotenv').config({path:'config/config.env'});
const passport=require('passport')
const cors=require('cors')
const errorMiddleware=require('./middlewares/error');
const authRoutes=require('./routes/authRoutes')
//Database
dBconfig();
const corsOptions={
    
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials:true
 
}
const io=require('socket.io')(server,{
  cors:{
      origin:'http://localhost:3000',
      methods:['GET','POST']
  }
});

app.use(cors(corsOptions))

//cookie session for passport
app.use(
    cookieSession({
      name: 'session',
      keys: ['profile', 'email'],
      maxAge: 24 * 60 * 60 * 100,
     
    
    })
  );
    
  app.use(passport.initialize());
  app.use(passport.session());
require('./passport');
app.use(express.json())


const productRoutes=require('./routes/medicineShop/productRoutes')
const userRoutes=require('./routes/userRoutes')
const roomRoutes=require('./routes/roomRoutes')
app.use('/api/v1',authRoutes)
app.use('/api/v1',productRoutes)
app.use('/api/v1',userRoutes)
app.use('/api/v1',roomRoutes);

const socketUserMap = {};

io.on('connection', (socket) => { 
    console.log('New connection', socket.id);
    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMap[socket.id] = user;

        // console.log('Map', socketUserMap);

        // get all the clients from io adapter
        // console.log('joining');
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        // console.log('All connected clients', clients, io.sockets.adapter.rooms);
        // Add peers and offers and all

        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user,
            });

            // Send myself as well that much msgs how many clients

            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMap[clientId],
            });
        });

        // Join the room
        socket.join(roomId);
    });

    // Handle Relay Ice event
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        });
    });

    // Handle Relay SDP
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });
 
    //Handle the mute/unmute
    socket.on(ACTIONS.MUTE,({roomId,userId})=>{
        console.log("mute",userId) 
        const clients=Array.from(io.sockets.adapter.rooms.get(roomId)||[]);
        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.MUTE,{
                peerId:socket.id,
                userId, 
            })
        })
    })

    socket.on(ACTIONS.UN_MUTE,({roomId,userId})=>{
        console.log("unmute",userId)
        const clients=Array.from(io.sockets.adapter.rooms.get(roomId)||[]);
        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.UN_MUTE,{
                peerId:socket.id,
                userId,
            })
        })
    })



    //Leaving the room
    const leaveRoom = () => {
        const { rooms } = socket;
        console.log('leaving', rooms);
        // console.log('socketUserMap', socketUserMap);
        Array.from(rooms).forEach((roomId) => {
            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );
            clients.forEach((clientId) => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMap[socket.id]?.id,
                });

                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMap[clientId]?.id,
                });

                socket.leave(roomId);
            });
        });

        delete socketUserMap[socket.id];

        // console.log('map', socketUserMap);
    };

    socket.on(ACTIONS.LEAVE, leaveRoom);

    socket.on('disconnecting', leaveRoom);
});

server.listen(PORT,(err)=>{
    console.log(`Server listening at the port ${PORT}`);
})

app.use(errorMiddleware) 
