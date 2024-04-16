import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Index from './pages/Index'
import NoPage from './pages/404'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Index/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App