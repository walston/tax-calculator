import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import IncomeTaxFederal from './pages/calculators/IncomeTaxFederal'
import NoPage from './pages/404'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IncomeTaxFederal/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
