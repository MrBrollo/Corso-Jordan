function generaCarousel(giochi) {
    const carouselInner = document.getElementById('carousel-inner-novita');
    carouselInner.innerHTML = '';

    for (let i = 0; i < giochi.length; i += 4) {
        const isActive = i === 0 ? 'active' : '';
        const slide = document.createElement('div');
        slide.className = `carousel-item ${isActive}`;

        const row = document.createElement('div');
        row.className = 'row g-4';

        giochi.slice(i, i + 4).forEach(gioco => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-3';
            col.innerHTML = `
                <div class="card text-dark h-100">
                    <img src="${gioco.img}" class="card-img-top" alt="${gioco.alt}">
                    <div class="card-body">
                        <h5 class="card-title">${gioco.title}</h5>
                        <p class="card-text">${gioco.text}</p>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });

        slide.appendChild(row);
        carouselInner.appendChild(slide);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/assets/giochi.json')
        .then(response => {
            if (!response.ok) throw new Error('Errore nel caricamento');
            return response.json();
        })
        .then(data => {
            generaCarousel(data);
        })
        .catch(error => {
            console.error('Errore:', error);
        });
});