import React from 'react'

const TopBar = ({views, currentView, setView}) => {

	const Button = ({ownView}) => {
	  const onClick = () => {
	    if(ownView.name === currentView.name)
	      return
	    setView(ownView)
	  }
	  return <button onClick={onClick} > {ownView.name} </button>
	}
      
	const buttons = [
	  <Button ownView={views.main} />,
	  <Button ownView={views.form} />
	]
      
	return (
	  <div>
	    <h2>Birdwatch</h2>
	    {buttons}
	  </div>
	)
}

export default TopBar