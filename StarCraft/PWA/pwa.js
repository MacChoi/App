if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'}).then(function(registration) {
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
    console.log('beforeinstallprompt triggered');
    event.preventDefault();
    window.promptEvent = event;
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('display-mode is standalone');
    } else {
    
    }
});

function addToHomeScreen() {
    window.promptEvent.prompt();
    window.promptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted')
      } else {
        console.log('User dismissed')
      }
    })
}