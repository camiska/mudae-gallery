document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new images

    const lines = input.split('\n');
    lines.forEach(line => {
        const parts = line.split('. ');
        if (parts.length === 2) {
            const caption = parts[0].trim();
            let originalUrl = parts[1].trim();
            let imageUrlPart = originalUrl.substring(originalUrl.lastIndexOf('~') + 1);

            // URLs reconstructed from the part after "~"
            let imgurUrl = `https://imgur.com/${imageUrlPart}.png`;
            let imgchestUrl = `https://cdn.imgchest.com/files/${imageUrlPart}.png`;

            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.alt = `Image ${caption}`;

            // Attempt to load the image from the first source
            img.src = imgurUrl; // Start with Imgur

            img.onerror = () => {
                if (img.src === imgurUrl) {
                    console.log(`Trying Imgchest for ${caption} as Imgur failed.`);
                    img.src = imgchestUrl; // Switch to Imgchest if Imgur fails
                } else {
                    img.alt = 'Both sources failed to load image';
                    console.error(`Both Imgur and Imgchest failed for ${caption}.`);
                }
            };

            const p = document.createElement('p');
            p.textContent = caption + '.';

            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
