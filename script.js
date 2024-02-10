document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new images

    const lines = input.split('\n');
    lines.forEach(line => {
        // Extracting number and URL using a split based on the first occurrence of ". "
        const firstSpaceIndex = line.indexOf('. ');
        if (firstSpaceIndex !== -1) {
            const caption = line.substring(0, firstSpaceIndex);
            const url = line.substring(firstSpaceIndex + 2).trim();

            // Creating the container for each image and its caption
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            // Creating the image element
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Image ${caption}`;
            img.onerror = function() {
                console.error(`Image ${caption} at ${url} failed to load.`);
                this.alt = 'Image failed to load'; // Updating alt text on error
            };

            // Creating the caption paragraph
            const p = document.createElement('p');
            p.textContent = `${caption}.`;

            // Appending the image and caption to the container, then the container to the gallery
            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
