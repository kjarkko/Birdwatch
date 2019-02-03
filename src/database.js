import axios from 'axios'

const config = require('./config.json')

/**
 * Get data from server
 * @param {Function} filter - filter results
 */
export const getServer = (filter = (obj) => true) => {
  let data = []
  axios.get(config.urlGet).then(response => {
    console.log(response)
    data = response.data.observations.filter(filter)
  }).catch(err => console.log(err))
  return data
}

/**
 * Post data to server
 * @param {*} obj 
 */
export const postServer = (obj) => {
  axios.post(config.urlPost, obj).then(res => console.log(res))
}

/**
 * Add item to local storage
 * @param {*} obj 
 */
export const setLocal = (obj) => {
  localStorage.setItem('observations',  JSON.stringify(loadLocal().concat(obj)))
}

/**
 * Load items from local storage
 */
export const loadLocal = () => {
  const stub = [
    {
      "id": 0,
      "name": "dodo",
      "date": 0,
      "notes": "dead"
    },
    {
      "id": 1,
      "name": "T-Rex",
      "date": 0,
      "notes": "also dead"
    }
  ]
  return stub
  //JSON.parse(localStorage.getItem('observations'))
}

//export default {getServer, postServer, setLocal, loadLocal}