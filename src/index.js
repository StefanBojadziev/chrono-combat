import TitleScene from "./scenes/TitleScene";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  parent: "game-canvas",
  backgroundColor: "#000",
  scene: TitleScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      // debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
