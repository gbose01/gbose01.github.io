(function () {
    var GA_ID = 'G-QC7J5853B9';

    var host = location.hostname;
    if (!host || host === 'localhost' || host === '127.0.0.1') return;

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(script);
})();
