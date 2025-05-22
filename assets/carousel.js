function generaCarousel(giochi) {
    const $carouselInner = $('#carousel-inner-novita');
    $carouselInner.empty();
    for (let i = 0; i < giochi.length; i += 4) {
        const active = i === 0 ? 'active' : '';
        const $slide = $('<div>').addClass(`carousel-item ${active}`);
        const $row = $('<div>').addClass('row g-4');

        giochi.slice(i, i + 4).forEach(gioco => {
            const $col = $(`
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card text-dark h-100">
                        <img src="${gioco.img}" class="card-img-top" alt="${gioco.alt}">
                        <div class="card-body">
                            <h5 class="card-title">${gioco.title}</h5>
                            <p class="card-text">${gioco.text}</p>
                        </div>
                    </div>
                </div>
            `);
            $row.append($col);
        });

        $slide.append($row);
        $carouselInner.append($slide);
    }
}