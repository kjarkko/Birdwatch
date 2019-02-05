export const timestamp = () => {
	return new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const removeUnion = (source, other) => 
  source.filter(so => !other.some(lo => equal(so,lo)))

export const equal = (a, b) => (
  a.species === b.species && a.rarity === b.rarity && 
  a.date === b.date && a.location === b.location && a.notes === b.notes
)

export const rarityOpts = [
  'Common', 'Rare', 'Extremely rare'
]

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
