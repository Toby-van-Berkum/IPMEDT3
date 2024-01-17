document.addEventListener('DOMContentLoaded', () => {

   //physics
   let hitboxBehind, rod, hitboxFront;

   window.onload = function() {
     hitboxBehind = document.getElementById("hitbox-behind");
     rod = document.getElementById("fishing-rod");
     hitboxFront = document.getElementById("hitbox-front");
   
 
   
     loop();
   }
   
   function loop() {
    //  if (true) {
    //    z+=dz; 
    //    rod.object3D.position.z = z;
    //  }
     if (collision(rod, hitboxBehind)) {
       hitboxBehind.remove();
       console.log("hit1");
     }
     if (collision(rod, hitboxFront)) {
      hitboxFront.remove();
      console.log("hit2");
    }
    
   
     setTimeout(loop, 10);
   }
   
   function collision(obj1, obj2) {
    let xobj1 = obj1.object3D.position.x;
    let yobj1 = obj1.object3D.position.y;
    let zobj1 = obj1.object3D.position.z;
    let xobj2 = obj2.object3D.position.x;
    let yobj2 = obj2.object3D.position.y;
    let zobj2 = obj2.object3D.position.z;
  
    let distance = Math.sqrt((xobj2 - xobj1) ** 2 + (yobj2 - yobj1) ** 2 + (zobj2 - zobj1) ** 2);


    return distance < 0.01; // 1m
  }

});