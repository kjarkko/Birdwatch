import axios from 'axios'
import {removeUnion} from './util'

const config = require('./config.json')

const loadLocal = (key) => 
  JSON.parse(localStorage.getItem(key)) || []
const setLocal = (obj, key) => 
  localStorage.setItem(key, JSON.stringify(loadLocal().concat(obj)))

const get = () => axios.get(config.urlGet)
const post = (obs) => axios.post(config.urlPost, obs)


/**
 * Save observation to server and localstorage
 * @param {*} obs - observation to be saved
 */
export const save = (obs) => {
  post(obs).then(() => {
    setLocal(obs, 'observations')
  }).catch(err => {
    console.log(err)
    setLocal(obs, 'todo') // not sent to server
  })
}

const work = (obs, setf) => {
  console.log('working')
  try { // fetch new ones
    const res = get()
    res.then(response => {
      const serverObs = response.data
      const newObs = removeUnion(serverObs, obs)// serverObs.filter(so => !obs.some(lo => equal(so,lo)))
      console.log('\nserver: ', serverObs, '\nnew:', newObs, '\nold: ', obs)
      setf(obs.concat(newObs), () => {this.props.updateItem(this.state)})
      setLocal(newObs, 'observations')
    })
  }catch(err){
    console.log('failed to get', err)
  }

  // send unsubmitted ones
  const unsent = loadLocal('todo')
  unsent.forEach(o => {
    post(o).then(res => {
      // remove from todo, add to observations
    }).catch(err => {
      // still can't send
    })
  })
}

/**
 * 
 */
export const getObservations = () => {
  const sentData = loadLocal('observations') || []
  const unsentData = loadLocal('todo') || []
  const data = sentData.concat(unsentData)
  return [data, get()]
} 

/**
 * Loads observations from localstorage and
 * periodically checks the server for new ones.
 * Also attempts to submit ones that have not been sent to the server
 * Needs to be called only once.
 * @param {*} obs - current observations
 * @param {*} setObs - set observations
 */
export const ServerWorker = (obs, setObs) => {
  console.log('worker: ', obs)
  setInterval(() => {
    console.log('interval: ',obs)
    work(obs, setObs)
  }, 5000)

}
