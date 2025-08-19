import {useState, useCallback} from 'react'
import {del} from '../../data/server'
import {Button} from '../../theme/daisyui'
import {useAuth} from '../../contexts'

export default function DelTest() {
  const {jwt, loggedUser} = useAuth()
  const [data, setData] = useState<object>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const deleteTest = useCallback(() => {
    if (loggedUser === undefined) {
      del('/test/1234')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => setErrorMessage(error.message))
    } else {
      del('/test/1234', jwt)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => setErrorMessage(error.message))
    }
  }, [jwt, loggedUser])

  return (
    <div className="mt-4 mb-4">
      <div className="flex justify-center mb-4">
        <Button onClick={deleteTest} className="btn-primary">
          DELETE ID 1234
        </Button>
      </div>
      <div className="mt-4 text-center">
        <p>data: {JSON.stringify(data, null, 2)}</p>
        {errorMessage && <p>error: {errorMessage}</p>}
      </div>
    </div>
  )
}
