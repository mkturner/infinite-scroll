// let corsProxyServer = https://gentle-plains-15721.herokuapp.com/ ;

// Unsplash API
const count = 10;
const apiKey = '1nG2iq_FwN2fH8I2MlQalKeWPymA714cmquEGJtcXwM';
const orientation = 'landscape';
const query = 'africa'
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=${orientation}&query=&{query}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(unsplashApiUrl)
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // Catch error here
    }
}

// On load
getPhotos();