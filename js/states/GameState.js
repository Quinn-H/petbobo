var GameState = {
  //executed after everything is loaded
  create: function() {
    bksound = this.game.add.audio('gameBackground', 0.05, true)
    bksound.play();

  	this.background = this.game.add.sprite(0, 0, 'backyard');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.placeItem, this);

  	this.pet = this.game.add.sprite(250, 150, 'pet');
  	this.pet.anchor.setTo(0.5);

    // animation
    this.pet.animations.add('pickBone', [1], 1, false)
    this.pet.animations.add('pickBall', [2], 1, false)
    this.pet.animations.add('pickBird', [3], 1, false)

  	//custom properties
  	this.pet.customParams = {energy: 100, fun: 100};

    //draggable pet
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag();

  	this.bone = this.game.add.sprite(72, 570, 'bone');
    this.bone.anchor.setTo(0.5);
    this.bone.inputEnabled = true;
    this.bone.customParams = {energy: 20};
    this.bone.events.onInputDown.add(this.pickItem, this);

  	this.ball = this.game.add.sprite(144, 570, 'ball');
    this.ball.anchor.setTo(0.5);
    this.ball.inputEnabled = true;
    this.ball.customParams = {energy: -20, fun: 20};
    this.ball.events.onInputDown.add(this.pickItem, this);


  	this.bird = this.game.add.sprite(216, 570, 'bird');
    this.bird.anchor.setTo(0.5);
    this.bird.inputEnabled = true;
    this.bird.customParams = {fun: 10};
    this.bird.events.onInputDown.add(this.pickItem, this);

  	this.rotate = this.game.add.sprite(288, 570, 'rotate');
    this.rotate.anchor.setTo(0.5);
    this.rotate.inputEnabled = true;
    this.rotate.events.onInputDown.add(this.rotatePet, this);

    this.buttons = [this.bone, this.ball, this.bird, this.rotate]

    // Nothing is selected
    this.selectedItem = null;
    this.uiBlocked = false;
    var styleEnergy = {
      font: '20px Arial',
      fill: '#F71735'
    }

    var styleFun = {
      font: '20px Arial',
      fill: '#FF9F1C'
    }

    this.game.add.text(10, 20, 'Energy:', styleEnergy);
    this.game.add.text(10, 50, 'Fun:', styleFun);

    this.energyText = this.game.add.text(80, 20, '', styleEnergy);
    this.funText = this.game.add.text(55, 50, '', styleFun);

    this.refreshStats();

    // decrease the health every 5s
    this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this)
  },

  pickItem: function(sprite, event) {
    let sound = this.game.add.audio('clickItems', 0.1);
    sound.play();
    if(!this.uiBlocked) {
      this.clearSelection();
      sprite.alpha = 0.3;
      this.selectedItem = sprite;
    }
  },

  rotatePet: function(sprite, event) {
    let sound = this.game.add.audio('spinDog')
    sound.play();
    if(!this.uiBlocked){
      // block the user choice until the roatate ends
      this.uiBlocked = true;
      this.clearSelection();
      sprite.alpha = 0.3
      var petRotation = this.game.add.tween(this.pet);
      petRotation.to({angle: '+720'}, 2000);
      petRotation.onComplete.add(function(){
        this.uiBlocked = false;
        sprite.alpha = 1;
        this.pet.customParams.fun += 10;
        //update value of stat
        this.refreshStats();
      }, this)
      petRotation.start();
    }
  },

  clearSelection: function() {
    this.buttons.forEach((element, index) => {
      element.alpha = 1;
    });
    this.selectedItem = null;
  },

  placeItem: function(sprite, event) {
    let bark = this.game.add.audio('bark')
    if(this.selectedItem && !this.uiBlocked){
      var x = event.position.x;
      var y = event.position.y;
      var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
      newItem.anchor.setTo(0.5);
      newItem.customParams = this.selectedItem.customParams;
      this.uiBlocked = true;
      var petMovement = this.game.add.tween(this.pet);
      petMovement.to({x: x, y: y}, 700);
      petMovement.onComplete.add(function(){
        //destroy the apple/candy/duck
        newItem.destroy();
        // animations pick selected items
        if (newItem.key === 'bone') {
        this.pet.animations.play('pickBone')
        }
        if (newItem.key === 'ball') {
        this.pet.animations.play('pickBall')
        }
        if (newItem.key === 'bird') {
        this.pet.animations.play('pickBird')
        }
        bark.play();
        //release the ui
        this.uiBlocked = false;
        var stat;
        for(stat in newItem.customParams) {
          //only want the properties of the customParams object, not properties that may existing in customParams.prototype
          //this filters out all non-desired properties
          if(newItem.customParams.hasOwnProperty(stat)) {
            this.pet.customParams[stat] += newItem.customParams[stat];
          }
        }

        //update value of stat
        this.refreshStats();

      }, this);
      //start the tween animation
      petMovement.start();
    }
  },

  refreshStats: function() {
    this.energyText.text = this.pet.customParams.energy;
    this.funText.text = this.pet.customParams.fun;
  },

  reduceProperties: function() {
    this.pet.customParams.energy -= 10;
    this.pet.customParams.fun -= 5;
    this.refreshStats();
  },

  update: function() {
    if(this.pet.customParams.energy <= 0 || this.pet.customParams.fun <= 0){
      // if stat below 0, change frame and play sound
      this.pet.frame = 3;
      this.uiBlocked = true;
      this.game.time.events.add(2000, this.gameOver, this);
    }
  },

  gameOver: function() {
    this.state.start('HomeState', true, false, 'GAME OVER!');
    bksound.destroy();
  }
};
