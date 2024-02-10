document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before displaying new images

    const lines = input.split('\n');
    lines.forEach(line => {
        // Splitting each line into caption and URL
        const parts = line.split('. ');
        if (parts.length === 2) {
            const caption = parts[0].trim();
            const url = parts[1].trim();
            // Creating elements for the image and its caption
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.src = url;
            img.alt = `Image ${caption}`;
            img.onerror = function() { // Handling broken links
                this.style.display = 'none'; // Hide broken images
            };

            const p = document.createElement('p');
            p.textContent = caption + '.';

            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
