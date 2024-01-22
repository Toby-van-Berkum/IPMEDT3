document.addEventListener("DOMContentLoaded", () => {
    var hitboxFront = document.getElementById("hitbox-front");
    var hitboxBehind = document.getElementById("hitbox-behind"); 
    var dobber = document.getElementById("dobber");

    loop();

    function loop() {
        var hitboxFrontColor = hitboxFront.getAttribute("color");
        
        if (hitboxFrontColor == "green") {
            console.log("good!");
            dobber.setAttribute("visible", "true");
            dobber.setAttribute("position", "1 1 1");

        }

        setTimeout(loop, 10);
    }
});
