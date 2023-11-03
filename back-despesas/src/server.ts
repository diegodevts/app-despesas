import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { prismaClient } from './infra/database/prisma-client'
import cors from 'cors'
import { formatValue } from './utils/format-value'

const app = express()
const PORT = process.env.PORT ?? 3232

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
  let { description, value, type, user_id } = req.body
  const message =
    type == '1'
      ? 'Receita atualizada com sucesso'
      : 'Despesa atualizada com sucesso'

  await prismaClient.expenses.create({
    data: {
      description,
      value: type === '1' ? +value : (value *= -1),
      type: !!+type ?? 0,
      user_id
    }
  })

  return res.send({ message })
})

app.delete('/remove/:id', async (req, res) => {
  let { id } = req.params

  await prismaClient.expenses.delete({
    where: {
      id
    }
  })

  return res.send({ message: 'Item deletado com sucesso' })
})

app.put('/update/:id', async (req, res) => {
  let { description, value, type, user_id } = req.body
  const { id } = req.params

  const item = await prismaClient.expenses.findUnique({ where: { id } })
  const message =
    type == '1'
      ? 'Receita atualizada com sucesso'
      : 'Despesa atualizada com sucesso'

  if (!item) {
    return
  }
  console.log(type, item)
  await prismaClient.expenses.update({
    where: { user_id, id },
    data: {
      description: description ? description : item?.description,
      value: formatValue({ number: +value, type: +type, item }),
      type: !!+type ?? false
    }
  })

  return res.send({ message })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const hasUser = await prismaClient.user.findUnique({
    where: { email, password }
  })

  if (!hasUser) {
    return res.status(401).send({ message: 'Incorrect credentials' })
  }

  return res.status(200).send({ message: 'Logged' })
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
    where: { user_id: user_id as string }
  })

  return res.json(expenses)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `)
})
