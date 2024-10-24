import { Button, Form } from 'react-bootstrap'
import { useAppDispatch } from '../hooks/redux'
import { FormEventHandler, useState } from 'react'
import { usersAction } from '../stores/reducers/userSlice'
import { useNavigate } from 'react-router-dom'

type Props = {}

const AuthorizePage = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [userName, setUserName] = useState('')
  const [validated, setValidated] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }

    dispatch(usersAction.setUser({ userName }))
    navigate('/')
  }

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Имя</Form.Label>
            <Form.Control value={userName} onChange={e => setUserName(e.target.value)} type="text" placeholder="Введите имя" required />
            <Form.Control.Feedback type="invalid">
              Пожалуйста введите имя
            </Form.Control.Feedback>
          </Form.Group>

          <Button className='mt-2 w-100' variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default AuthorizePage