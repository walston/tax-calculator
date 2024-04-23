import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import FederalIncomeTax from './pages/calculators/FederalIncomeTax.tsx'
import NoPage from './pages/404'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<FederalIncomeTax/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
