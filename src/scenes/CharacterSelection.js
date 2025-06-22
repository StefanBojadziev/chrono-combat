import Phaser from "phaser";
import EnemySelection from "./EnemySelection";
import showHealthBarsAndTimer from "../utils/utils";
import FighterConfig from "../config/FighterConfig";
import SinglePlayerScene from "./SinglePlayerScene";

export default class CharacterSelection extends Phaser.Scene {
  constructor() {
    super({ key: "CharacterSelection" });
  }

  init(data) {
    this.selectedMode = data;
  }

  create() {
    this.menuPress = this.sound.add("menuPress", { volume: 0.4 });
    showHealthBarsAndTimer(false);
    this.add
      .image(0, 0, "mainMenuBackground")
      .setOrigin(0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.add
      .rectangle(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000000,
        0.4
      )
      .setOrigin(0);

    this.options = [
      "masaru",
      "renzo",
      "aleksandar",
      "kenji",
      "amina",
      "king leofric",
      "isolde",
      "roland",
    ];
    this.currentSelection = 0;

    this.add
      .text(this.cameras.main.centerX, 50, "PLAYER 1: Select Your Character", {
        fontFamily: '"Press Start 2P"',
        fontSize: "20px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    this.optionTexts = this.options.map((opt, i) =>
      this.add
        .text(100, 150 + i * 50, opt.toUpperCase(), {
          fontFamily: '"Press Start 2P"',
          fontSize: "16px",
          fill: i === this.currentSelection ? "#ffff00" : "#fff",
        })
        .setOrigin(0, 0.5)
    );
    this.preview = this.add
      .sprite(this.cameras.main.centerX + 200, 250, "")
      .setScale(2)
      .setVisible(false);

    this.statsText = this.add
      .text(this.preview.x, this.preview.y + 100, "", {
        fontFamily: '"Press Start 2P"',
        fontSize: "12px",
        fill: "#ffffff",
        align: "left",
        wordWrap: { width: 300 },
      })
      .setOrigin(0.5, 0);

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
      const selectedCharacter = this.options[this.currentSelection];
      if (this.selectedMode === "1 Player") {
        this.time.delayedCall(500, () => {
          let randomSelection =
            this.options[Math.floor(Math.random() * this.options.length)];
          this.scene.add("SinglePlayerScene", SinglePlayerScene, true, [
            selectedCharacter.replace(/\s+/g, "").toLowerCase(),
            randomSelection.replace(/\s+/g, "").toLowerCase(),
          ]);
          this.scene.remove("CharacterSelection");
        });
      } else if (this.selectedMode === "2 Players") {
        this.time.delayedCall(500, () => {
          this.scene.add(
            "EnemySelection",
            EnemySelection,
            true,
            selectedCharacter.replace(/\s+/g, "").toLowerCase()
          );
          this.scene.remove("CharacterSelection");
        });
      }
    });

    this.updatePreview();
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

    this.updatePreview();
  }

  updatePreview() {
    const selected = this.options[this.currentSelection]
      .replace(/\s+/g, "")
      .toLowerCase();
    const idleKey = `${selected}_idle`;

    if (!this.anims.exists(idleKey)) {
      this.anims.create({
        key: idleKey,
        frames: this.anims.generateFrameNumbers(idleKey),
        frameRate: 10,
        repeat: -1,
      });
    }

    this.preview.setTexture(idleKey);
    this.preview.play(idleKey, true);
    this.preview.setVisible(true);

    const config = FighterConfig[selected];
    if (config) {
      this.preview.setScale(config.size.scale || 2);
      this.preview.setY(250 - config.offset.y);
      this.statsText.setText([
        `Health: ${config.health}`,
        `Damage: ${config.damage}`,
        `Attack Speed: ${config.attackSpeed.toFixed(2)}`,
        `DPS: ${(config.damage / config.attackSpeed).toFixed(2)}`,
      ]);
    } else {
      this.statsText.setText("No config available.");
    }
  }
}
