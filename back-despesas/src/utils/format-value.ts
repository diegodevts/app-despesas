import { Expenses } from '@prisma/client'

export const formatValue = ({
  number,
  type,
  item
}: {
  number: number
  type: number
  item: Expenses
}) => {
  if (number == 0) {
    console.log(item.value)
    if (item.value < 0 && type == 0) {
      return item.value
    }
    if (type == 1) {
      return Math.abs(item.value)
    }
    return (item.value *= -1)
  }

  if (number && type == 1) {
    return number
  }
  return (number *= -1)
}
