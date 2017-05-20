//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

var bksound;
game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.start('BootState');
