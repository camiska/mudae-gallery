document.getElementById('displayButton').addEventListener('click', function() {
    const input = document.getElementById('inputArea').value.trim();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new images

    input.split('\n').forEach((line, index) => {
        if (line.includes('. ')) {
            const [caption, originalUrl] = line.split('. ').map(part => part.trim());
            appendImage(index + 1, originalUrl, originalUrl); // Passing caption and URL
        }
    });

    enableDragAndDrop();
});

let originalUrls = []; // Store original URLs for the "New Order" functionality

function appendImage(caption, imageUrl, originalUrl) {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');
    imageItem.setAttribute('draggable', false); // Initially not draggable

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Image ${caption}`;
    img.onerror = () => img.alt = 'Image failed to load';

    const p = document.createElement('p');
    p.textContent = `${caption}.`;

    imageItem.appendChild(img);
    imageItem.appendChild(p);
    document.getElementById('gallery').appendChild(imageItem);

    // Store the original URL with its display caption
    originalUrls.push({caption, url: originalUrl});
}

function enableDragAndDrop() {
    let dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation(); // Stops the browser from redirecting.
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');

            // After drop, update captions based on new order
            updateCaptions();
        }
        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        items.forEach(item => item.classList.remove('over'));
    }

    let items = document.querySelectorAll('.image-item');
    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}

function updateCaptions() {
    document.querySelectorAll('.gallery .image-item p').forEach((p, index) => {
        p.textContent = `${index + 1}.`;
    });

    // Update the originalUrls array based on the new order
    originalUrls = originalUrls.sort((a, b) => {
        const textA = parseInt(document.querySelector(`img[src="${a.url}"]`).parentNode.querySelector('p').textContent);
        const textB = parseInt(document.querySelector(`img[src="${b.url}"]`).parentNode.querySelector('p').textContent);
        return textA - textB;
    });
}

document.getElementById('arrangeButton').addEventListener('click', function() {
    const items = document.querySelectorAll('.image-item');
    const isArranging = items[0].getAttribute('draggable') === 'true';
    items.forEach(item => {
        item.setAttribute('draggable', !isArranging);
    });
    this.textContent = isArranging ? 'Arrange Images' : 'Finish Arranging';
});

document.getElementById('newOrderButton').addEventListener('click', function() {
    const newOrderList = document.getElementById('newOrderList');
    newOrderList.innerHTML = ''; // Clear previous list

    originalUrls.forEach((item, index) => {
        const linkText = document.createElement('p');
        linkText.textContent = `${index + 1}. ${item.url}`;
        newOrderList.appendChild(linkText);
    });
});
