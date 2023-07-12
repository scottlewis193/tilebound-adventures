import {c,canvas,devicePixelRatio} from '../common.js'

    var spinWheel
    var isSpinning = false
    
    export function defineWheel() {
        spinWheel = new Winwheel(
            {'numSegments' : 2,
            'textFontSize' : 30*devicePixelRatio,
            'centerX' : (innerWidth / 2)*devicePixelRatio,
            'centerY' : (innerHeight / 2)*devicePixelRatio,
            'outerRadius' : (innerHeight/2)*devicePixelRatio - 50,
            'segments' : [
                {'size' : 90, 'text' : 'Win', 'fillStyle' : '#89f26e'},
                {'size' : 270, 'text' : 'Lose', 'fillStyle' : '#e7706f'}
            ],
            'animation' :
                {
                    // Must be specified...
                    'type'     : 'spinToStop',
                    'duration' : 10,
         
                    // These are the defaults, all optional...
                    'spins'        : 5,
                    'easing'       : 'Power4.easeOut',
                    'stopAngle'    : 55,
                    'direction'    : 'clockwise',
                    'repeat'       : 0,
                    'yoyo'         : false,
                    'callbackAfter' : function() {drawWheelPointer()}
                }
        
            
            });
        
    }

    function drawWheelPointer() {
        c.strokeStyle = '#000000';     // Set line colour.
        c.fillStyle   = 'aqua';        // Set fill colour.
        c.lineWidth   = 2;
        c.beginPath();                 // Begin path.
        let sizeX = (canvas.height/25)*devicePixelRatio
        let initialPosX = (canvas.width/2)-(sizeX/2)
        let initialPosY = 0
        
        c.moveTo(initialPosX, initialPosY);             // Move to initial position.
        c.lineTo(initialPosX+sizeX, initialPosY);             // Draw lines to make the shape.
        c.lineTo(initialPosX+(sizeX/2), initialPosY+sizeX);
        c.lineTo(initialPosX+1, initialPosY);
        c.stroke();                    // Complete the path by stroking (draw lines).
        c.fill();                      // Then fill with colour.
    }

    export function drawWheel() {
        spinWheel.draw()
        drawWheelPointer()
    }

    export function toggleAnimation() {
       if (isSpinning) { 
        spinWheel.stopAnimation()
     } else { 
        spinWheel.startAnimation() 
    }
    isSpinning = !isSpinning
    }




