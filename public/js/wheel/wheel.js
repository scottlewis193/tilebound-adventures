function drawTriangle()
{
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