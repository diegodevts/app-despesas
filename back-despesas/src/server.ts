import express, { NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import { prismaClient } from './infra/database/prisma-client'
import cors from 'cors'

config()

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE')

  app.use(cors())
  next()
})

app.post('/add', async (req, res) => {
  const { description, value, type, user_id } = req.body

  const expense = await prismaClient.expenses.create({
    data: {
      description,
      value,
      type: !!+type ?? 0,
      user_id
    }
  })

  return res.send({ message: 'Despesa adicionada com sucesso' })
})

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      password
    }
  })

  return res.send({ message: 'user added with success', user })
})

app.get('/expenses', async (req: Request, res) => {
  const { user_id } = req.query

  const expenses = await prismaClient.expenses.findMany({
    where: { user_id: user_id as string },
    select: { description: true, type: true, value: true }
  })

  return res.json(expenses)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `)
})
