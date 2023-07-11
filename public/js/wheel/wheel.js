function drawTriangle()
{
    c.strokeStyle = '#000000';     // Set line colour.
    c.fillStyle   = 'aqua';        // Set fill colour.
    c.lineWidth   = 2;
    c.beginPath();                 // Begin path.
    let sizeX = 60
    let initialPosX = (innerWidth/2)-sizeX
    
    c.moveTo(initialPosX, sizeX/3);             // Move to initial position.
    c.lineTo(initialPosX+sizeX, sizeX/3);             // Draw lines to make the shape.
    c.lineTo(initialPosX+(sizeX/2), sizeX+(sizeX/3));
    c.lineTo(initialPosX+1, sizeX/3);
    c.stroke();                    // Complete the path by stroking (draw lines).
    c.fill();                      // Then fill with colour.
}