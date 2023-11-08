import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import './items.css'
import { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import MyContext from '../../contexts/items-context'
import { removeExpense, updateExpense } from '../../config/http'
import { ToastContainer } from 'react-toastify'

const Items = () => {
  const { data, search, notifySuccess } = useContext(MyContext)
  const { register, handleSubmit, setValue, reset } = useForm()
  const [items, setItems] = useState({})

  const onSubmit = async (data) => {
    const response = await updateExpense(data, items.id)
    notifySuccess(response)

    setItems({})
    reset({ description: '', value: '', type: '' })
    await search()
  }

  const handleDelete = async (id) => {
    const response = await removeExpense(id)

    notifySuccess(response)

    await search()
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <>
      <div className="row charts mt-4">
        <thead>
          <th className="text-start">
            <small>Descrição</small>
          </th>
          <th className="text-start">
            <small>Valor</small>
          </th>
          <th className="text-start">
            <small>Tipo</small>
          </th>
          <th className="text-center">
            <small>Ações</small>
          </th>
        </thead>
        <table>
          <hr width="100%" />
          {data.map((item) => {
            return (
              <div className="col-md-12">
                <tbody>
                  <td className="text-start">
                    <input
                      className="item-update"
                      type="text"
                      placeholder="Nova descrição"
                      {...register('description')}
                      onChange={(e) => setValue('description', e.target.value)}
                      style={{
                        visibility:
                          items.description && items.id === item.id
                            ? 'visible'
                            : 'hidden',
                        position: 'absolute',
                        width: '160px',
                        height: '23px',
                        outline: 'none',
                        borderRadius: '4px'
                      }}
                    />
                    <small>
                      <p>{item.description}</p>
                    </small>
                  </td>

                  <td className="text-start">
                    <input
                      className="item-update"
                      {...register('value')}
                      type="number"
                      onChange={(e) => setValue('value', e.target.value)}
                      placeholder="Novo valor"
                      style={{
                        visibility:
                          typeof items.value == 'number' && items.id === item.id
                            ? 'visible'
                            : 'hidden',
                        position: 'absolute',
                        width: '148px',
                        height: '23px',
                        borderRadius: '4px'
                      }}
                    />
                    <small>{item.value}</small>
                  </td>

                  <td className="text-start">
                    <select
                      aria-label="Default select example"
                      defaultChecked={item.type}
                      {...register('type')}
                      onChange={(e) => setValue('type', e.target.value)}
                      style={{
                        visibility: items.id === item.id ? 'visible' : 'hidden',
                        position: 'absolute',
                        zIndex: '1',
                        width: '148px',
                        height: '23px'
                      }}
                    >
                      <option value="3">Salário</option>
                      <option value="2">Entrada</option>
                      <option value="1">Saida</option>
                    </select>
                    <FontAwesomeIcon
                      style={{
                        visibility: item.type === 3 ? 'visible' : 'hidden',
                        position: 'absolute',
                        height: '20px'
                      }}
                      className="money-bill"
                      icon={icon({
                        name: 'money-bill-1',
                        style: 'solid'
                      })}
                      color="#198754"
                    />

                    <FontAwesomeIcon
                      style={{
                        visibility: item.type === 2 ? 'visible' : 'hidden',
                        position: 'absolute'
                      }}
                      className="arrow-up"
                      icon={icon({ name: 'arrow-up', style: 'solid' })}
                      color="#1ab424"
                    />

                    <FontAwesomeIcon
                      style={{
                        visibility: item.type === 1 ? 'visible' : 'hidden',
                        position: 'absolute'
                      }}
                      className="arrow-down"
                      icon={icon({ name: 'arrow-down', style: 'solid' })}
                      color="#d80808"
                    />
                  </td>

                  <td
                    className="text-center"
                    style={{
                      visibility: item ? 'visible' : 'hidden'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        visibility:
                          items.description && items.id === item.id
                            ? 'visible'
                            : 'hidden'
                      }}
                    >
                      <button
                        className="btn-cancel"
                        onClick={() => setItems({})}
                        style={{
                          visibility:
                            items.description && items.id === item.id
                              ? 'visible'
                              : 'hidden'
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        className="btn-save"
                        onClick={() =>
                          handleSubmit(async (data) => await onSubmit(data))()
                        }
                        style={{
                          visibility:
                            items.description && items.id === item.id
                              ? 'visible'
                              : 'hidden'
                        }}
                      >
                        Salvar
                      </button>
                      <ToastContainer autoClose={2000} />
                    </div>

                    <button
                      className="btn-actions"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon
                        icon={icon({ name: 'trash', style: 'solid' })}
                      />
                    </button>

                    <button className="btn-actions">
                      <FontAwesomeIcon
                        onClick={() => setItems(item)}
                        icon={icon({
                          name: 'pen-to-square',
                          style: 'solid'
                        })}
                      />
                    </button>
                  </td>
                </tbody>
              </div>
            )
          })}
        </table>
      </div>
    </>
  )
}

export default Items
