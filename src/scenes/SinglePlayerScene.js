import Fighter from "../objects/Fighter.js";
import showHealthBarsAndTimer from "../utils/utils.js";
import createAnimations from "../utils/animations.js";
import FighterConfig from "../config/FighterConfig.js";
import PauseScene from "./PauseScene.js";

export default class SinglePlayerScene extends Phaser.Scene {
  constructor() {
    super({ key: "SinglePlayerScene" });

    this.player;
    this.enemy;
    this.cursors;
    this.timer = 60;
    this.timerEvent;
    this.gameOver = false;
  }

  preload() {
    this.load.audio("fightingMusic", "assets/audio/sounds/fightingMusic.mp3");
    this.load.audio("gameStartFight", "assets/audio/sounds/gameStartFight.mp3");
    this.load.audio("gameOverSound", "assets/audio/sounds/gameOverSound.mp3");
    this.load.audio("gameOverVoice", "assets/audio/sounds/gameOverVoice.mp3");
    this.load.audio("fallSound", "assets/audio/sounds/fallSound.mp3");
    this.load.audio("attackSound", "assets/audio/sounds/attackSound.mp3");
    this.load.audio("hitSound", "assets/audio/sounds/hitSound.mp3");
    this.load.audio("menuPress", "assets/audio/sounds/menuPress.mp3");
  }

  init(data) {
    this.playerKey = data[0].toLowerCase();
    this.enemyKey = data[1].toLowerCase();
  }

  create() {
    this.sound.stopAll();
    this.gameStartFight = this.sound.add("gameStartFight", { volume: 0.4 });
    this.gameStartFight.play();
    this.fightingMusic = this.sound.add("fightingMusic", {
      loop: true,
      volume: 0.4,
    });
    this.fightingMusic.play();
    this.gameOverVoice = this.sound.add("gameOverVoice", { volume: 0.4 });
    this.gameOverSound = this.sound.add("gameOverSound", { volume: 0.4 });
    this.playerFallSound = this.sound.add("fallSound", { volume: 1 });
    this.enemyFallSound = this.sound.add("fallSound", { volume: 1 });
    this.playerAttackSound = this.sound.add("attackSound", { volume: 0.4 });
    this.enemyAttackSound = this.sound.add("attackSound", { volume: 0.4 });
    this.playerHitSound = this.sound.add("hitSound", { volume: 0.4 });
    this.enemyHitSound = this.sound.add("hitSound", { volume: 0.4 });
    this.menuPress = this.sound.add("menuPress", { volume: 0.4 });
    this.player;
    this.enemy;
    this.cursors;
    this.timer = 60;
    this.timerEvent;
    this.gameOver = false;
    document.getElementById("winner-display").style.display = "none";
    document.getElementById("playerHealth").style.width = "100%";
    document.getElementById("enemyHealth").style.width = "100%";
    showHealthBarsAndTimer(true);
    this.isPaused = false;
    const playerConfig = FighterConfig[this.playerKey];
    const enemyConfig = FighterConfig[this.enemyKey];
    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0) {
      this.add.image(0, 0, "background").setOrigin(0);
      this.shop = this.add.sprite(625, 225, "shop").setScale(2);
      this.shop.setOrigin(-0.3, -0.001);
      this.anims.create({
        key: "shop_anim",
        frames: this.anims.generateFrameNumbers("shop", { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1,
      });
      this.shop.play("shop_anim");
    }
    if (randomNumber === 1) {
      this.add.image(0, 0, "castle").setOrigin(0);
    }

    this.createAnims();

    const ground = this.add
      .rectangle(0, 480, 2048, 100, 0x000000, 0)
      .setOrigin(0);
    this.physics.add.existing(ground, true);

    this.player = new Fighter(this, 200, 331, this.playerKey, {
      flipX: false,
      damage: playerConfig.damage,
      healthBar: document.querySelector("#playerHealth"),
      controls: {
        left: "A",
        right: "D",
        up: "W",
        attack: "SPACE",
      },
      attackHitFrame: playerConfig.attackFrame,
    });

    this.enemy = new Fighter(this, 800, 331, this.enemyKey, {
      flipX: false,
      damage: enemyConfig.damage,
      healthBar: document.querySelector("#enemyHealth"),
      controls: {
        left: "LEFT",
        right: "RIGHT",
        up: "UP",
        attack: "NUMPAD_ZERO",
      },
      attackHitFrame: enemyConfig.attackFrame,
    });

    if (this.playerKey === this.enemyKey) {
      var effect = this.enemy.postFX.addColorMatrix();
      effect.negative();
    }

    this.enemy.faceDirection("left");
    this.player.faceDirection("right");

    this.physics.world.setBounds(0, 0, 1024, 576);
    this.player.setCollideWorldBounds(true);
    this.enemy.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.enemy, ground);

    this.physics.add.collider(this.player, this.enemy, (player, enemy) => {
      player.body.setVelocityX(0);
      enemy.body.setVelocityX(0);

      if (player.x < enemy.x) {
        player.x -= 5;
        enemy.x += 5;
      } else {
        player.x += 5;
        enemy.x -= 5;
      }
    });

    this.enemy.lastDecisionTime = this.time.now;
    this.enemy.lastAttackTime = 0;
    this.enemy.attackCooldown = 1000;
    this.enemy.aiState = "DECIDING";

    this.setupInput();

    this.startTimer();
  }

  update() {
    if (this.gameOver) {
      this.player.setVelocityX(0);
      this.enemy.setVelocityX(0);
      return;
    }
    this.input.keyboard.once("keydown-P", () => {
      this.scene.pause("SinglePlayerScene");
      this.scene.launch("PauseScene", { previousScene: "SinglePlayerScene" });
      this.scene.bringToTop("PauseScene");
    });

    if (this.player.isAttacking) {
      this.playerAttackSound.play();
    }
    if (this.enemy.isAttacking) {
      this.enemyAttackSound.play();
    }

    const playerOnGround = this.player.body.onFloor();
    const playerFalling =
      this.player.body.velocity.y > 0 && this.player.body.deltaAbsY() > 1;
    const playerInAir = !playerOnGround;
    if (this.player.body.deltaAbsY() > 1 && this.player.body.onFloor()) {
      this.playerFallSound.play();
    }
    if (!this.player.isAttacking && !this.player.dead) {
      if (this.cursors.left.isDown) {
        this.player.move("left");
      } else if (this.cursors.right.isDown) {
        this.player.move("right");
      } else if (playerOnGround) {
        if (
          this.player.anims.currentAnim?.key !== this.player.animations.idle
        ) {
          this.player.idle();
        }
      }

      if (playerFalling) {
        if (
          this.player.anims.currentAnim?.key !== this.player.animations.fall
        ) {
          this.player.fall();
        }
      }
    }

    const enemyOnGround = this.enemy.body.onFloor();
    const enemyFalling =
      this.enemy.body.velocity.y > 0 && this.enemy.body.deltaAbsY() > 1;
    const enemyInAir = !enemyOnGround;
    const distance = this.player.x - this.enemy.x;
    const buffer = 10;
    if (this.enemy.body.deltaAbsY() > 1 && this.enemy.body.onFloor()) {
      this.enemyFallSound.play();
    }

    if (!this.gameOver && !this.enemy.dead) {
      const currentTime = this.time.now;

      if (currentTime - this.enemy.lastDecisionTime > 200) {
        this.makeAIDecision();
        this.enemy.lastDecisionTime = currentTime;
      }

      const enemyFalling = this.enemy.body.velocity.y > 0;
      if (this.enemy.body.deltaAbsY() > 1 && this.enemy.body.onFloor()) {
        this.enemyFallSound.play();
      }

      if (enemyFalling && !this.enemy.isAttacking) {
        if (this.enemy.anims.currentAnim?.key !== this.enemy.animations.fall) {
          this.enemy.fall();
        }
      }
    }

    this.player.updateAttackBox();
    this.enemy.updateAttackBox();

    if (Phaser.Input.Keyboard.JustDown(this.cursors.attack)) {
      this.player.attack();
    }

    this.checkHits();

    if (this.player.health <= 0 || this.enemy.health <= 0) {
      this.gameOver = true;
      this.determineWinner();
    }
  }

  createAnims() {
    createAnimations(this, this.playerKey, this.enemyKey);
  }

  makeAIDecision() {
    if (this.enemy.isAttacking || this.enemy.dead) return;

    const distance = this.player.x - this.enemy.x;
    const absDistance = Math.abs(distance);
    const direction = distance > 0 ? "right" : "left";
    const enemyOnGround = this.enemy.body.onFloor();

    if (Math.random() < 0.1 && enemyOnGround) {
      this.enemy.jump();
      return;
    }

    if (this.player.isAttacking && absDistance < 100 && enemyOnGround) {
      if (Math.random() < 0.3) {
        this.enemy.jump();
        return;
      }
    }

    const canAttack =
      this.time.now > this.enemy.lastAttackTime + this.enemy.attackCooldown;
    const inRange = absDistance < 80;

    if (inRange && canAttack && enemyOnGround) {
      if (Math.random() < 0.7) {
        this.enemy.attack();
        this.enemy.lastAttackTime = this.time.now;
        return;
      }
    }

    const buffer = 10;
    if (absDistance > buffer) {
      const rand = Math.random();

      if (rand < 0.7) {
        this.enemy.move(direction);
      } else if (rand < 0.85) {
        this.enemy.move(direction === "right" ? "left" : "right");
      } else {
        this.enemy.idle();
      }
    } else {
      if (Math.random() < 0.6) {
        this.enemy.idle();
      } else {
        this.enemy.move(direction === "right" ? "left" : "right");
      }
    }
  }

  setupInput() {
    this.cursors = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    this.input.keyboard.on("keydown-W", () => {
      if (this.player.body.onFloor() && !this.gameOver) {
        this.player.jump();
      }
    });
  }

  startTimer() {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer--;
        document.querySelector("#timer").textContent = this.timer;

        if (
          this.timer <= 0 ||
          this.player.health <= 0 ||
          this.enemy.health <= 0
        ) {
          this.timerEvent.remove();
          this.gameOver = true;
          this.determineWinner();
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  checkHits() {
    if (this.player.attackBox.active && !this.player.hasHit) {
      const playerAttackBox = new Phaser.Geom.Rectangle(
        this.player.attackBox.x - this.player.attackBox.width / 2,
        this.player.attackBox.y - this.player.attackBox.height / 2,
        this.player.attackBox.width,
        this.player.attackBox.height
      );

      const enemyBounds = this.enemy.getHitBox();

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          playerAttackBox,
          enemyBounds
        )
      ) {
        this.enemy.takeHit(this.player.damage);
        this.enemyHitSound.play();
        this.player.hasHit = true;
      }
    }

    if (this.enemy.attackBox.active && !this.enemy.hasHit) {
      const enemyAttackBox = new Phaser.Geom.Rectangle(
        this.enemy.attackBox.x - this.enemy.attackBox.width / 2,
        this.enemy.attackBox.y - this.enemy.attackBox.height / 2,
        this.enemy.attackBox.width,
        this.enemy.attackBox.height
      );

      const playerBounds = this.player.getHitBox();

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          enemyAttackBox,
          playerBounds
        )
      ) {
        this.player.takeHit(this.enemy.damage);
        this.playerHitSound.play();
        this.enemy.hasHit = true;
      }
    }
  }

  determineWinner() {
    const winnerDisplay = document.querySelector("#winner-display");
    let winner = "TIE";

    if (
      this.player.health / this.player.maxHealth ===
      this.enemy.health / this.enemy.maxHealth
    ) {
      winner = "TIE";
    } else if (
      this.player.health / this.player.maxHealth >
      this.enemy.health / this.enemy.maxHealth
    ) {
      winner = "PLAYER 1";
    } else {
      winner = "PLAYER 2";
    }

    winnerDisplay.textContent = winner === "TIE" ? "TIE!" : `${winner} WINS!`;
    winnerDisplay.style.display = "flex";
    this.sound.stopAll();
    this.time.delayedCall(500, () => {
      this.gameOverSound.play();
      this.gameOverVoice.play();
    });
    this.time.delayedCall(500, () => {
      const rematch = this.add
        .text(this.cameras.main.centerX, 350, "REMATCH?", {
          fontFamily: '"Press Start 2P"',
          fontSize: "40px",
          fill: "#fff",
        })
        .setOrigin(0.5);
      const yes = this.add
        .text(this.cameras.main.centerX - 300, 400, "ENTER -> YES", {
          fontFamily: '"Press Start 2P"',
          fontSize: "20px",
          fill: "#fff",
        })
        .setOrigin(0.5);
      const no = this.add
        .text(this.cameras.main.centerX + 300, 400, "NO <- ESC", {
          fontFamily: '"Press Start 2P"',
          fontSize: "20px",
          fill: "#fff",
        })
        .setOrigin(0.5);
      this.tweens.add({
        targets: [rematch, yes, no],
        alpha: { from: 1, to: 0.3 },
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
      this.input.keyboard.once("keydown-ENTER", () => {
        this.menuPress.play();
        this.time.delayedCall(500, () => {
          this.scene.restart();
        });
      });
      this.input.keyboard.once("keydown-ESC", () => {
        this.menuPress.play();
        this.time.delayedCall(500, () => {
          this.scene.remove("LoaderScene");
          this.scene.remove("ModeSelectScene");
          this.scene.remove("ChatacterSelection");
          this.scene.start("TitleScene", true);
          this.scene.remove("SinglePlayerScene");
        });
      });
    });
  }
}
