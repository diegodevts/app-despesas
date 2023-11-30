import { Expenses, Prisma, User } from '@prisma/client'
import { ExpenseRepository } from '../expense-repository'
import { prismaClient } from '../../database/prisma-client'
import { NotFoundError } from '../../errors/not-found'
import { formatValue } from '../../util/format-value'

export class ExpensePrismaRepository implements ExpenseRepository {
  async add({
    type,
    user_id,
    description,
    value
  }: Prisma.ExpensesUncheckedCreateInput): Promise<Expenses> {
    const expense = await prismaClient.expenses.create({
      data: {
        description: +type === 3 ? 'Salário' : description,
        value: type > 1 ? +value : (value *= -1),
        type: +type,
        user_id
      }
    })

    return expense
  }

  async findMany({
    user_id,
    month
  }: {
    user_id: string
    month: string
  }): Promise<Expenses[]> {
    const currentMonth = new Date().getMonth()

    const expenses = await prismaClient.expenses.findMany({
      where: { user_id }
    })

    const expensesByMonth = expenses.filter((expense) =>
      month
        ? expense.created_at.getMonth() == +month
        : expense.created_at.getMonth() == currentMonth
    )

    return expensesByMonth
  }

  async update(
    {
      user_id,
      type,
      description,
      value
    }: Partial<Prisma.ExpensesUncheckedUpdateInput>,
    id: string
  ): Promise<Expenses> {
    const item = await prismaClient.expenses.findUnique({ where: { id } })

    if (!item) {
      throw new NotFoundError('Item')
    }

    const expense = await prismaClient.expenses.update({
      where: { user_id: user_id as string, id },
      data: {
        description: description ? description : item.description,
        value: formatValue(value ? +value : 0, type ? +type : 0, item),
        type: type ? +type : item.type
      }
    })

    return expense
  }

  async remove(id: string): Promise<void> {
    await prismaClient.expenses.delete({ where: { id } })
  }

  async find(id: string): Promise<Expenses | null> {
    const expense = await prismaClient.expenses.findUnique({ where: { id } })

    return expense
  }
}
