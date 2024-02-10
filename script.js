document.getElementById('displayButton').addEventListener('click', async function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new images

    const lines = input.split('\n');
    lines.forEach(line => {
        const [caption, originalUrl] = line.split('. ').map(part => part.trim());
        if (originalUrl) {
            const imageUrlPart = originalUrl.split('~')[1]; // Extract the unique part of the URL
            const imgurUrl = `https://imgur.com/${imageUrlPart}.png`;
            const imgchestUrl = `https://cdn.imgchest.com/files/${imageUrlPart}.png`;

            // Creating the container for each image and its caption
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            // Creating the image element
            const img = document.createElement('img');
            img.alt = `Image ${caption}`;

            const p = document.createElement('p');
            p.textContent = `${caption}.`;

            // Function to handle loading error and try the next URL
            img.onerror = function() {
                if (this.src === imgurUrl) {
                    console.log(`Imgur URL failed for ${caption}, trying Imgchest.`);
                    this.src = imgchestUrl;
                } else {
                    console.error(`Both URLs failed for ${caption}.`);
                    this.alt = 'Image failed to load';
                }
            };

            // Initially try loading from Imgur
            img.src = imgurUrl;

            // Appending the image and caption to the container, then the container to the gallery
            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
