// let corsProxyServer = https://gentle-plains-15721.herokuapp.com/ ;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// 'let' instead of 'const' because value will change
let ready = false;
let imagesLoaded = 0;
let totalImages  = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '1nG2iq_FwN2fH8I2MlQalKeWPymA714cmquEGJtcXwM';
const orientation = 'landscape';
const query = 'dj'
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}&orientation=${orientation}`;

// Check if all images were loaded
function imageLoaded() {
    console.log('image Loaded');
    imageLoaded++;
    if ( imagesLoaded === totalImages ) {
        ready = true;
        console.log(`ready = ${ready}`);
    }
}

// Helper function that sets attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Programmatically create elements for links/photos; manipulate into DOM
function displayPhotos() {
    totalImages = photosArray.length;
    console.log(`total images: ${totalImages}`);

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

        // Add event listener to check when each img is finished loading
        
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

// Check scrollbar position, load more if near bottom
window.addEventListener('scroll', () => {
    // See if user has scrolled 70% of page, load more if so
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight * 0.7) && ready ) {
        ready = false;
        getPhotos();
    };
});

// On load
getPhotos();