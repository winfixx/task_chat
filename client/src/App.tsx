import { useEffect } from 'react'

const ws = new WebSocket('ws://localhost:5000')

function App() {

  useEffect(() => {
    ws.onopen = (e) => {
      console.log('подключился')
    }

    ws.onmessage = (e) => {
      console.log('подключился')
    }
  })

  return (
    <div className="App">

    </div>
  )
}

export default App
