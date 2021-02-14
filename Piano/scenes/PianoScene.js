class Note{
    constructor (index,key,sound) {
        this.key = key;
        this.sound = sound;
        this.index = index;
        this.x = index * 31 + 20;
    }
}
class PianoScene extends Phaser.Scene{
    static MAX_VOLUME =1;
    static MIN_VOLUME = 0.5;
    static COLOR = Phaser.Display.Color.HSVColorWheel();
    static COLOR_POINTER_UP = 0xd2d2d2;
    static NOTE_KEYS_WIDTH = 372;
    static NOTE_KEYS_HEIGHT= 400;
    static KeyMap = new Map();

    constructor(){
        super({
            key:'PianoScene',
            active:true
        });

        this.width = game.config.width;
        this.height = game.config.height;

        eventsCenter.on('playKey', this.playKey, this);
        eventsCenter.on('stopKey', this.stopKey, this);
    }

    preload(){
        this.load.setPath('./assets/images');
        this.load.atlas('piano', 'piano/piano.png', 'piano/piano.json');
        this.load.image('key13', 'piano/key13.png');//C7 note
    
        this.pianoNoteTable = ['C','Cs','D','Ds','E','F','Fs','G','Gs','A','As','B','C']
  
        for (var j = 2; j < 7; j++){
            for (var i = 0; i < this.pianoNoteTable.length; i++){
                var NoteName = this.pianoNoteTable[i] + j;
                this.load.audio(NoteName, 'piano/'+NoteName + '.mp3');
            }
        }
        this.load.audio('C7', 'piano/C7.mp3');//C7 note
    }

    create(){
        if (this.sound.locked){
            var text = this.add.text(10, 10, 'Tap to unlock audio', { font: '16px Courier', fill: '#00ff00' });
    
            this.sound.once('unlocked', function ()
            {
                text.destroy();
                this.createKeyboard();
            }, this);
        }
        else{
            this.createKeyboard();
        }
    }

    playKey(note){
        var note = PianoScene.KeyMap.get(note);
        if(note == null )return;
        var color = PianoScene.COLOR[note.index * 5].color;
        note.key.setTintFill(color);
        note.sound.setVolume(PianoScene.MAX_VOLUME);
        note.sound.play();
    }

    stopKey(note){
        var note = PianoScene.KeyMap.get(note);
        if(note == null )return;
        note.key.setTint(PianoScene.COLOR_POINTER_UP);
        note.sound.setVolume(PianoScene.MIN_VOLUME);
    }

    createKeyboard(){
        var panel_X = 0;
        var panel_Y = this.height - PianoScene.NOTE_KEYS_HEIGHT;
            
        var black = [ 'key2', 'key4', 'key7', 'key9', 'key11' ];
        var index = 0;
        for (var j = 0; j < 5; j++){
            for (var i = 0; i < this.pianoNoteTable.length; i++){
                var key = 'key' + (i + 1);
                var note = this.pianoNoteTable[i] + (j + 2);//C2 start note 2++
                var singleKey;
                //C7 note
                if(j == 4 && i == 12){
                    key = 'key13';
                    note = 'C7';
                    panel_X = PianoScene.NOTE_KEYS_WIDTH;
                    singleKey = this.add.image((j*PianoScene.NOTE_KEYS_WIDTH)+panel_X, panel_Y, 'key13');
                }else {
                    singleKey = this.add.image((j*PianoScene.NOTE_KEYS_WIDTH)+panel_X, panel_Y, 'piano', key);
                }
                singleKey.setTint(PianoScene.COLOR_POINTER_UP);
                singleKey.setScale(0.62);
                singleKey.setName(note);
                singleKey.setOrigin(0);
      
                if (black.indexOf(key) !== -1){
                    singleKey.setDepth(1);
                }

                var frame = singleKey.frame;
                var hitArea = new Phaser.Geom.Rectangle(frame.x, frame.y, frame.width, frame.height);

                singleKey.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
                var sound = this.sound.add(note);
                
                singleKey.on('pointerdown', function (note){
                    this.playKey(note);
                }.bind(this,note));

                singleKey.on('pointerover', function (note,pointer){
                    if (pointer.isDown){
                        this.playKey(note);
                    }   
                }.bind(this,note));

                singleKey.on('pointerup', function (note){
                    this.stopKey(note);
                }.bind(this,note));

                singleKey.on('pointerout', function (note){
                    this.stopKey(note);
                }.bind(this, note));
          
                PianoScene.KeyMap.set(note,new Note(index++,singleKey,sound)); 

                if(j < 4 && i == 11){//C7 note
                    break;
                }
            }
        }
    }
};