AFRAME.registerComponent('collision-check', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', this.handleIntersect.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.handleIntersectCleared.bind(this));
  },
  tick: function () {
    const intersectedEls = this.el.components.raycaster.intersectedEls;

    if (intersectedEls.length > 0) {
      intersectedEls.forEach(intersectedEl => {
        if (intersectedEl.id === 'hitbox-front') {
          console.log('Element is in front hitbox');
        }
        else if (intersectedEl.id === 'hitbox-behind') {
          console.log('Element is in behind hitbox');
        }
      });
    } else {
      // console.log('Element is outside the check area');
    }
  },
  handleIntersect: function (event) {
    // This function can be empty, or you can add specific handling when intersected
  },
  handleIntersectCleared: function (event) {
    // This function can be empty, or you can add specific handling when intersected is cleared
  }
});