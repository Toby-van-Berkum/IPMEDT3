// function setupCollisionEvents() {
//   const fishingRod = document.getElementById("fishing-rod");
//   fishingRod.addEventListener("collide", handleCollision);
// }

// function handleCollision(event) {
//   console.log("Collision detected:", event);

//   const element = event.detail.target; // The element that was hit

//   if (element.id === "hitbox-front") {
//     console.log("Collision with hitbox-front");
//   } else if (element.id === "hitbox-behind") {
//     console.log("Collision with hitbox-behind");
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   setupCollisionEvents();
// })

AFRAME.registerComponent('collision-check', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', this.handleIntersect.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.handleIntersectCleared.bind(this));
  },
  handleIntersect: function (event) {
    // Fishing rod is inside the check area
    console.log('Fishing rod is inside the check area');
  },
  handleIntersectCleared: function (event) {
    // Fishing rod is no longer inside the check area
    console.log('Fishing rod is outside the check area');
  }
});
