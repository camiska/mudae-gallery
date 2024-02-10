document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery

    const lines = input.split('\n');
    lines.forEach(line => {
        const [caption, url] = line.split('. ').map(part => part.trim());
        if (url) {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.src = url;
            img.alt = `Image ${caption}`;
            img.onerror = () => {
                console.error(`Image ${caption} failed to load.`);
                imageItem.remove(); // Optionally remove the div if the image fails to load
            };

            const p = document.createElement('p');
            p.textContent = caption + '.';

            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
