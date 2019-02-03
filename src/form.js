import React from 'react'
import {geolocation, timestamp} from './util'

const Form = ({birds, setBirds}) => {
  const submit = (species, rarity, notes) => {
    const bird = {
      id: (birds.length + 1),
      date: timestamp(),
      location: geolocation(),
      species: species,
      rarity: rarity,
      notes: notes
    }

    setBirds(birds.concat(bird))
  }
	return (
    <div>
      <form>
        <input type='text' name='species' />
        <input type='text' name='rarity'  />
        <input type='text' name='notes'   />
        <button onClick={submit} > submit  </button>
        <button onClick={()=>{}} > discard </button>
      </form>
    </div>
  )
}

export default Form