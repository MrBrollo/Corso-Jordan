document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    const settingsModal = document.getElementById('cookie-settings');
    const reopenBtn = document.getElementById('reopen-settings');

    // Mostra banner se nessuna preferenza è salvata
    if (!localStorage.getItem('cookiePrefs')) {
        banner.style.display = 'block';
    }

    // Accetta tutti i cookie
    document.getElementById('accept-all').addEventListener('click', () => {
        localStorage.setItem('cookiePrefs', JSON.stringify({
            necessary: true,
            analytics: true,
            marketing: true
        }));
        banner.style.display = 'none';

        enableAnalytics();
        enableMarketing();
    });

    // Apri impostazioni cookie dal banner
    document.getElementById('open-settings').addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    // Chiudi impostazioni cookie
    document.getElementById('close-settings').addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // Salva impostazioni selezionate
    document.getElementById('save-settings').addEventListener('click', () => {
        const analytics = document.getElementById('analytics-cookies').checked;
        const marketing = document.getElementById('marketing-cookies').checked;

        localStorage.setItem('cookiePrefs', JSON.stringify({
            necessary: true,
            analytics,
            marketing
        }));

        settingsModal.style.display = 'none';
        banner.style.display = 'none';

        if (analytics) enableAnalytics();
        if (marketing) enableMarketing();
    });

    // Riapri modale con il pulsante fisso
    reopenBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    // Applica preferenze salvate (se presenti)
    const savedPrefs = JSON.parse(localStorage.getItem('cookiePrefs'));
    if (savedPrefs?.analytics) enableAnalytics();
    if (savedPrefs?.marketing) enableMarketing();
});

function enableAnalytics() {
    console.log("🔍 Analytics abilitati");
    // Qui inserisci codice reale per analytics
}

function enableMarketing() {
    console.log("📢 Marketing abilitato");
    // Qui inserisci codice reale per marketing
}