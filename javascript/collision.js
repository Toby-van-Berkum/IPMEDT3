AFRAME.registerComponent('collision-check', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', this.handleIntersect.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.handleIntersectCleared.bind(this));
    this.initialPosition = this.el.getAttribute('position');
    this.howTo = document.getElementById('howTo');
    //tickcounter is used as timer
    this.tickCounter = 0;
    this.catchTick = 0;
    //firstHit is used to register wether the rear hitbox has been hit or not
    this.firstHit = false;
    this.goodThrow = false;
    this.goodCatch = false;

    this.originalAttributes = dobber.attributes;

    //time before fish
    const max = 1000;
    const min = 500;
    this.timeWindow = Math.random() * (max - min) + min;

    
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
          document.getElementById('howTo').setAttribute('value', 'Nu is het wachten tot dat je beet hebt...');
          this.firstHit = false;
          this.goodThrow = true;
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

        //checks for collision with mid hitbox
        if (intersectedEl.id === 'hitbox-mid' && this.goodThrow == true && this.goodCatch == true) {
          document.getElementById('howTo').setAttribute('value', 'Goed gedaan! Je hebt een vis gevangen!');
          console.log('fish caught');
          const fishingRod = document.getElementById('fishing-rod');
          const dobber = document.getElementById('dobber');
  
          dobber.parentNode.removeChild(dobber);
      
          const newDobber = document.createElement('a-entity');
          for (let i = 0; i < this.originalAttributes.length; i++) {
            const attribute = this.originalAttributes[i];
            newDobber.setAttribute(attribute.name, attribute.value);
          }
      
          // Attach the new dobber to the fishing-rod
          fishingRod.appendChild(newDobber);
  
          fishingRod.setAttribute('constraint', {
            target: '#dobber',
            collideConnected: 'false',
          });
          this.goodCatch = false;
          this.goodThrow = false;
          this.catchTick = 0;
        }
      });
    }

    //counts the amount of ticks that have past and resets after 3 seconds
    this.tickCounter++;
    if (this.tickCounter >300) {
      this.tickCounter = 0;
      this.firstHit = false;

      //resets text message in case of bad throw
      if (this.goodThrow == false) {
        document.getElementById('howTo').setAttribute('value', 'Hi welkom bij onze fishing tutorial! \nOm te beginnen breng je vishengel over\n je schouder naar achter.');
      }
    }
    //time before catch
    if (this.goodThrow == true) {
      this.catchTick++;


      if(this.catchTick > this.timeWindow - 200 && this.catchTick < this.timeWindow + 200){
        document.getElementById('howTo').setAttribute('value', 'Je hebt beet! \nTrek NU je hengel omhoog!.');
        this.goodCatch = true;
      }
      else if(this.catchTick> this.timeWindow + 200) {
        document.getElementById('howTo').setAttribute('value', 'Oei! Je was te laat...\n Probeer op nieuw');
        
        this.goodCatch = false;
        this.goodThrow = false
        this.catchTick = 0;
        
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


