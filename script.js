document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value;
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear existing gallery content

    // Split input by lines and process each line
    const lines = input.trim().split('\n');
    lines.forEach(line => {
        const [caption, url] = line.split('. ');
        if (url) {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.src = url.trim();
            img.alt = `Image ${caption}`;

            const p = document.createElement('p');
            p.textContent = caption + '.';

            imageItem.appendChild(img);
            imageItem.appendChild(p);
            gallery.appendChild(imageItem);
        }
    });
});
