import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth_route.js'
import hotelsRouter from './routes/hotels_route.js'
import roomsRouter from './routes/rooms_route.js'
import usersRouter from './routes/users_route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app  = express()
dotenv.config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('==> Connected to MongoDb successfully')
  } catch (err) {
    throw err
  }
}
mongoose.connection.on('disconnected', () => {
  console.log('==> Disconnected from Mongo')
})

// middlewares 
app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/users', usersRouter)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorMessage,
    message: errorMessage,
    stack: err.stack
  })
})

const port = process.env.APP_PORT
const host = process.env.APP_HOST
app.listen(port, () => {
  connectDB()
  console.log(`=> Connected successfully to server on ${host}:${port}`)
})
