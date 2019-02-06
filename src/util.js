export const timestamp = () => Date.now()

export const timeToString = (time) => 
  new Date(time)
    .toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

export const removeUnion = (source, other) => 
  source.filter(so => !other.some(lo => equal(so,lo)))

export const equal = (a, b) => (
  a.species === b.species && a.rarity === b.rarity && 
  a.date === b.date && a.location === b.location && a.notes === b.notes
)

export const rarityOpts = [
  'Common', 'Rare', 'Extremely rare'
]

let location = 'N/A'
const updateLocation = () =>{
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 5000
  }
  const success = pos => {
    const crd = pos.coords
    location = `lat: ${crd.latitude.toString().slice(0,6)}, long: ${crd.longitude.toString().slice(0,6)}`
  }
  const error = err => {
    console.log('failed to get location',err)
  }
  navigator
    .geolocation
    .getCurrentPosition(success, error, options)
}
updateLocation()
setInterval(updateLocation,5000)

export const geolocation = () => (location)
