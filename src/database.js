import axios from 'axios'
import {removeUnion} from './util'

const config = require('./config.json')

const loadLocal = (key) => 
  JSON.parse(localStorage.getItem(key)) || []
const setLocal = (obj, key) => 
  localStorage.setItem(key, JSON.stringify(loadLocal(key).concat(obj)))
const get = () => axios.get(config.URL)
const post = (obs) => axios.post(config.URL, obs)

let observations = loadLocal('observations').concat(loadLocal('todo'))

const work = () => {
  try { // fetch new ones
    get().then(response => {
      const newObs = removeUnion(response.data, observations)
      if(newObs.length > 0){
        console.log('found new: ', newObs)
        observations = observations.concat(newObs)
        setLocal(newObs, 'observations')
      }
    })
  }catch(err){
    console.log('failed to get', err)
  }

  loadLocal('todo').forEach(o => { // send unsubmitted ones
    post(o).then(res => {
      setLocal(o, 'observations')
      setLocal(loadLocal('todo').remove(o), 'todo')
    }).catch(err => { /* still can't send */ })
  })
}

/**
 * Loads observations from localstorage and
 * periodically checks the server for new ones.
 * Also attempts to submit ones that have not been sent to the server
 * Needs to be called only once.
 * @param {*} obs - current observations
 * @param {*} setObs - set observations
 */
const worker = () => {
  work()
  setInterval(() => {
    work()
  }, 5000)
}

/**
 * Save observation to server and localstorage
 * @param {*} obs - observation to be saved
 */
const save = (obs) => {
  observations.push(obs)
  post(obs).then(() => {
    setLocal(obs, 'observations')
  }).catch(err => {
    console.log(err)
    setLocal(obs, 'todo') // not sent to server
  })
}

const getObservations = () => observations

const database = {
  init: worker,
  save: save,
  load: getObservations 
}

export default database