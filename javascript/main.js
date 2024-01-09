window.onload = () => {
    cameraRig.setAttribute('position', { x: 0, y: -0.2, z: 0 }); 

    AFRAME.registerComponent('thumbstick-logging', {
      init: function () {
        this.el.addEventListener('thumbstickmoved', this.movePlayer.bind(this));
      },
      movePlayer: function (evt) {
        // Adjust the player's position based on thumbstick movement
        const cameraRig = this.el;
        const speed = 0.01; // Adjust the speed as needed

        const newPosition = {
          x: cameraRig.getAttribute('position').x + evt.detail.x * speed,
          y: cameraRig.getAttribute('position').y,
          z: cameraRig.getAttribute('position').z + evt.detail.y * speed
        };

        cameraRig.setAttribute('position', newPosition);
      }
    });
  };