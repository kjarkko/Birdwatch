export const timestamp = () => {
	return Date.now().toLocaleString()
}

export const geolocation = () => {
  let location = 'N/A'
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 5000
  }
  const success = pos => {
    const crd = pos.coords
    location = `lat: ${crd.latitude} long:${crd.longitude}`
  }
  const error = err => {
    console.log(err)
  }
  navigator
    .geolocation
    .getCurrentPosition(success, error, options)

  return location
}
