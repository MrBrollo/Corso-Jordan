let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class based on scroll position
    if (scrollTop > 50) { // Start changing color after scrolling 50px
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down: hide navbar with fade effect
        navbar.style.transform = "translateY(-100%)";
        navbar.style.opacity = "0";
    } else {
        // Scrolling up: show navbar with fade effect
        navbar.style.transform = "translateY(0)";
        navbar.style.opacity = "1";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative values
});

// Visualizza la data odierna e impedisce la selezione di date future
const today = new Date().toISOString().split('T')[0];
const birthDateInput = document.getElementById('birthDate');

birthDateInput.value = today;
birthDateInput.max = today;

// Gestione della dark mode
const toggleBtn = document.getElementById('darkModeToggle');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.innerHTML = document.body.classList.contains('dark-mode') ? "<i class='bx bxs-sun' ></i>" : "<i class='bx bxs-moon' ></i>";
});

// Gestione del form di registrazione
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let errors = [];

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const birthDate = document.getElementById('birthDate').value;
    const phone = document.getElementById('phone').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const termsAccepted = document.getElementById('inputCheckboxTerms').checked;

    // Gestione errori
    if (username === '') {
        errors.push("Il campo Nome Utente è obbligatorio.");
    } else {
        const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
        if (!usernameRegex.test(username)) {
            errors.push("Il nome utente deve contenere almeno 3 caratteri");
        }
    }

    if (email === '') {
        errors.push("Il campo Email è obbligatorio.");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Inserisci un'email valida.");
        }
    }

    if (password === '') {
        errors.push("Il campo Password è obbligatorio.");
    } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            errors.push("La password deve contenere almeno 6 caratteri, una lettera maiuscola, una lettera minuscola e un numero.");
        }
    }

    if (birthDate === '') {
        errors.push("Il campo Data di Nascita è obbligatorio.");
    }

    if (phone === '') {
        errors.push("Il campo Numero di Telefono è obbligatorio.");
    } else if (!/^\d{10}$/.test(phone)) {
        errors.push("Il numero di telefono deve contenere esattamente 10 cifre.");
    }

    if (!gender) {
        errors.push("Seleziona un'opzione per il genere.");
    }

    if (!termsAccepted) {
        errors.push("È necessario accettare i termini e le condizioni.");
    }

    if (errors.length > 0) {
        alert("Si sono verificati i seguenti errori:\n\n" + errors.join('\n'));
    } else {
        alert("Registrazione completata con successo!");

        // Mostra i dati in un JSON
        const userData = {
            nomeUtente: username,
            email: email,
            password: password,
            dataNascita: birthDate,
            numeroTelefono: phone,
            genere: genderInput.value,
            newsletter: newsletter ? "sì" : "no",
            terminiAccettati: true
        };
        console.log("Dati utente (JSON):", JSON.stringify(userData, null, 2));
    }
});


const giochi = [
    {
        img: "assets/img/expedition33.avif",
        alt: "expedition33",
        title: "Clair Obscur: Expedition 33",
        text: "Scopri il celebre rpg di Sandfall Interactive che ha fatto emozionare i fan del genere!"
    },
    {
        img: "assets/img/Oblivion.avif",
        alt: "oblivion",
        title: "The Elder Scrolls IV: Oblivion Remastered",
        text: "Riscopri il famoso Open-World di Bethesda in questa appassionante remastered!"
    },
    {
        img: "assets/img/elden_ring.jpg",
        alt: "nightreign",
        title: "Elden Ring Nightreign",
        text: "Hai il coraggio di mettere alla prova le tue capacità nel nuovo DLC di Elden Ring?"
    },
    {
        img: "assets/img/mh_wilds.png",
        alt: "mh_wilds",
        title: "Monster Hunter: Wilds",
        text: "Armati di coraggio (e di armi decisamente smisurate!) e vai a caccia di mostri nell'ultimo capitolo della celebre serie di Capcom!"
    },
    {
        img: "assets/img/horizon.avif",
        alt: "horizon",
        title: "Horizon Zero Dawn: Complete Edition",
        text: "Riscopri il mondo post-apocalittico di Horizon Zero Dawn in questa edizione completa!"
    },
    {
        img: "assets/img/mario_kart.avif",
        alt: "mario_kart",
        title: "Mario Kart World",
        text: "Preparati a gareggiare contro i tuoi amici nel nuovo capitolo di Mario Kart!"
    },
    {
        img: "assets/img/hollow_knight.jpg",
        alt: "hollow_knight",
        title: "Hollow Knight: Silksong",
        text: "Scopri il sequel del celebre platform metroidvania in arrivo su tutte le piattaforme!"
    },
    {
        img: "assets/img/doom.avif",
        alt: "doom",
        title: "Doom: The Dark Ages",
        text: "Scopri le origini del leggendario Doom Slayer nel nuovo capitolo della saga!"
    }
];

$(function () {
    generaCarousel(giochi);
});