
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: listing.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});


// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates)//listing.geomentry.coordinaters
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h5>${listing.title}</h5><p>Exact loaction will be provided after booking</p>`)
.setMaxWidth("300px"))
.addTo(map);
