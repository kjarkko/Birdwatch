import React, {useState} from 'react'

const Search = ({observations, setResults}) => {

  const filter = (find) => (obs) => (
    (obs.date.includes(find)) || (obs.location.includes(find)) ||
    (obs.species.includes(find)) || (obs.rarity.includes(find)) ||
    (obs.notes.includes(find))
  )

  const compare = (crit, asc) => (a, b) => {
    console.log(crit, asc, a[crit], b[crit])
    return !asc ? (a[crit] < b[crit]) : (a[crit] > b[crit])
  }
   

  const update = (term,crit,asc) => {
    const updated = observations
      .filter(filter(term))
      .sort(compare(crit, asc))
    setResults(updated)
  }

  const possibleCriteria = ['species', 'rarity', 'date', 'location']
  const [criteria, setCriteria] = useState('date')
  const [ascending, setAscending] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  


  // handlers for value changes
  const hcc = event => { // sort criteria
    const crit = event.target.value
    console.log(crit)
    setCriteria(crit)
    update(searchTerm, crit, ascending)
  }
  const hac = event =>{ // ascending or descending
    const asc = event.target.value
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

        <li class='list-inline-item'>
          <label class='checkbox-inline'>
            <input onChange={hac} type='checkbox' />Ascending
          </label>
        </li>

        <li class='list-inline-item'>
          <p></p>
          <select onChange={hcc} class="custom-select m-2">
            {possibleCriteria.map(c => <option key={c}> {c} </option>)}
          </select>
        </li>

        <li class='list-inline-item'>
          <input onChange={hsc} value={searchTerm} class='form-control m-2' placeholder='Search...'/>
        </li>

      </ul>
    </div>
  )
}

export default Search