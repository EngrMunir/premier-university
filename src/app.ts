import express, { Application, Request, Response } from 'express'
import cors from 'cors'
export const app:Application = express()
const port = 3000

// parsers
app.use(express.json())
app.use(cors())

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})