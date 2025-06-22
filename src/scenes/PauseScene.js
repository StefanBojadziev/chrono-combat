export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "PauseScene" });
  }

  init(data) {
    this.previousScene = data.previousScene;
  }

  create() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 50,
        "Game Paused",
        {
          fontFamily: '"Press Start 2P"',
          fontSize: "40px",
          fill: "#fff",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 50,
        "Press P to Resume",
        {
          fontFamily: '"Press Start 2P"',
          fontSize: "24px",
          fill: "#fff",
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-P", () => {
      this.scene.stop("PauseScene");
      this.scene.resume(this.previousScene);
    });
  }
}
