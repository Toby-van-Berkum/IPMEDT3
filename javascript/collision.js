AFRAME.registerComponent('collision-check', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', this.handleIntersect.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.handleIntersectCleared.bind(this));
  },
  tick: function () {
    // Always check for intersections
    const isIntersecting = this.el.components.raycaster.intersectedEls.length > 0;

    if (isIntersecting) {
      console.log('Fishing rod is inside the check area');
      document.getElementById("hitbox-front").setAttribute("color", "green")
      document.getElementById("hitbox-behind").setAttribute("color", "green")
    } else {
      console.log('Fishing rod is outside the check area');
      document.getElementById("hitbox-behind").setAttribute("color", "red")
      document.getElementById("hitbox-front").setAttribute("color", "red")
    }
  },
  handleIntersect: function (event) {
    // This function can be empty, or you can add specific handling when intersected
  },
  handleIntersectCleared: function (event) {
    // This function can be empty, or you can add specific handling when intersected is cleared
  }
});
