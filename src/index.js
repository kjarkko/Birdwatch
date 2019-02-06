import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import database from './database'

database.init()
ReactDOM.render(<App />, document.getElementById('root'))