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
    this.game.add.text(70, this.game.world.centerY + 200, 'Touch to Start', style);

    if(this.message) {
      this.game.add.text(60, this.game.world.centerY - 200, 'GAME OVER!', style);
    }
  }
};