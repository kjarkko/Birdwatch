import React, {useState} from 'react'
import Observations from './observation'
import Form from './form'
import TopBar from './topBar'

const App = () => {
  const [view, setView] = useState(<p>welcome!</p>)
  
  const views = {
    main: {
      name: 'Main',
      create: () => {
        return <Observations />
      }
    },
    form: {
      name: 'Form',
      create: () => {
        return <Form redirect={() => {setView(views.main.create())}} />
      }
    }
  }
  return (
    <div>
      <TopBar views={views} currentView={view} setView={setView} />
      {view}
    </div>
  )
}

export default App