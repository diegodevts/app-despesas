import { Prisma, Expenses } from '@prisma/client'

export interface ExpenseRepository {
  add(data: Prisma.ExpensesUncheckedCreateInput): Promise<Expenses>
  findMany(user_id: string): Promise<Expenses[]>
  update(
    data: Partial<Prisma.ExpensesUncheckedUpdateInput>,
    id: string
  ): Promise<Expenses>
  remove(id: string): Promise<void>
  find(id: string): Promise<Expenses | null>
}
