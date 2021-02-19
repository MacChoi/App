class LoadFileText {
    static progress(scene){
        scene.width = scene.game.config.width;
        scene.height = scene.game.config.height;

        var loadingText = scene.make.text({
            x: scene.width / 2,
            y: scene.height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = scene.make.text({
            x: scene.width / 2,
            y: scene.height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = scene.make.text({
            x: scene.width / 2,
            y: scene.height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
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
        });      
    }
}