class LoadFile {
    static progress(scene,callback){
        scene.width = scene.game.config.width;
        scene.height = scene.game.config.height;

        var loadingText = scene.make.text({
            x: scene.width / 2,
            y: scene.height / 2 +200,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#00ff00'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = scene.make.text({
            x: scene.width / 2,
            y: scene.height / 2 +230,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#00ff00'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = scene.make.text({
            x: scene.width / 2,
            y: scene.height / 2 + 280,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#00ff00'
            }
        });
        
        assetText.setOrigin(0.5, 0.5);
        scene.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
        });
        
        scene.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        
        scene.load.on('complete', function () {
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            callback();
        }.bind(this));      
    }
}