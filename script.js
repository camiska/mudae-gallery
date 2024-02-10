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

            let imageUrl;
            if (isGif) {
                // Use the original URL directly for GIFs
                imageUrl = originalUrl;
            } else {
                // Extract the relevant part for PNGs
                const imageUrlPart = originalUrl.substring(originalUrl.lastIndexOf('~') + 1);
                // Example alternative URLs, modify as needed
                imageUrl = `https://imgur.com/${imageUrlPart}.png`; // Default to Imgur for PNGs
            }

            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Image ${caption}`;

            // Error handling primarily for PNGs
            img.onerror = () => {
                if (!isGif) {
                    // Attempt alternative source if not a GIF and the first source failed
                    img.src = `https://cdn.imgchest.com/files/${imageUrlPart}.png`;
                } else {
                    console.error(`GIF failed to load from original source for ${caption}.`);
                    img.alt = 'Image failed to load';
                }
            };

            const p = document.createElement('p');
            p.textContent = `${caption}.`;

            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
