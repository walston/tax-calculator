import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import FederalIncomeTax from './pages/calculators/FederalIncomeTax.tsx'
import NoPage from './pages/404'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="tax-calculator/" element={<Layout/>}>
          <Route index element={<FederalIncomeTax/>}/>
        </Route>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
