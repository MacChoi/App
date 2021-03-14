// const response = await fetch('/manifest.json');
// const json = await response.json();
// console.log(json);

const request = async (url) => {
    // var link = document.createElement('link'); 
    // link.rel = "manifest"; 
    // link.href = "manifest.json"; 
    // document.getElementsByTagName('head')[0].appendChild(link);

    const response = await fetch(url);
    const manifest = await response.json();
    // pwa safari fix
    const apple_link=[
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
        {"name":"apple-mobile-web-app-capable","content":"yes"},
        {"name":"apple-mobile-web-app-title","content":manifest.short_name},
        {"name":"description","content":manifest.name},
        {"name":"apple-mobile-web-app-status-bar-style","content":manifest.background_color},
        {"name":"theme-color","content":manifest.background_color},
    ]
    apple_mata.forEach(element => {
        var meta = document.createElement('meta'); 
        meta.name = element.name; 
        meta.content = element.content; 
        document.getElementsByTagName('head')[0].appendChild(meta);
    });    
}
request('PWA/manifest.json');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/serviceWorker.js', {scope: '/WhiteBoard'}).then(function(registration) {
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

class PWAScene extends Phaser.Scene {
    constructor(){
        super({
            key:'PWAScene',
        });
    }

    preload (){
        this.load.image('icon', 'PWA/images/icon_192x192.png');
    }

    release(){
        this.textures.remove('icon');
        this.scene.stop('PWAScene');
        this.scene.destroy('PWAScene');
    }

    create(){
        const WIDTH = GAME.config.width;
        const HEIGHT = GAME.config.height;

        var graphics = this.add.graphics();
        graphics.fillStyle(0xcccccc);
        graphics.fillRoundedRect(0, 0, WIDTH/2, 192, 32);
        graphics.fillPath();

        const makeGraphics = this.make.graphics();
        makeGraphics.fillStyle(0xffffff);
        makeGraphics.fillRoundedRect(0, 0, 192, 192, 32);
        makeGraphics.fillPath();
        const mask = makeGraphics.createGeometryMask();
        var icon=this.add.image(0,0,'icon').setOrigin(0).setMask(mask);
        var AddtoHomeScreen = this.add.text(icon.width + 10, 40, 'Add to Home Screen', { font: '20px Courier', fill: '#000000' }).setShadow(1, 1, '#ffffff');
        var close = this.add.text(icon.width + 90, icon.height-50, 'Close', { font: '20px Courier', fill: '#000000' }).setShadow(1, 1, '#ffffff');
        
        this.setButton(AddtoHomeScreen,()=>{
            addToHomeScreen();
        });
        this.setButton(close,()=>{
            this.release();
        });
    }

    setButton(btn,callback){
        const color = 0xcccccc;
        const donw_alpha = 1;
        btn.setInteractive();
        btn.on('pointerover', function (event) {
            btn.setTint(color);
            btn.setAlpha(donw_alpha);
        });
        btn.on('pointerout', function (event) {
            btn.clearTint();
            btn.setAlpha(1);
        });
        btn.on('pointerdown', function (event) {
            btn.setTint(color);
            btn.setAlpha(donw_alpha);
        });
        btn.on('pointerup', function (event) {
            callback();
        });
    }
}