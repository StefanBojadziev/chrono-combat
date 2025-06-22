import Phaser from "phaser";
import ModeSelectScene from "./ModeSelectScene";
import showHealthBarsAndTimer from "../utils/utils";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
  }

  preload() {
    this.load.image("titleImage", "assets/titleImage.png");
    this.load.image(
      "mainMenuBackground",
      "assets/backgrounds/mainMenu/background2.png"
    );
    this.load.audio("menuMusic", "assets/audio/sounds/menuMusic.mp3");
    this.load.audio("menuPress", "assets/audio/sounds/menuPress.mp3");
  }

  create() {
    this.sound.stopAll();
    const winnerDisplay = document.querySelector("#winner-display");
    winnerDisplay.textContent = "TIE";
    winnerDisplay.style.display = "none";
    showHealthBarsAndTimer(false);
    this.menuMusic = this.sound.add("menuMusic", { loop: true, volume: 0.4 });
    this.menuPress = this.sound.add("menuPress", { volume: 0.4 });
    this.menuMusic.play();
    this.add
      .image(0, 0, "mainMenuBackground")
      .setOrigin(0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    this.add
      .image(this.cameras.main.centerX, 250, "titleImage")
      .setOrigin(0.5)
      .setScale(1.5);
    // .setTint(0xaaaaaa);

    const pressEnterText = this.add
      .text(this.cameras.main.centerX, 430, "Press ENTER to Start", {
        fontFamily: '"Press Start 2P"',
        fontSize: "20px",
        fill: "#ccc",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: pressEnterText,
      alpha: { from: 1, to: 0.3 },
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    this.input.keyboard.once("keydown-ENTER", () => {
      this.menuPress.play();
      this.time.delayedCall(500, () => {
        this.scene.add("ModeSelectScene", ModeSelectScene, true);
        this.scene.stop("TitleScene");
      });
    });
  }
}
