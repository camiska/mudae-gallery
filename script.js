document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new images

    const lines = input.split('\n');
    lines.forEach(line => {
        const parts = line.split('. ');
        if (parts.length === 2) {
            const caption = parts[0].trim();
            const originalUrl = parts[1].trim();
            const isGif = originalUrl.endsWith('.gif');
            
            // Determine if we need to modify the URL (for PNGs) or use the original (for GIFs)
            if (!isGif) {
                // It's not a GIF, proceed with PNG logic
                const imageUrlPart = originalUrl.substring(originalUrl.lastIndexOf('~') + 1);
                const imgurUrl = `https://imgur.com/${imageUrlPart}.png`;
                const imgchestUrl = `https://cdn.imgchest.com/files/${imageUrlPart}.png`;

                createImageItem(caption, imgurUrl, imgchestUrl);
            } else {
                // It's a GIF, use the original URL without modification
                createImageItem(caption, originalUrl);
            }
        }
    });
});

function createImageItem(caption, primaryUrl, fallbackUrl = null) {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');

    const img = document.createElement('img');
    img.src = primaryUrl;
    img.alt = `Image ${caption}`;

    // Error handling for PNGs with a fallback URL
    if (fallbackUrl) {
        img.onerror = () => {
            console.log(`Primary URL failed for ${caption}, trying fallback.`);
            img.src = fallbackUrl;
            // Remove the onerror handler to prevent infinite loops
            img.onerror = () => {
                console.error(`Both primary and fallback URLs failed for ${caption}.`);
                img.alt = 'Image failed to load';
            };
        };
    }

    const p = document.createElement('p');
    p.textContent = `${caption}.`;

    imageItem.appendChild(img);
    imageItem.appendChild(p);
    document.getElementById('gallery').appendChild(imageItem);
}
