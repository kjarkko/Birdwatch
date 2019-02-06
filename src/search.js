import React, {useState} from 'react'
import {timeToString} from './util'

const filter = (find) => (obs) => (
  (timeToString(obs.date).includes(find)) || (obs.location.includes(find)) ||
  (obs.species.includes(find)) || (obs.rarity.includes(find)) ||
  (obs.notes.includes(find))
)

const compare = (crit, asc) => (a, b) => {
  let cmp
  if(crit !== 'date')
    cmp = a[crit].localeCompare(b[crit])
  else
    cmp = a[crit] - b[crit]
  return asc ? cmp : -cmp
}

const createSortFn = (term, criteria, ascending) => ({
  fn: (obs) => obs
    .filter(filter(term))
    .sort(compare(criteria, ascending))
})

export const initialSort = createSortFn('', 'date', true)

export const Search = ({set}) => {

  const update = (term,crit,asc) => {set(createSortFn(term,crit,asc))}

  const possibleCriteria = ['date', 'species', 'rarity', 'location']
  const [criteria, setCriteria] = useState('date')
  const [ascending, setAscending] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // handlers for value changes
  const hcc = event => { // sort criteria
    const crit = event.target.value
    console.log(crit)
    setCriteria(crit)
    update(searchTerm, crit, ascending)
  }
  const hac = event =>{ // ascending or descending
    const asc = !ascending
    console.log(asc)
    setAscending(asc)
    update(searchTerm, criteria, asc)
  }
  const hsc = event => { // search filter
    const src = event.target.value
    console.log(src)
    setSearchTerm(src)
    update(src,criteria, ascending)
  }

  return (
    <div class='container'>
      <ul class='list-inline'>

        <li class='list-inline-item m-2'>
          <button class='btn btn-secondary' style={{width: '110px',textAlign: 'center'}} onClick={hac}>{ascending?'Ascending':'Descending'}</button>
        </li>

        <li class='list-inline-item m-2'>
          <p></p>
          <select onChange={hcc} class="custom-select">
            {possibleCriteria.map(c => <option key={c}> {c} </option>)}
          </select>
        </li>

        <li class='list-inline-item m-2'>
          <input onChange={hsc} value={searchTerm} class='form-control' placeholder='Search...'/>
        </li>

      </ul>
    </div>
  )
}