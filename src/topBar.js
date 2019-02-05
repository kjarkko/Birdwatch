import React, {useState} from 'react'

const TopBar = ({views, currentView, setView}) => {

	const Button = ({ownView}) => {
	  const onClick = () => {
	    if(ownView.name === currentView.name)
	      return
	    setView(ownView.create())
	  }
		return <button class="btn mx-2 btn-primary btn-dark"  onClick={onClick} > {ownView.name} </button>
	}
      
	const buttons = [
	  <Button key='1' ownView={views.main} />,
	  <Button key='2' ownView={views.form} />
	]
      
	return (
	  <nav class="navbar navbar-dark bg-primary">
	    <span class="navbar-brand mb-0 h1">Birdwatch</span>
	    <div class="btn-toolbar">{buttons}</div>
	  </nav>
	)
}

export default TopBar