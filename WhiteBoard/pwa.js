const request = async (url) => {
    const response = await fetch(url);
    const manifest = await response.json();
    
    const apple_link=[
        {"rel":"icon","sizes":"32x32","href":"assets/images/icons/favicon-32x32.png"},
        {"rel":"icon","sizes":"96x96","href":"assets/images/icons/favicon-96x96.png"},
        {"rel":"shortcut icon","sizes":"","href":"#"},
        {"rel":"manifest","sizes":"","href":"manifest.json"},
        // pwa safari
        {"rel":"apple-touch-icon","sizes":"192x192","href":manifest.icons[0].src},
        {"rel":"apple-touch-icon","sizes":"512x512","href":manifest.icons[1].src}
    ]
    apple_link.forEach(element => {
        var link = document.createElement('link'); 
        link.rel = element.rel; 
        link.sizes = element.sizes; 
        link.href = element.href; 
        document.getElementsByTagName('head')[0].appendChild(link);
    });

    const apple_mata=[
        {"name":"viewport","content":"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"},
        {"name":"apple-mobile-web-app-capable","content":"yes"},
        {"name":"apple-mobile-web-app-title","content":manifest.short_name},
        {"name":"description","content":manifest.name},
        {"name":"apple-mobile-web-app-status-bar-style","content":"black-translucent"},
        {"name":"theme-color","content":manifest.background_color},
    ]
    apple_mata.forEach(element => {
        var meta = document.createElement('meta'); 
        meta.name = element.name; 
        meta.content = element.content; 
        document.getElementsByTagName('head')[0].appendChild(meta);
    });    
}
request('manifest.json');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
            registration.installing; // the installing worker, or undefined
            registration.waiting; // the waiting worker, or undefined
            registration.active; // the active worker, or undefined
            
            registration.addEventListener('updatefound', () => {
                // A wild service worker has appeared in reg.installing!
                const newWorker = registration.installing;
            
                newWorker.state;
                // "installing" - the install event has fired, but not yet complete
                // "installed"  - install complete
                // "activating" - the activate event has fired, but not yet complete
                // "activated"  - fully active
                // "redundant"  - discarded. Either failed install, or it's been
                //                replaced by a newer version
            
                newWorker.addEventListener('statechange', () => {
                    // newWorker.state has changed
                });
            });            
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // This fires when the service worker controlling this page
            // changes, eg a new worker has skipped waiting and become
            // the new active worker.
        });
    });
}

window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt triggered',window.matchMedia('(display-mode: standalone)').media );
    event.preventDefault();
    window.addToHomeScreenEvent = event;
    if (window.matchMedia('(display-mode: standalone)').matches) {
    } else {
        new AddToHomeScreenScene(GAME);
    }
});