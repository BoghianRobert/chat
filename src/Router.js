import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

const Router = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route exact path="/" element={ <Home />} />
            </Routes>
        </React.Fragment>
    )
}

export default Router