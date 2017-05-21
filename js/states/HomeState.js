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

    var style = {font: '35px Arial', fill: '#000'};
    var styleGuide = {font: '16px italic', fill: '#000'};
    var styleRule = {font: '15px Arial', fill: '#000'};
    var styleHow = {font: '20px Arial', fill: '#F72464'};
    this.game.add.text(70, this.game.world.centerY + 200, '点击屏幕开始', style);
    this.game.add.text(5, 200 , '当能量和开心指数达到290分时🐶会唱歌给你听🎤', styleGuide);
    this.game.add.text(20, 250 , '骨头: +30 能量值 || -15 开心值', styleRule);
    this.game.add.text(20, 300 , '球: -22 能量值 || +30 开心值', styleRule);
    this.game.add.text(20, 350 , '玩具鸟: -10 能量值 || +20 开心值', styleRule);
    this.game.add.text(20, 400 , '翻滚吧: +10 能量值 || +10 开心值', styleRule);
    this.game.add.text(20, 450 , '请先选择玩具，然后放在屏幕上！', styleHow);

    if(this.message) {
      this.game.add.text(20, this.game.world.centerY - 200, this.message, style);
    }
  }
};
