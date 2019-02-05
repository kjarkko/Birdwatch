import React, {useState} from 'react'
import Search from './search'

const Observation = ({obs}) => <div class='container'>
  <ul class='list-inline'>
    <li class='list-inline-item'><h3>{obs.species}</h3></li>
    <li class='list-inline-item'><i>{obs.rarity}</i></li>
  </ul>
  <ul class='list-inline'>
    <li class='list-inline-item'>{obs.date},</li>
    <li class='list-inline-item'>Location: {obs.location}</li>
  </ul>
  <p class='text-justify'><b>Notes: </b>{obs.notes}</p>
</div>

const Observations = ({obs}) => {
  const [results, setResults] = useState(obs)

  return (
    <div class='container'>
      <Search observations={obs} results={results} setResults={setResults} />
      {results.map(obs => <Observation key={obs.id} obs={obs} />)}
    </div>
  )
}

export default Observations
