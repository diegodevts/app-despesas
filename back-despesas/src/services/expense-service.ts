import { Prisma } from '@prisma/client'
import { ExpenseRepository } from '../repositories/expense-repository'
import { NotFoundError } from '../errors/not-found'

export class ExpenseService {
  constructor(private repository: ExpenseRepository) {}

  async add(data: Prisma.ExpensesUncheckedCreateInput) {
    const expense = await this.repository.add(data)

    return { expense }
  }

  async findMany(user_id: string) {
    const expenses = await this.repository.findMany(user_id)

    return expenses
  }

  async update(data: Partial<Prisma.ExpensesUncheckedUpdateInput>, id: string) {
    const updatedExpense = await this.repository.update(data, id)

    return updatedExpense
  }

  async remove(id: string) {
    await this.repository.remove(id)
  }
}
