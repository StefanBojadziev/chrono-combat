import Phaser from "phaser";
import showHealthBarsAndTimer from "../utils/utils";
import LoaderScene from "./LoaderScene";

export default class ModeSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: "ModeSelectScene" });
  }

  create() {
    this.menuPress = this.sound.add("menuPress", { volume: 0.4 });
    showHealthBarsAndTimer(false);
    this.add
      .image(0, 0, "mainMenuBackground")
      .setOrigin(0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.options = ["1 Player", "2 Players"];
    this.currentSelection = 0;

    this.optionTexts = this.options.map((opt, i) =>
      this.add
        .text(this.cameras.main.centerX, 200 + i * 50, opt, {
          fontFamily: '"Press Start 2P"',
          fontSize: "32px",
          fill: i === this.currentSelection ? "#ffff00" : "#fff",
        })
        .setOrigin(0.5)
    );

    this.input.keyboard.on("keydown-UP", () => {
      this.menuPress.play();
      this.updateSelection(-1);
    });
    this.input.keyboard.on("keydown-DOWN", () => {
      this.menuPress.play();
      this.updateSelection(1);
    });

    this.input.keyboard.once("keydown-ENTER", () => {
      this.menuPress.play();
      const selectedMode = this.options[this.currentSelection];
      this.time.delayedCall(500, () => {
        this.scene.add("LoaderScene", LoaderScene, true, selectedMode);
        this.scene.remove("ModeSelectScene");
      });
    });
  }

  updateSelection(change) {
    this.currentSelection = Phaser.Math.Wrap(
      this.currentSelection + change,
      0,
      this.options.length
    );
    this.optionTexts.forEach((text, index) => {
      text.setColor(index === this.currentSelection ? "#ffff00" : "#fff");
    });
  }
}
