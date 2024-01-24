AFRAME.registerComponent('collision-check', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', this.handleIntersect.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.handleIntersectCleared.bind(this));
    this.initialPosition = this.el.getAttribute('position');
    this.howTo = document.getElementById('howTo');
    //tickcounter is used as timer
    this.tickCounter = 0;
    //firstHit is used to register wether the rear hitbox has been hit or not
    this.firstHit = false;
    this.goodThrow = false;
    this.goodCatch = true;

    const originalAttributes = dobber.attributes;
    
    this.el.addEventListener("grab-start", (e) => {
      if (e.detail.buttonEvent.type === "gripdown") {
        // Assuming the box has the dynamic-body component
        const dobber = document.getElementById('dobber');
        const fishing_rod = document.getElementById('fishing-rod');
        if (dobber.components['dynamic-body']) {
          // Remove the constraint attribute
          fishing_rod.removeAttribute('constraint');
          // Adjust the velocity as needed
          const velocity = new THREE.Vector3(0, 2, -5);
          dobber.components['dynamic-body'].body.velocity.copy(velocity);
        }
      }
    });

    this.el.addEventListener("grab-end", (e) => {
      if (e.detail.buttonEvent.type === "gripup") {
        // Add the constraint attribute back with target #fishing-rod
        const fishingRod = document.getElementById('fishing-rod');
        const dobber = document.getElementById('dobber');

        dobber.parentNode.removeChild(dobber);
    
        const newDobber = document.createElement('a-entity');
        for (let i = 0; i < originalAttributes.length; i++) {
          const attribute = originalAttributes[i];
          newDobber.setAttribute(attribute.name, attribute.value);
        }
    
        // Attach the new dobber to the fishing-rod
        fishingRod.appendChild(newDobber);

        fishingRod.setAttribute('constraint', {
          target: '#dobber',
          collideConnected: 'false',
        });
      }
    });
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
          document.getElementById('howTo').setAttribute('value', 'Zwaai nu je hengel in een boog over \nje hooft naar voren om in te gooien!');

        }
        //checks for collision with the front hitbox
        if (intersectedEl.id === 'hitbox-front' && this.tickCounter < 300 && this.firstHit == true) {
          console.log("good throw");
          document.getElementById('howTo').setAttribute('value', 'Goed gedaan!\nNu is het wachten tot dat je beet hebt.\nAls je ziet dat de dobber het water in wordt getrokken trek je de hengel om hoog om \nde vis in te haken!');
          this.firstHit = false;
          this.goodThrow = true;
        }

        //checks for collision with mid hitbox
        if (intersectedEl.id === 'hitbox-mid' && this.goodThrow == true && this.goodCatch == true) {
          document.getElementById('howTo').setAttribute('value', 'Goed gedaan! Je hebt een vis gevangen!');
          console.log('ur mom');
        }
      });
    }

    //counts the amount of ticks that have past and resets after 10 seconds
    this.tickCounter++;
    if (this.tickCounter >300) {
      this.tickCounter = 0;
      this.firstHit = false;

      //resets text message in case of bad throw
      if (this.goodThrow == false) {
        document.getElementById('howTo').setAttribute('value', 'Hi welkom bij onze fishing tutorial! \nOm te beginnen breng je vishengel over\n je schouder naar achter.');
      }
    }
  },
  handleIntersect: function (event) {
    // This function can be empty, or you can add specific handling when intersected
  },
  handleIntersectCleared: function (event) {
    // This function can be empty, or you can add specific handling when intersected is cleared
  }
  
});


