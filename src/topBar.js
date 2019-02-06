import React from 'react'

const TopBar = ({views, currentView, setView}) => {

	const Button = ({view}) => {
	  const onClick = () => {
	    if(view.name === currentView.name)
	      return
	    setView(view.create())
	  }
		return <button class="btn mx-2 btn-primary btn-dark"  onClick={onClick} > {view.name} </button>
	}

	const buttons = [
	  <Button key='1' view={views.main} />,
	  <Button key='2' view={views.form} />
	]
      
	return (
	  <nav class="navbar navbar-dark bg-primary">
	    <span class="navbar-brand mb-0 h1">Birdwatch</span>
	    <div class="btn-toolbar">{buttons}</div>
	  </nav>
	)
}

export default TopBar