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
            const imageUrlPart = originalUrl.substring(originalUrl.lastIndexOf('~') + 1);

            // Determine if the URL is for a GIF
            const isGif = originalUrl.endsWith('.gif');

            let finalUrl;
            if (isGif) {
                // Use the original URL for GIFs
                finalUrl = originalUrl;
            } else {
                // Construct new URLs for PNG images
                const imgurUrl = `https://imgur.com/${imageUrlPart}.png`;
                const imgchestUrl = `https://cdn.imgchest.com/files/${imageUrlPart}.png`;
                finalUrl = imgurUrl; // Initially set to Imgur URL for PNGs

                // Additional logic for handling PNGs could be added here if necessary
            }

            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.alt = `Image ${caption}`;
            img.src = finalUrl; // Use the determined final URL

            img.onerror = () => {
                if (!isGif && img.src === finalUrl) {
                    console.log(`Imgur failed for ${caption}, trying Imgchest.`);
                    img.src = imgchestUrl; // Switch to Imgchest if Imgur fails for PNG
                } else if (!isGif) {
                    img.alt = 'Both sources failed to load image';
                    console.error(`Both Imgur and Imgchest failed for ${caption}.`);
                }
                // Note: No fallback for GIFs as they use the original URL
            };

            const p = document.createElement('p');
            p.textContent = caption + '.';

            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
