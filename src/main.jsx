import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// 라우터 페이지들 
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Root from './pages/Root.jsx'
import Products from './components/Products.jsx'
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Root/> , 
    errorElement : <NotFound/>,
    children : [
      { index : true, element: <Home/> },
      { path:'/products/new' , element: <Products/>},
    ]
  },

  
]);
    // { path:'/products' , element: <Products/> },
    // { path:'/products/:productId' , element: <ProductDetail/>}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
