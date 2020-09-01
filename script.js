// let corsProxyServer = https://gentle-plains-15721.herokuapp.com/ ;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// 'let' instead of 'const' because value will change
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = '1nG2iq_FwN2fH8I2MlQalKeWPymA714cmquEGJtcXwM';
const orientation = 'landscape';
const query = 'dj'
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}&orientation=${orientation}`;

// Helper function that sets attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Programmatically create elements for links/photos; manipulate into DOM
function displayPhotos() {
    // 'forEach': run function for each object in 'photosArray'
    photosArray.forEach((photo) => {
        // Create an anchor to link to original photo
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        
        // Create img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        
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