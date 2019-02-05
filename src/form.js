import React, {useState} from 'react'
import {addObservation} from './database'
import {geolocation, timestamp, rarityOpts} from './util'

const Form = ({save}) => {
  const [species, setSpecies] = useState('')
  const [rarity, setRarity] = useState('Rarity')
  const [notes, setNotes] = useState('')

  const submit = event => {
    event.preventDefault()
    console.log(species)
    const newObs = {
      //id: (birds.length + 1),
      date: timestamp(),
      location: geolocation(),
      species: species,
      rarity: rarity,
      notes: notes
    }
    save(newObs)
  }

  // handlers for value changes
  const hsc = ev => setSpecies(ev.target.value)
  const hrc = ev => setRarity(ev.target.value)
  const hnc = ev => setNotes(ev.target.value)

	return (
    <div class='container'>
      <form onSubmit={submit}>
        <input value={species} onChange={hsc} type='text' class='form-control m-2' placeholder='Species' id='species' />
        <select onChange={hrc} class="custom-select m-2" id='rarity'>
          <option defaultValue>{rarity}</option>
          {rarityOpts.map(r => <option key={r} value={r}> {r} </option>)}
        </select>
        <textarea onChange={hnc} class='form-control m-2' placeholder='notes' id='notes'  />
        <button class='btn m-2 btn-success btn-block' type='submit'> submit  </button>
        <button class='btn m-2 btn-danger btn-block'> discard </button>
      </form>
    </div>
  )
}

export default Form