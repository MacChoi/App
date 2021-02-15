class ComboTextScene extends Phaser.Scene{
    constructor(){
        super({
            key:'ComboTextScene',
            active:true
        });
      }

    preload(){
 
    }

    create(){
        this.add.text(250, 20, 'Combo 1 : ↓ + → + A', { color: '#ffff00' });
        this.add.text(250, 40, 'Combo 2 : ↑ + ↓ + A', { color: '#ffff00' });
        this.add.text(250, 60, 'Combo 3 : → + ↓ + ← + A', { color: '#ffff00' });
    }
}