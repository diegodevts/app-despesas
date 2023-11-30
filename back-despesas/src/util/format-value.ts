import { Expenses } from '@prisma/client'

export const formatValue = (value: number, type: number, item: Expenses) => {
  console.log(value, type, item)

  //se o valor for 0 e o tipo 0, retornar item.value baseado no item.type
  if (value == 0 && type == 0) {
    return item.type == 1 ? (item.value *= -1) : Math.abs(item.value)
  }

  if (value == 0 && type == 1) {
    return item.value < 0 ? item.value : (item.value *= -1)
  }

  if (value == 0 && type > 1) {
    return Math.abs(item.value)
  }
  //se o valor for alguma coisa e o tipo 0, retornar valor baseado no item.type
  if (value != 0 && type == 0) {
    return item.type == 1 ? (value *= -1) : Math.abs(value)
  }
  //se o valor for aluma coisa e o tipo 1, retornar valor negativo
  if (value != 0 && type == 1) {
    return value < 0 ? value : (value *= -1)
  }
  //se o valor for alguma coisa e o tipo maior q 1, retornar valor positivo
  if (value != 0 && type > 1) {
    return Math.abs(value)
  }
}
