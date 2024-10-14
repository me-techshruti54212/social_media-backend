const express=require("express");
const userRouter = require("./routes/userRoute");
const app=express();
require("dotenv").config()

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
  //  origin: ['https://social-media-frontend-flame.vercel.app', 'http://localhost:3000'],
    origin:'https://social-media-frontend-flame.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true,
    
  },
  transports: ['websocket','polling']
});
app.set('socketio', io);
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id); 

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id); 
  });
});


const port=process.env.PORT || 8000
const {connectDb} =require("./config/db")
const cors=require("cors")
const bodyParser = require("body-parser");
app.use(express.json())
app.use(bodyParser.json());
app.use(cors({
//  origin: ['https://social-media-frontend-flame.vercel.app', 'http://localhost:3000'],
  origin:'https://social-media-frontend-flame.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ["Content-Type"],

}));
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; font-src https://social-media-backend-two-murex.vercel.app;");
//   next();
// });
connectDb()

app.get('/', (req, res) => {
    res.send('Hello World!');
  
  });
app.use("/",userRouter)

server.listen(port,()=>console.log(`Server started at port ${port}`))