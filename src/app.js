import React, {useState} from 'react'
import Observations from './observation'
import Form from './form'
import TopBar from './topBar'

const App = () => {
  const [view, setView] = useState((<div class="jumbotron">
      <h1 class="display-4">Welcome!</h1>
      <p class="lead">Birdwatch is an application for tracking bird observations made by you and other people.</p>
      <hr class="my-4"/>
      <p>Get started by clicking on 'All observations', and add your own by clicking 'Create observation'</p>
    </div>)
  )
  
  const views = {
    main: {
      name: 'All observations',
      create: () => {
        return <Observations />
      }
    },
    form: {
      name: 'Create observation',
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