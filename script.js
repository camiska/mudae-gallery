document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new images

    const lines = input.split('\n');
    lines.forEach(line => {
        if (line.includes('. ')) {
            const [caption, originalUrl] = line.split('. ').map(part => part.trim());
            const urlParts = originalUrl.split('~');
            const lastPart = urlParts[urlParts.length - 1];
            const isGif = lastPart.endsWith('.gif');

            let imageUrl = originalUrl; // Default to the original URL

            if (!isGif) {
                // If the URL is not a GIF, attempt to construct new URLs for PNG
                const imgurUrl = `https://imgur.com/${lastPart}`;
                const imgchestUrl = `https://cdn.imgchest.com/files/${lastPart}`;

                // Initially set imageUrl to imgurUrl and prepare for a possible fallback
                imageUrl = imgurUrl;

                appendImage(caption, imageUrl, imgchestUrl); // Append and handle fallback if necessary
            } else {
                // Directly append GIF without fallback logic
                appendImage(caption, imageUrl);
            }
        }
    });
});

function appendImage(caption, imageUrl, fallbackUrl = '') {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Image ${caption}`;

    img.onerror = () => {
        if (fallbackUrl) {
            console.log(`Trying fallback URL for ${caption}.`);
            img.src = fallbackUrl;
        } else {
            img.alt = 'Image failed to load';
        }
    };

    const p = document.createElement('p');
    p.textContent = caption + '.';

    imageItem.appendChild(img);
    imageItem.appendChild(p);
    document.getElementById('gallery').appendChild(imageItem);
}
