
var wheel = {
    spinWheel : null,
    isSpinning : false,
    
    defineWheel(wheelOptions, spinFinishedFunc) {
        let _animation = wheelOptions.animation
        _animation['callbackAfter'] = function() {wheel.drawWheelPointer()}
        _animation['callbackFinished'] = spinFinishedFunc
        spinWheel = new Winwheel(
            {'numSegments' : wheelOptions.numSegments,
            'canvasId' : wheelOptions.canvasId,
            'textFontSize' : 30,
            'centerX' : (innerWidth / 2),
            'centerY' : (innerHeight / 2),
            'outerRadius' : (innerHeight/2) - 50,
            'segments' : wheelOptions.segments,
            'animation' : _animation    
            });
        
    },

    defineOverworldWheelSeq(backEndWheelsOptions,phaseNo = 0,monsterProps = {}) {

        if (phaseNo > backEndWheelsOptions.length -1) {
            wheel.spinWheel = null; 
            displayEventText(monsters.getLastSpawned().name + ' has spawned'); 
            return
        }

        let _animation = backEndWheelsOptions[phaseNo].animation


        //recursion until all wheels have been spun
        _animation['callbackFinished'] = function() {wheel.defineOverworldWheelSeq(backEndWheelsOptions,phaseNo + 1)}

  


        _animation['callbackAfter'] = function() {wheel.drawWheelPointer(); wheel.applySizing()}

        
        wheel.spinWheel = new Winwheel(
            {'numSegments' : backEndWheelsOptions[phaseNo].numSegments,
            'canvasId' : backEndWheelsOptions[phaseNo].canvasId,
            'centerX' : (innerWidth / 2),
            'centerY' : ((innerHeight / 2)-50),
            'outerRadius' : (innerHeight < innerWidth) ? ((innerHeight/2)- 100)  : ((innerWidth/2)-100) ,
            'segments' : backEndWheelsOptions[phaseNo].segments,
            'textFontSize' : (((innerHeight < innerWidth) ? ((innerHeight/2)- 100) : ((innerWidth/2)-100))/8),
            'animation' : _animation    
            })

        //if spawn monster is no then don't bother spinning other wheels
        if (phaseNo == 0 && wheel.getSegmentAtStopAngle().text == 'No') {
            wheel.spinWheel.animation['callbackFinished'] = function() {wheel.spinWheel = null; displayEventText('No monster has spawned'); return;}
        }

        wheel.spinWheel.startAnimation()

    },

    getSegmentAtStopAngle() {
        let indicatedPrize = 0;
        let rawAngle = wheel.spinWheel.getRotationPosition();
    
        // Now we have the angle of the wheel, but we need to take in to account where the pointer is because
        // will not always be at the 12 o'clock 0 degrees location.
        let relativeAngle = Math.floor(wheel.spinWheel.animation.stopAngle - rawAngle);
    
        if (relativeAngle < 0) {
            relativeAngle = 360 - Math.abs(relativeAngle);
        }
    
        // Now we can work out the prize won by seeing what prize segment startAngle and endAngle the relativeAngle is between.
        for (let x = 1; x < (wheel.spinWheel.segments.length); x ++) {
            if ((relativeAngle >= wheel.spinWheel.segments[x]['startAngle']) && (relativeAngle <= wheel.spinWheel.segments[x]['endAngle'])) {
                indicatedPrize = x;
                break;
            }
        }

        return wheel.spinWheel.segments[indicatedPrize]

    },

    drawWheelPointer() {
        fgC.strokeStyle = '#000000';     // Set line colour.
        fgC.fillStyle   = 'aqua';        // Set fill colour.
        fgC.lineWidth   = 2;
        fgC.beginPath();                 // Begin path.
        let sizeX = (fgCanvas.height/25)
        let initialPosX = (fgCanvas.width/2)-(sizeX/2)
        let initialPosY = wheel.spinWheel['centerY'] - wheel.spinWheel['outerRadius'] - (sizeX / 2)
        
        fgC.moveTo(initialPosX, initialPosY);             // Move to initial position.
        fgC.lineTo(initialPosX+sizeX, initialPosY);             // Draw lines to make the shape.
        fgC.lineTo(initialPosX+(sizeX/2), initialPosY+sizeX);
        fgC.lineTo(initialPosX+1, initialPosY);
        fgC.stroke();                    // Complete the path by stroking (draw lines).
        fgC.fill();                      // Then fill with colour.
    },

    applySizing() {
        wheel.spinWheel['centerX'] = (innerWidth / 2)
        wheel.spinWheel['centerY'] = ((innerHeight / 2)-50)
        wheel.spinWheel['outerRadius'] = (innerHeight < innerWidth) ? ((innerHeight/2)- 100) : ((innerWidth/2)-100)
        wheel.spinWheel['textFontSize'] = (((innerHeight < innerWidth) ? ((innerHeight/2)- 100) : ((innerWidth/2)-100))/8)
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