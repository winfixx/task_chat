import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import './reset.css'
import setupStore from './stores/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={setupStore}>
    <App />
  </Provider>
)
