import React from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from '../Frontend/components/Header/Home';
import About from '../About';
import Contect from './Contact/Contect';
import Todos from "../Frontend/Todos"



export default function index() {
  return (
    <>
      <Header />
      <main>

        <Routes>
          <Route path='/'>

            <Route index element={<Home />} />
            <Route path='todos'element= {<Todos />} />
            <Route path='/about'element= {<About />} />
            <Route path='/contact'element= {<Contect />} />

          </Route>

        </Routes>
      </main>
      <Footer />
    </>
  )
}
