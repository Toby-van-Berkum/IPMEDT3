AFRAME.registerComponent('collision-check', {
  init: function () {
    this.el.addEventListener('raycaster-intersected', this.handleIntersect.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.handleIntersectCleared.bind(this));
    this.initialPosition = this.el.getAttribute('position');
    this.howTo = document.getElementById('howTo');
    this.tickCounter = 0;
    this.catchTick = 0;
    this.firstHit = false;
    this.goodThrow = false;
    this.goodCatch = false;
    this.originalAttributes = dobber.attributes;
    this.timeWindow = Math.random() * (1000 - 500) + 500;
  },
  tick: function () {
    const intersectedEls = this.el.components.raycaster.intersectedEls;

    intersectedEls.forEach(intersectedEl => {
      if (intersectedEl.id === 'hitbox-behind') {
        this.handleRearHitbox();
      } else if (intersectedEl.id === 'hitbox-front' && this.tickCounter < 300 && this.firstHit) {
        this.handleGoodThrow();
      } else if (intersectedEl.id === 'hitbox-mid' && this.goodThrow && this.goodCatch) {
        this.handleGoodCatch();
      }
    });

    this.tickCounter++;
    if (this.tickCounter > 300) {
      this.tickCounter = 0;
      this.firstHit = false;
      if (!this.goodThrow) {
        this.resetTextMessage();
      }
    }

    if (this.goodThrow) {
      this.catchTick++;

      if (this.catchTick > this.timeWindow - 100 && this.catchTick < this.timeWindow + 100) {
        this.handleGoodCatchStart();
      } else if (this.catchTick >= this.timeWindow + 100) {
        this.handleLateCatch();
      }
    }
  },
  handleIntersect: function (event) {
    // This function can be empty, or you can add specific handling when intersected
  },
  handleIntersectCleared: function (event) {
    // This function can be empty, or you can add specific handling when intersected is cleared
  },
  handleRearHitbox: function () {
    console.log('Element is in rear hitbox');
    this.tickCounter = 0;
    this.firstHit = true;
    this.setHowToMessage('Zwaai nu je hengel in een boog over \nje hooft naar voren om in te gooien!');
  },
  handleGoodThrow: function () {
    console.log("good throw");
    this.setHowToMessage('Nu is het wachten tot dat je beet hebt...');
    this.firstHit = false;
    this.goodThrow = true;
    const dobber = document.getElementById('dobber');
    const fishing_rod = document.getElementById('fishing-rod');
    if (dobber.components['dynamic-body']) {
      fishing_rod.removeAttribute('constraint');
      const velocity = new THREE.Vector3(0, 2, -5);
      dobber.components['dynamic-body'].body.velocity.copy(velocity);
    }
  },
  handleGoodCatch: function () {
    this.setHowToMessage('Goed gedaan! Je hebt een vis gevangen!');
    console.log('fish caught');
    const fishingRod = document.getElementById('fishing-rod');
    const dobber = document.getElementById('dobber');
    this.removeDobber(dobber);
    const newDobber = this.createNewDobber();
    fishingRod.appendChild(newDobber);
    fishingRod.setAttribute('constraint', {
      target: '#dobber',
      collideConnected: 'false',
    });
    this.resetGoodCatch();
  },
  handleGoodCatchStart: function () {
    this.setHowToMessage('Je hebt beet! \nTrek NU je hengel omhoog!.');
    this.goodCatch = true;
  },
  handleLateCatch: function () {
    this.setHowToMessage('Oei! Je was te laat...\n Probeer het maar op nieuw');
    const fishingRod = document.getElementById('fishing-rod');
    const dobber = document.getElementById('dobber');
    this.removeDobber(dobber);
    const newDobber = this.createNewDobber();
    fishingRod.appendChild(newDobber);
    fishingRod.setAttribute('constraint', {
      target: '#dobber',
      collideConnected: 'false',
    });
    this.resetGoodCatch();
  },
  resetTextMessage: function () {
    this.setHowToMessage('Hi welkom bij onze fishing tutorial! \nOm te beginnen breng je vishengel over\n je schouder naar achter.');
  },
  setHowToMessage: function (message) {
    document.getElementById('howTo').setAttribute('value', message);
  },
  removeDobber: function (dobber) {
    dobber.parentNode.removeChild(dobber);
  },
  createNewDobber: function () {
    const newDobber = document.createElement('a-entity');
    for (let i = 0; i < this.originalAttributes.length; i++) {
      const attribute = this.originalAttributes[i];
      newDobber.setAttribute(attribute.name, attribute.value);
    }
    return newDobber;
  },
  resetGoodCatch: function () {
    this.goodCatch = false;
    this.goodThrow = false;
    this.catchTick = 0;
  }
});
