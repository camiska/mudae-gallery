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

            let imageUrl = originalUrl; // Default to using the original URL

            if (!isGif) {
                // Only modify the URL for non-GIF images
                const imageUrlPart = originalUrl.substring(originalUrl.lastIndexOf('~') + 1);
                imageUrl = `https://imgur.com/${imageUrlPart}.png`; // Attempt with Imgur for PNGs

                // Prepare for fallback URL in case the primary one fails
                const fallbackUrl = `https://cdn.imgchest.com/files/${imageUrlPart}.png`;

                // Adjust the onError logic to handle fallback for PNG images
                const img = document.createElement('img');
                img.onerror = function() {
                    console.log(`Primary URL failed for ${caption}, trying fallback.`);
                    this.src = fallbackUrl;
                    this.onerror = function() {
                        console.error(`Both primary and fallback URLs failed for ${caption}.`);
                        this.alt = 'Image failed to load';
                    };
                };

                img.src = imageUrl; // Set the initial source to attempt loading
            } else {
                // Directly set the source for GIFs without modification
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Image ${caption}`;
                
                // Append the image and caption to the gallery
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');

                const p = document.createElement('p');
                p.textContent = `${caption}.`;

                imageItem.appendChild(img);
                imageItem.appendChild(p);
                gallery.appendChild(imageItem);
            }
        }
    });
});
