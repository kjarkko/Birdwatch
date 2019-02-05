import React, {useState,useEffect} from 'react'
import Observations from './observation'
import {ServerWorker, save, getObservations} from './database'
import Form from './form'
import TopBar from './topBar'
import {equal} from './util'


const App = () => {
  const [observations, setObservations] = useState([])
  const [view, setView] = useState(<p>welcome!</p>)

  const saveObservation = (obs) => {
    setObservations(observations.concat(obs))
    save(obs)
  }
  useEffect(() => {
    const [local, promise] = getObservations()
    promise.then(response => {
      response.data.forEach(o => {
        if(!local.some(l => equal(o,l)))
          local.concat(o)
      })
      setObservations(local)
    })
    ServerWorker(observations, setObservations)
  },[])
  
  const views = {
    main: {
      name: 'Main',
      create: () => {
        return <Observations obs={observations} />
      }
    },
    form: {
      name: 'Form',
      create: () => {
        return <Form save={saveObservation} />
      }
    }
  }
  return (
    <div>
      <TopBar views={views} currentView={view} setView={setView} />
      <div>
        {view}
      </div>
    </div>
  )
}

export default App