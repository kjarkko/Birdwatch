import React, {useState} from 'react'
import Birds from './bird'
import {loadLocal, getServer} from './database'
import Form from './form'
import TopBar from './topBar'

const App = () => {
  const [birds, setBirds] = useState(loadLocal().concat(getServer()))
  const views = {
    main: {
      name: 'Main',
      html: <Birds birds={birds} />
    },
    form: {
      name: 'Form',
      html: <Form birds={birds} setBirds={setBirds} />
    }
  }
  const [view, setView] = useState(views.main)

  return (
    <div>
      <TopBar views={views} currentView={view} setView={setView} />
      {view.html}
    </div>
  )
}

export default App