
var wheel = {
    spinWheel : null,
    isSpinning : false,
    
    defineWheel(wheelOptions, spinFinishedFunc) {
        let _animation = wheelOptions.animation
        _animation['callbackAfter'] = function() {wheel.drawWheelPointer()}
        _animation['callbackFinished'] = spinFinishedFunc
        spinWheel = new Winwheel(
            {'numSegments' : wheelOptions.numSegments,
            'textFontSize' : 30*devicePixelRatio,
            'centerX' : (innerWidth / 2)*devicePixelRatio,
            'centerY' : (innerHeight / 2)*devicePixelRatio,
            'outerRadius' : (innerHeight/2)*devicePixelRatio - 50,
            'segments' : wheelOptions.segments,
            'animation' : _animation    
            });
        
    },

    defineOverworldWheelSeq(backEndWheelsOptions,phaseNo = 0) {

        if (phaseNo > backEndWheelsOptions.length -1) {wheel.spinWheel = null; return}

        let _animation = backEndWheelsOptions[phaseNo].animation

        _animation['callbackFinished'] = function() {wheel.defineOverworldWheelSeq(backEndWheelsOptions,phaseNo + 1)}

  


        _animation['callbackAfter'] = function() {wheel.drawWheelPointer()}

        
        wheel.spinWheel = new Winwheel(
            {'numSegments' : backEndWheelsOptions[phaseNo].numSegments,
            'textFontSize' : 30*devicePixelRatio,
            // 'centerX' : (innerWidth / 2)*devicePixelRatio,
            // 'centerY' : (innerHeight / 2)*devicePixelRatio,
            'centerX' : (innerWidth / 2)*devicePixelRatio,
            'centerY' : ((innerHeight / 2)-50)*devicePixelRatio,
            'outerRadius' : (innerHeight < innerWidth) ? ((innerHeight/2)- 100)*devicePixelRatio  : ((innerWidth/2)-100)*devicePixelRatio ,
            'segments' : backEndWheelsOptions[phaseNo].segments,
            'animation' : _animation    
            })

        if (phaseNo == 0 && wheel.spinWheel.getIndicatedSegment().text == 'No') {_animation['callbackFinished'] = function() {wheel.spinWheel = null}}

        wheel.spinWheel.startAnimation()

    },

    drawWheelPointer() {
        c.strokeStyle = '#000000';     // Set line colour.
        c.fillStyle   = 'aqua';        // Set fill colour.
        c.lineWidth   = 2;
        c.beginPath();                 // Begin path.
        let sizeX = (canvas.height/25)*devicePixelRatio
        let initialPosX = (canvas.width/2)-(sizeX/2)
        let initialPosY = (canvas.width < canvas.height) ? (canvas.height/2) : 35*devicePixelRatio
        
        c.moveTo(initialPosX, initialPosY);             // Move to initial position.
        c.lineTo(initialPosX+sizeX, initialPosY);             // Draw lines to make the shape.
        c.lineTo(initialPosX+(sizeX/2), initialPosY+sizeX);
        c.lineTo(initialPosX+1, initialPosY);
        c.stroke();                    // Complete the path by stroking (draw lines).
        c.fill();                      // Then fill with colour.
    },

    drawWheel: function() {
        if(wheel.spinWheel !== null ){
            wheel.spinWheel.draw()
            wheel.drawWheelPointer()
            }
        },

    toggleAnimation: function() {
        console.log(wheel.isSpinning)
        if (wheel.isSpinning) { 
            wheel.spinWheel.stopAnimation()
        } else { 
            wheel.spinWheel.startAnimation() 
        }
        wheel.isSpinning = !wheel.isSpinning
        }




}