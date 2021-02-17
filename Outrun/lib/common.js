var Util = {
    timestamp:        function()                  { return new Date().getTime();                                    },
    toInt:            function(obj, def)          { if (obj !== null) { var x = parseInt(obj, 10); if (!isNaN(x)) return x; } return Util.toInt(def, 0); },
    toFloat:          function(obj, def)          { if (obj !== null) { var x = parseFloat(obj);   if (!isNaN(x)) return x; } return Util.toFloat(def, 0.0); },
    limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));                     },
    randomInt:        function(min, max)          { return Math.round(Util.interpolate(min, max, Math.random()));   },
    randomChoice:     function(options)           { return options[Util.randomInt(0, options.length-1)];            },
    percentRemaining: function(n, total)          { return (n%total)/total;                                         },
    accelerate:       function(v, accel, dt)      { return v + (accel * dt);                                        },
    interpolate:      function(a,b,percent)       { return a + (b-a)*percent                                        },
    easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
    easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
    easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },
    exponentialFog:   function(distance, density) { return 1 / (Math.pow(Math.E, (distance * distance * density))); },
  
    increase:  function(start, increment, max) { // with looping
      var result = start + increment;
      while (result >= max)
        result -= max;
      while (result < 0)
        result += max;
      return result;
    },
  
    project: function(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
      p.camera.x     = (p.world.x || 0) - cameraX;
      p.camera.y     = (p.world.y || 0) - cameraY;
      p.camera.z     = (p.world.z || 0) - cameraZ;
      p.screen.scale = cameraDepth/p.camera.z;
      p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
      p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
      p.screen.w     = Math.round(             (p.screen.scale * roadWidth   * width/2));
    },
  
    overlap: function(x1, w1, x2, w2, percent) {
      var half = (percent || 1)/2;
      var min1 = x1 - (w1*half);
      var max1 = x1 + (w1*half);
      var min2 = x2 - (w2*half);
      var max2 = x2 + (w2*half);
      return ! ((max1 < min2) || (min1 > max2));
    }  
}

var COLORS = {
  SKY:  '#72D7EE',
  TREE: '#005108',
  FOG:  '#005108',
  LIGHT:  { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#CCCCCC'  },
  DARK:   { road: '#696969', grass: '#009A00', rumble: '#BBBBBB'                   },
  START:  { road: 'white',   grass: 'white',   rumble: 'white'                     },
  FINISH: { road: 'black',   grass: 'black',   rumble: 'black'                     }
};

var fps           = 60;                      // how many 'update' frames per second
var step          = 1/fps;                   // how long is each frame (in seconds)
var width         = 1024;                    // logical canvas width
var height        = 768;                     // logical canvas height
var segments      = [];                      // array of road segments
var background    = null;                    // our background image (loaded below)
var sprites       = null;                    // our spritesheet (loaded below)
var resolution    = null;                    // scaling factor to provide resolution independence (computed)
var roadWidth     = 1000;                    // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
var segmentLength = 200;                     // length of a single segment
var rumbleLength  = 3;                       // number of segments per red/white rumble strip
var trackLength   = null;                    // z length of entire track (computed)
var lanes         = 2;                       // number of lanes
var fieldOfView   = 100;                     // angle (degrees) for field of view
var cameraHeight  = 1000;                    // z height of camera
var cameraDepth   = 1;                    // z distance camera is from screen (computed)
var drawDistance  = 300;                     // number of segments to draw
var playerX       = 0;                       // player x offset from center of road (-1 to 1 to stay independent of roadWidth)
var playerZ       = null;                    // player relative z distance from camera (computed)
var fogDensity    = 5;                       // exponential fog density
var position      = 0;                       // current camera Z position (add playerZ to get player's absolute Z position)
var speed         = 10;                       // current speed
var maxSpeed      = segmentLength/step;      // top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier)
var accel         =  maxSpeed/5;             // acceleration rate - tuned until it 'felt' right
var breaking      = -maxSpeed;               // deceleration rate when braking
var decel         = -maxSpeed/5;             // 'natural' deceleration rate when neither accelerating, nor braking
var offRoadDecel  = -maxSpeed/2;             // off road deceleration is somewhere in between
var offRoadLimit  =  maxSpeed/4;  