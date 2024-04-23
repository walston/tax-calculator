import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Index from './pages/Index'
import FederalIncomeTax from './pages/calculators/FederalIncomeTax.tsx'
import NoPage from './pages/404'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Index/>}/>
          <Route path="federal-income-tax-calculator" element={<FederalIncomeTax/>}/>
        </Route>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
