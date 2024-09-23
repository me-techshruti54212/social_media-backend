const express=require("express");
const userRouter = require("./routes/userRoute");
const app=express();
require("dotenv").config()

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.set('socketio', io);
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id); 

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id); 
  });
});
const port=process.env.PORT
const {connectDb} =require("./config/db")
const cors=require("cors")
const bodyParser = require("body-parser");
app.use(express.json())
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
connectDb()

app.get('/', (req, res) => {
    res.send('Hello World!');
  
  });
app.use("/",userRouter)


server.listen(port,()=>console.log(`Server started at port ${port}`))