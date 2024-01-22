AFRAME.registerComponent('collision-check', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', this.handleIntersect.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.handleIntersectCleared.bind(this));
    this.howTo = document.getElementById('howTo');
    //tickcounter is used as timer
    this.tickCounter = 0;
    //firstHit is used to register wether the rear hitbox has been hit or not
    this.firstHit = false;

  },
  tick: function () {
    const intersectedEls = this.el.components.raycaster.intersectedEls;


    if (intersectedEls.length > 0) {
      intersectedEls.forEach(intersectedEl => {
        //checks for collision with the rear hitbox
        if (intersectedEl.id === 'hitbox-behind') {
          console.log('Element is in rear hitbox');
          this.tickCounter = 0;
          this.firstHit = true;
          document.getElementById('howTo').setAttribute('value', 'Zwaai nu je hengel in een boog over \nje hooft naar voren om in te gooien!')

        }
        //checks for collision with the front hitbox
        if (intersectedEl.id === 'hitbox-front' && this.tickCounter < 300 && this.firstHit == true) {
          console.log("good throw");
          document.getElementById('howTo').setAttribute('value', 'Goed gedaan!\nNu is het wachten tot dat je beet hebt.\nAls je ziet dat de dobber het water in wordt getrokken trek je de hengel om hoog om \nde vis in te haken!')
          this.firstHit = false;
        }
      });
    }

    //counts the amount of ticks that have past and resets after 10 seconds
    this.tickCounter++;
    if (this.tickCounter >1000) {
      this.tickCounter = 0;
    }
  },
  handleIntersect: function (event) {
    // This function can be empty, or you can add specific handling when intersected
  },
  handleIntersectCleared: function (event) {
    // This function can be empty, or you can add specific handling when intersected is cleared
  }
});
