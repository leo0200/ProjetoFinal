import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "../Pages/Login/index"
import Cambio from "../Pages/cambio/index"


function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cambio' element={<Cambio />} />
                
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas