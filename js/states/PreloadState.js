var PreloadState = {
  //load the game assets before the game starts
  preload: function() {
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('backyard', 'assets/images/backyard1.png');
    this.load.image('bone', 'assets/images/bone.png');
    this.load.image('ball', 'assets/images/ball.png');
    this.load.image('rotate', 'assets/images/rotate.png');
    this.load.image('bird', 'assets/images/bird.png');
    this.load.spritesheet('pet', 'assets/images/bobo.png', 97, 83, 5, 1, 1);

    this.load.audio('spinDog', 'assets/audio/spin.mp3');
    this.load.audio('clickItems', 'assets/audio/click.mp3');
    this.load.audio('bark', 'assets/audio/bark.mp3');
    this.load.audio('gameBackground', 'assets/audio/game.mp3');
    this.load.audio('dogSinging', 'assets/audio/dogSinging.mp3');

  },
  create: function() {
    this.state.start('HomeState');
  }
};
