# Birdwatch

Application for tracking bird observations

## How to start the application

### Setup

run `npm install` to install dependencies. You will also want to install `json-server` as the seperate data server, change the URL in `/src/config.json` to the desired one.

### Starting the application

Run `npm start` and start `json-server` with the corresponding port (for example `--port=3001`) and `--watch db.json`


## Miscellaneous

As far as I'm aware, (at least on chrome) geolocation requires the app to be served over https, otherwise it does not work. In this case the geolocation will simply be `N/A`

### Dev diary

Developing the application was mostly easy, but implementing the data storage so that the app also functions offline and syncs when it comes back online was somewhat difficult
