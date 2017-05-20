var HomeState = {

  init: function(message){
    this.message = message;
  },

  create: function() {
    var background = this.game.add.sprite(0, 0, 'backyard');
    background.inputEnabled = true;
    background.events.onInputDown.add(function(){
      this.state.start('GameState');
    }, this);

    var style = {font: '35px Arial', fill: '#fff'};
    var styleGuide = {font: '16px Arial', fill: '#fff'};
    var styleRule = {font: '15px Arial', fill: '#F71735'};
    this.game.add.text(70, this.game.world.centerY + 200, 'Touch to Start', style);
    this.game.add.text(18, 200 , 'BoBo needs 300 points for both energy and fun', styleGuide);
    this.game.add.text(20, 250 , 'Bone: +30 Energy || -15 Fun', styleRule);
    this.game.add.text(20, 300 , 'Ball: -22 Energy || +30 Fun', styleRule);
    this.game.add.text(20, 350 , 'Bird: -10 Energy || 20 Fun', styleRule);
    this.game.add.text(20, 400 , 'Rotate: +10 Energy || +10 Fun', styleRule);

    if(this.message) {
      this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
    }
  }
};
