import SinglePlayerScene from "./SinglePlayerScene.js";
import showHealthBarsAndTimer from "../utils/utils";
import CharacterSelection from "./CharacterSelection.js";
import PauseScene from "./PauseScene.js";

export default class LoaderScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoaderScene" });
  }

  init(data) {
    this.selectedMode = data;
  }

  preload() {
    this.createLoadingBar();

    this.load.image(
      "background",
      "assets/backgrounds/forestVillage/background.png"
    );
    this.load.spritesheet(
      "shop",
      "assets/backgrounds/forestVillage/shop1.png",
      {
        frameWidth: 118,
        frameHeight: 128,
        endFrame: 5,
      }
    );
    this.load.image("castle", "assets/backgrounds/castle/castleBackground.png");

    // Masaru
    this.load.spritesheet("masaru_idle", "assets/sprites/Masaru/Idle.png", {
      frameWidth: 200,
      frameHeight: 185,
    });
    this.load.spritesheet("masaru_run", "assets/sprites/Masaru/Run.png", {
      frameWidth: 200,
      frameHeight: 185,
    });
    this.load.spritesheet("masaru_jump", "assets/sprites/Masaru/Jump.png", {
      frameWidth: 200,
      frameHeight: 185,
    });
    this.load.spritesheet("masaru_fall", "assets/sprites/Masaru/Fall.png", {
      frameWidth: 200,
      frameHeight: 185,
    });
    this.load.spritesheet(
      "masaru_attack1",
      "assets/sprites/Masaru/Attack1.png",
      {
        frameWidth: 200,
        frameHeight: 185,
      }
    );
    this.load.spritesheet(
      "masaru_takeHit",
      "assets/sprites/Masaru/TakeHit.png",
      {
        frameWidth: 200,
        frameHeight: 185,
      }
    );
    this.load.spritesheet("masaru_death", "assets/sprites/Masaru/Death.png", {
      frameWidth: 200,
      frameHeight: 185,
    });

    // Renzo
    this.load.spritesheet("renzo_idle", "assets/sprites/Renzo/Idle.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("renzo_run", "assets/sprites/Renzo/Run.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("renzo_jump", "assets/sprites/Renzo/Jump.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("renzo_fall", "assets/sprites/Renzo/Fall.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("renzo_attack1", "assets/sprites/Renzo/Attack1.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("renzo_takeHit", "assets/sprites/Renzo/TakeHit.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.spritesheet("renzo_death", "assets/sprites/Renzo/Death.png", {
      frameWidth: 200,
      frameHeight: 200,
    });

    // Aleksandar
    this.load.spritesheet(
      "aleksandar_idle",
      "assets/sprites/Aleksandar/Idle.png",
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );
    this.load.spritesheet(
      "aleksandar_run",
      "assets/sprites/Aleksandar/Run.png",
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );
    this.load.spritesheet(
      "aleksandar_jump",
      "assets/sprites/Aleksandar/Jump.png",
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );
    this.load.spritesheet(
      "aleksandar_fall",
      "assets/sprites/Aleksandar/Fall.png",
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );
    this.load.spritesheet(
      "aleksandar_attack1",
      "assets/sprites/Aleksandar/Attack1.png",
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );
    this.load.spritesheet(
      "aleksandar_takeHit",
      "assets/sprites/Aleksandar/TakeHit.png",
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );
    this.load.spritesheet(
      "aleksandar_death",
      "assets/sprites/Aleksandar/Death.png",
      {
        frameWidth: 184,
        frameHeight: 137,
      }
    );

    // Kenji
    this.load.spritesheet("kenji_idle", "assets/sprites/Kenji/Idle.png", {
      frameWidth: 126,
      frameHeight: 126,
    });
    this.load.spritesheet("kenji_run", "assets/sprites/Kenji/Run.png", {
      frameWidth: 126,
      frameHeight: 126,
    });
    this.load.spritesheet("kenji_jump", "assets/sprites/Kenji/Jump.png", {
      frameWidth: 126,
      frameHeight: 126,
    });
    this.load.spritesheet("kenji_fall", "assets/sprites/Kenji/Fall.png", {
      frameWidth: 126,
      frameHeight: 126,
    });
    this.load.spritesheet("kenji_attack1", "assets/sprites/Kenji/Attack1.png", {
      frameWidth: 126,
      frameHeight: 126,
    });
    this.load.spritesheet("kenji_takeHit", "assets/sprites/Kenji/TakeHit.png", {
      frameWidth: 126,
      frameHeight: 126,
    });
    this.load.spritesheet("kenji_death", "assets/sprites/Kenji/Death.png", {
      frameWidth: 126,
      frameHeight: 126,
    });

    // Amina
    this.load.spritesheet("amina_idle", "assets/sprites/Amina/Idle.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("amina_run", "assets/sprites/Amina/Run.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("amina_jump", "assets/sprites/Amina/Jump.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("amina_fall", "assets/sprites/Amina/Fall.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("amina_attack1", "assets/sprites/Amina/Attack1.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("amina_takeHit", "assets/sprites/Amina/TakeHit.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("amina_death", "assets/sprites/Amina/Death.png", {
      frameWidth: 150,
      frameHeight: 150,
    });

    // King Leofric
    this.load.spritesheet(
      "kingleofric_idle",
      "assets/sprites/KingLeofric/Idle.png",
      {
        frameWidth: 160,
        frameHeight: 111,
      }
    );
    this.load.spritesheet(
      "kingleofric_run",
      "assets/sprites/KingLeofric/Run.png",
      {
        frameWidth: 160,
        frameHeight: 111,
      }
    );
    this.load.spritesheet(
      "kingleofric_jump",
      "assets/sprites/KingLeofric/Jump.png",
      {
        frameWidth: 160,
        frameHeight: 111,
      }
    );
    this.load.spritesheet(
      "kingleofric_fall",
      "assets/sprites/KingLeofric/Fall.png",
      {
        frameWidth: 160,
        frameHeight: 111,
      }
    );
    this.load.spritesheet(
      "kingleofric_attack1",
      "assets/sprites/KingLeofric/Attack1.png",
      {
        frameWidth: 160,
        frameHeight: 111,
      }
    );
    this.load.spritesheet(
      "kingleofric_takeHit",
      "assets/sprites/KingLeofric/TakeHit.png",
      {
        frameWidth: 160,
        frameHeight: 111,
      }
    );
    this.load.spritesheet(
      "kingleofric_death",
      "assets/sprites/KingLeofric/Death.png",
      {
        frameWidth: 160,
        frameHeight: 111,
      }
    );

    // Isolde
    this.load.spritesheet("isolde_idle", "assets/sprites/Isolde/Idle.png", {
      frameWidth: 180,
      frameHeight: 180,
    });
    this.load.spritesheet("isolde_run", "assets/sprites/Isolde/Run.png", {
      frameWidth: 180,
      frameHeight: 180,
    });
    this.load.spritesheet("isolde_jump", "assets/sprites/Isolde/Jump.png", {
      frameWidth: 180,
      frameHeight: 180,
    });
    this.load.spritesheet("isolde_fall", "assets/sprites/Isolde/Fall.png", {
      frameWidth: 180,
      frameHeight: 180,
    });
    this.load.spritesheet(
      "isolde_attack1",
      "assets/sprites/Isolde/Attack1.png",
      {
        frameWidth: 180,
        frameHeight: 180,
      }
    );
    this.load.spritesheet(
      "isolde_takeHit",
      "assets/sprites/Isolde/TakeHit.png",
      {
        frameWidth: 180,
        frameHeight: 180,
      }
    );
    this.load.spritesheet("isolde_death", "assets/sprites/Isolde/Death.png", {
      frameWidth: 180,
      frameHeight: 180,
    });

    // Roland
    this.load.spritesheet("roland_idle", "assets/sprites/Roland/Idle.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
    this.load.spritesheet("roland_run", "assets/sprites/Roland/Run.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
    this.load.spritesheet("roland_jump", "assets/sprites/Roland/Jump.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
    this.load.spritesheet("roland_fall", "assets/sprites/Roland/Fall.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
    this.load.spritesheet(
      "roland_attack1",
      "assets/sprites/Roland/Attack.png",
      {
        frameWidth: 140,
        frameHeight: 140,
      }
    );
    this.load.spritesheet(
      "roland_takeHit",
      "assets/sprites/Roland/TakeHit.png",
      {
        frameWidth: 140,
        frameHeight: 140,
      }
    );
    this.load.spritesheet("roland_death", "assets/sprites/Roland/Death.png", {
      frameWidth: 140,
      frameHeight: 140,
    });

    // Track loading progress
    this.load.on("progress", this.updateProgressBar, this);
  }

  createLoadingBar() {
    // Add background
    this.add
      .rectangle(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000000
      )
      .setOrigin(0, 0);

    // Add loading text
    this.loadingText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 50,
        "Loading...",
        { font: "24px Arial", fill: "#ffffff" }
      )
      .setOrigin(0.5);

    // Add percentage text
    this.percentText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 50,
        "0%",
        { font: "18px Arial", fill: "#ffffff" }
      )
      .setOrigin(0.5);

    // Create progress bar container
    const barWidth = 400;
    const barHeight = 30;
    const x = this.cameras.main.width / 2 - barWidth / 2;
    const y = this.cameras.main.height / 2;

    // Progress bar background
    this.progressBarBg = this.add
      .rectangle(x, y, barWidth, barHeight, 0x555555)
      .setOrigin(0, 0.5);

    // Progress bar fill
    this.progressBarFill = this.add
      .rectangle(x, y, 0, barHeight, 0x00ff00)
      .setOrigin(0, 0.5);
  }

  updateProgressBar(value) {
    // Update progress bar width
    const barWidth = 400;
    const newWidth = value * barWidth;

    // Animate the progress bar
    this.tweens.add({
      targets: this.progressBarFill,
      width: newWidth,
      duration: 200,
      ease: "Power1",
    });

    // Update percentage text
    const percent = Math.round(value * 100);
    this.percentText.setText(`${percent}%`);

    // Change color as loading progresses
    if (percent < 30) {
      this.progressBarFill.setFillStyle(0xff0000); // Red
    } else if (percent < 70) {
      this.progressBarFill.setFillStyle(0xffff00); // Yellow
    } else {
      this.progressBarFill.setFillStyle(0x00ff00); // Green
    }
  }

  create() {
    if (!this.scene.manager.getScene("PauseScene")) {
      this.scene.add("PauseScene", PauseScene);
    }

    showHealthBarsAndTimer(false);
    this.add
      .image(0, 0, "mainMenuBackground")
      .setOrigin(0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.scene.stop("ModeSelectScene");
    // Complete any final setup
    this.loadingText.setText("Loading complete!");
    // Add a slight delay before switching scenes for a smoother transition
    this.time.delayedCall(500, () => {
      this.scene.add(
        "CharacterSelection",
        CharacterSelection,
        true,
        this.selectedMode
      );
      this.scene.stop("LoaderScene");
    });
  }
}
