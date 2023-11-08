import { Expenses } from '@prisma/client'

export const formatValue = (value: number, type: number, item: Expenses) => {
  if (value == 0 && type == 1) {
    return item.value > 0 ? (item.value *= -1) : item.value
  }

  if (value == 0 && type > 1) {
    return Math.abs(item.value)
  }

  if (value == 0 && item.type == 1 && item.value > 0) {
    return (item.value *= -1)
  }

  if (value == 0 && type == 0) {
    return item.value
  }

  return Math.abs(value)
}
