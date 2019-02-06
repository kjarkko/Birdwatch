import React, {useState, useEffect} from 'react'
import {Search, initialSort} from './search'
import database from './database'
import {timeToString} from './util'



const Observation = ({obs}) => <div class='container m-2 border border-primary border-primary bg-light'>
  <ul class='list-inline'>
    <li class='list-inline-item'><h3>{obs.species}</h3></li>
    <li class='list-inline-item'><i>{obs.rarity}</i></li>
  </ul>
  <ul class='list-inline'>
    <li class='list-inline-item'>{timeToString(obs.date)},</li>
    <li class='list-inline-item'>Location: {obs.location}</li>
  </ul>
  <p class='text-justify'><b>Notes: </b>{obs.notes}</p>
</div>

const Observations = () => {
  const [obs, setObs] = useState(database.load())
  const [sort, setSort] = useState(initialSort)

  useEffect(() => {
    const interval = setInterval(() => {
      setObs(database.load())
    },5000)
    return () => {clearInterval(interval)}
  }, [])
  return (
    <div class='container'>
      <Search set={setSort} />
      {sort.fn(obs).map(o => <Observation key={obs.id} obs={o} />)}
    </div>
  )
}


export default Observations
