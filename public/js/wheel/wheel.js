function drawTriangle()
{
    c.strokeStyle = '#000000';     // Set line colour.
    c.fillStyle   = 'aqua';        // Set fill colour.
    c.lineWidth   = 2;
    c.beginPath();                 // Begin path.
    let initialPosX = (innerWidth/2)-30
    c.moveTo(initialPosX, 20);             // Move to initial position.
    c.lineTo(initialPosX+60, 20);             // Draw lines to make the shape.
    c.lineTo(initialPosX+30, 80);
    c.lineTo(initialPosX+1, 20);
    c.stroke();                    // Complete the path by stroking (draw lines).
    c.fill();                      // Then fill with colour.
}