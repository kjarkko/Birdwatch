import React from 'react'

const TopBar = ({views, currentView, setView}) => {

	const Button = ({name, create}) => {
	  const onClick = () => {
	    if(name !== currentView.name)
	      setView(create())
	  }
		return <button class="btn mx-2 btn-primary btn-dark"  onClick={onClick} > {name} </button>
	}

	const buttons = Object.values(views).map(v => 
		<Button key={v.name} name={v.name} create={v.create} />
	)
      
	return (
	  <nav class="navbar navbar-dark bg-primary">
	    <span class="navbar-brand mb-0 h1">Birdwatch</span>
	    <div class="btn-toolbar">{buttons}</div>
	  </nav>
	)
}

export default TopBar