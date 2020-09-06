const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// 'let' instead of 'const' because value will change
let ready = false; // guard condition for  getPhotos();
let imagesLoaded = 0;
let totalImages  = 0;
let photosArray = [];

// Unsplash API
const apiKey = '1nG2iq_FwN2fH8I2MlQalKeWPymA714cmquEGJtcXwM';
const orientation = 'landscape';
const query = 'dj'
let isInitialLoad = true;

// Dynamically generate API url to get the given number of photos
function getAPIUrl(count) {
    return `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=`+ count +`&query=${query}&orientation=${orientation}`;
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(`loaded: ${imagesLoaded}, total: ${totalImages}`);
    if ( imagesLoaded === totalImages ) {
        // done getting photos for now, set ready to get photos again
        ready = true;
        // hide loader after getting photos 1st time
        if (isInitialLoad) {
            loader.hidden = true;
        }
        console.log('<< Ready for more >>');
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
    // Keep tally of all photos loaded into page so far
    totalImages += photosArray.length;

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
        img.addEventListener('load', imageLoaded);
        
        // Put img inside a, put a inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);


    });
}

// Get photos from Unsplash API
async function getPhotos() {
    // Grab 5 photos on initial load, 30 photos thereafter
    async function tryLoadPhotos(count) {
        try {
            const response = await fetch(getAPIUrl(count));
            photosArray = await response.json();
            displayPhotos();
        } catch (error) {
            // Catch error here
            console.log(error);
        }
    }

    // Initially load 5 for page load speed, subsequent requests for 30 pics
    if (isInitialLoad) {
        tryLoadPhotos(5);
        isInitialLoad = false;
    } else {
        tryLoadPhotos(30);
    }
}

// Check scrollbar position, load more if near bottom
window.addEventListener('scroll', () => {
    // See if user has scrolled 70% of page, load more if so
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight * 0.7) && ready ) {
        // set back to false so only downloads when previous 
        // requests have been completed.
        ready = false;
        getPhotos();
    };
});

// On load
getPhotos();