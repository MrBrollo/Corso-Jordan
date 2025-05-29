let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //
    if (scrollTop > 50) { // Cambia colore dopo 50px di scroll
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Nasconde la navbar quando si scorre verso il basso
        navbar.style.transform = "translateY(-100%)";
        navbar.style.opacity = "0";
    } else {
        // Mostra la navbar quando si scorre verso l'alto
        navbar.style.transform = "translateY(0)";
        navbar.style.opacity = "1";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // I valori negativi non sono validi
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
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const termsAccepted = document.getElementById('inputCheckboxTerms').checked;
    const newsletter = document.getElementById('inputCheckboxNews').checked;

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

    if (!genderInput) {
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
            terms: termsAccepted
        };

        //invia i dati al server
        fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                console.log('Risposta server:', data);
            })
            .catch(error => {
                console.error('Errore nella fetch:', error);
            });

    }

});