
import { Route, Routes } from 'react-router'
import App from '../App.jsx'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App/>} />
    </Routes>
  )
}
