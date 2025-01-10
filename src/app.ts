import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './modules/student/student.route'
import { UserRoutes } from './modules/user/user.route'
export const app:Application = express()

// parsers
app.use(express.json())
app.use(cors());

// application routes

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})