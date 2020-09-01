// let corsProxyServer = https://gentle-plains-15721.herokuapp.com/ ;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// 'let' instead of 'const' because value will change
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = '1nG2iq_FwN2fH8I2MlQalKeWPymA714cmquEGJtcXwM';
const orientation = 'landscape';
const query = 'africa'
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=${orientation}&query=&{query}`;

// Programmatically create elements for links/photos; manipulate into DOM
function displayPhotos() {
    // 'forEach': run function for each object in 'photosArray'
    photosArray.forEach((photo) => {
        // Create an anchor to link to original photo
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        
        // Create img for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        
        // Put img inside a, put a inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);


    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(unsplashApiUrl)
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}

// On load
getPhotos();