import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Auth from "./pages/Auth"
import BrandPage from './pages/BrandPage'

import NavBar from './components/NavBar.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthVerify from "./utils/AuthVerify"
import Faq from "./pages/Faq"
import Contact from "./pages/Contact"
import Blogs from "./pages/Blogs"
import News from "./pages/News"
import NewBlog from "./pages/NewBlog.jsx"
import Blog from "./pages/Blog.jsx"
import EditBlog from "./pages/EditBlog.jsx"

function App() {


  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<BrandPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:ownerId/:blogId" element={<Blog />} />
        <Route path="/blog/:ownerId/:blogId/edit" element={<EditBlog />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="/news" element={<News />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AuthVerify />
    </>
  )
}

export default App
