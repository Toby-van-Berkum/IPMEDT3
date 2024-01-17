let hitboxBehind, rod, hitboxFront;

document.addEventListener('DOMContentLoaded', () => {
  //physics
  hitboxBehind = document.getElementById("hitbox-behind");
  rod = document.getElementById("fishing-rod");
  hitboxFront = document.getElementById("hitbox-front");

  rod.object3D.position.set(0, 1.8, 0);
  hitboxBehind.object3D.position.set(0, 2.5, 2);
  hitboxFront.object3D.position.set(0, 1.5, -1);

  // console.log(rod.object3D.position, hitboxBehind.object3D.position, hitboxFront.object3D.position);

  loop();
});

function loop() {
  const currentPosition = rod.object3D.position;
  rod.object3D.position.set(currentPosition.x, currentPosition.y, currentPosition.z);

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
  // console.log("1", xobj1, yobj1, zobj1, "2", xobj2, yobj2, zobj2);

  let distance = Math.sqrt((xobj2 - xobj1) ** 2 + (yobj2 - yobj1) ** 2 + (zobj2 - zobj1) ** 2);
  


  return distance < 1; // 1m
}