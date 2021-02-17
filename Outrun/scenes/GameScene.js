class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
        });
        this.bounds=new Phaser.Geom.Rectangle(0,0,this.width/2,this,this.height);
    }

    create(){
        eventsCenter.on('keyup', this.onKeyCode, this);
        this.width = this.game.config.width;
        this.height = this.game.config.height;
   
        this.texture = this.textures.createCanvas('myCanvas', this.width, this.height);
        this.add.image(0, 0, 'myCanvas').setOrigin(0);;
        this.resetRoad();
        
        this.bg2 = this.add.tileSprite(0, 0, 500, 17, 'bg2').setScale(5,9)
            .setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, 500, 17, 'bg1').setScale(5,9)
            .setOrigin(0, 0);

        this.player = Player.create(this,this.width/2,240);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(150, 30)
    }
    
    onKeyCode(event){
        if (this.player.anims.getName() != 'player_idle')return;
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.play('player_left');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x-50,
                    duration:500,
                    onUpdate:function(tween,targets){
                        playerX-=0.001;
                        this.bg1.tilePositionX -=0.3; 
                        this.bg2.tilePositionX -=0.1;  
                    }.bind(this),
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.play('player_right');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x+50,
                    duration:500,
                    onUpdate:function(tween,targets){
                        playerX+=0.001;
                        this.bg1.tilePositionX +=0.3; 
                        this.bg2.tilePositionX +=0.1;  
                    }.bind(this),
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
        }
    }

    update(){
        position = Util.increase(position, 100 * speed, trackLength);

        this.renderSegment(this.texture.context,this.width, this.height,position);
        this.texture.refresh();
    }

    resetRoad() {
        position=0;
        segments = [];
        for(var n = 0 ; n < 500 ; n++) {
          segments.push({
             index: n,
             p1: { world: { z:  n   *segmentLength }, camera: {}, screen: {} },
             p2: { world: { z: (n+1)*segmentLength }, camera: {}, screen: {} },
             color: Math.floor(n/rumbleLength)%2 ? COLORS.DARK : COLORS.LIGHT
          });
        }
        trackLength = segments.length * segmentLength;
    }

    findSegment(z) {
        return segments[Math.floor(z/segmentLength) % segments.length];
    }

    renderSegment(ctx,width,height,position) {
      var baseSegment = this.findSegment(position);
      var maxy        = height;

      ctx.clearRect(0, 0, width, height);
      var n, segment;
      
      for(n = 0 ; n < drawDistance ; n++) {
        segment        = segments[(baseSegment.index + n) % segments.length];
        segment.looped = segment.index < baseSegment.index;
        segment.fog    = Util.exponentialFog(n/drawDistance, fogDensity);
        Util.project(segment.p1, (playerX * roadWidth), cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);
        Util.project(segment.p2, (playerX * roadWidth), cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);

        if ((segment.p1.camera.z <= cameraDepth) || // behind us
            (segment.p2.screen.y >= maxy))          // clip by (already rendered) segment
          continue;
          
        this.segment(ctx, width, lanes,
                       segment.p1.screen.x,
                       segment.p1.screen.y,
                       segment.p1.screen.w,
                       segment.p2.screen.x,
                       segment.p2.screen.y,
                       segment.p2.screen.w,
                       segment.fog,
                       segment.color);

        maxy = segment.p2.screen.y;
      }
    }

    segment(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {
      var r1 = this.rumbleWidth(w1, lanes),
          r2 = this.rumbleWidth(w2, lanes),
          l1 = this.laneMarkerWidth(w1, lanes),
          l2 = this.laneMarkerWidth(w2, lanes),
          lanew1, lanew2, lanex1, lanex2, lane;
          this.texture.context.fillStyle = '#ff0000'; 
      ctx.fillStyle = color.grass;
      ctx.fillRect(0, y2, width, y1 - y2);
      
      this.polygon(ctx, x1-w1-r1, y1, x1-w1, y1, x2-w2, y2, x2-w2-r2, y2, color.rumble);
      this.polygon(ctx, x1+w1+r1, y1, x1+w1, y1, x2+w2, y2, x2+w2+r2, y2, color.rumble);
      this.polygon(ctx, x1-w1,    y1, x1+w1, y1, x2+w2, y2, x2-w2,    y2, color.road);
      
      if (color.lane) {
        lanew1 = w1*2/lanes;
        lanew2 = w2*2/lanes;
        lanex1 = x1 - w1 + lanew1;
        lanex2 = x2 - w2 + lanew2;
        for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++)
        this.polygon(ctx, lanex1 - l1/2, y1, lanex1 + l1/2, y1, lanex2 + l2/2, y2, lanex2 - l2/2, y2, color.lane);
      }
    }

    polygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.fill();
    }

    rumbleWidth(projectedRoadWidth, lanes) 
    { return projectedRoadWidth/Math.max(6,  2*lanes); }
    
    laneMarkerWidth(projectedRoadWidth, lanes) 
    { return projectedRoadWidth/Math.max(32, 8*lanes); }
}