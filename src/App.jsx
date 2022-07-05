import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddProduct from './components/add/AddProduct'
import ListProduct from './components/list/ListProduct'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<ListProduct />} />
          <Route path="add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
