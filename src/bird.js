import React from 'react'

const Bird = ({bird}) => {
  return (
    <div>
      <h4> {bird.name     } </h4>
      <i>  {bird.rarity   } </i>
      <p>  {bird.timestamp} </p>
      <p>  {bird.notes    } </p>
    </div>
  )
}

const Birds = ({birds}) => {
  return (
    <div>
      <ul>
        {birds.map(bird => <li><Bird bird={bird}/></li>)}
      </ul>
    </div>
  )
}

export default Birds
