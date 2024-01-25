AFRAME.registerComponent('constant-gripdown', {
    init: function () {
      this.el.addEventListener('loaded', () => {
        // Use a timer to repeatedly trigger grip events
        setInterval(() => {
          this.el.emit('triggerdown');
        }, 100);
      });
    }
  });