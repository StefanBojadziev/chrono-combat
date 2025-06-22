import AttackBox from "./AttackBox";
import FighterConfig from "../config/FighterConfig";

export default class Fighter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey, config) {
    super(scene, x, y, `${characterKey}_idle`);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    /** @type {Phaser.Scene} */
    this.scene = scene;
    this.config = config;

    this.health = 100;
    this.maxHealth = 100;
    this.isAttacking = false;
    this.dead = false;
    this.damage = config.damage;
    this.healthBar = config.healthBar;
    this.hasHit = false;

    this.setFlipX(config.flipX);

    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setGravityY(500);

    const fighterConfig = FighterConfig[characterKey];
    this.health = fighterConfig.health;
    this.maxHealth = fighterConfig.health;

    this.setSize(
      fighterConfig.size.width || 30,
      fighterConfig.size.height || 60
    );
    if (fighterConfig.offset.x !== 0)
      this.body.offset.x += fighterConfig.offset.x || 0;
    if (fighterConfig.offset.y !== 0)
      this.body.offset.y += fighterConfig.offset.y || 0;
    this.setScale(fighterConfig.size.scale || 2);

    this.attackBox = new AttackBox(
      this.scene,
      x,
      y,
      fighterConfig.attackBox.size.width,
      fighterConfig.attackBox.size.height,
      fighterConfig.attackBox.offset.x,
      fighterConfig.attackBox.offset.y
    );

    this.setFlipX(config.flipX);

    this.animations = {
      idle: `${characterKey}_idle`,
      run: `${characterKey}_run`,
      jump: `${characterKey}_jump`,
      fall: `${characterKey}_fall`,
      attack1: `${characterKey}_attack1`,
      takeHit: `${characterKey}_takeHit`,
      death: `${characterKey}_death`,
    };

    this.play(this.animations.idle);
  }

  getHitBox() {
    return new Phaser.Geom.Rectangle(
      this.x - this.body.width / 2,
      this.y - this.body.height,
      this.body.width,
      this.body.height
    );
  }

  faceDirection(direction) {
    if (this.dead || this.isAttacking) return;

    if (direction === "left") {
      this.setFlipX(this.config.flipX ? false : true);
    } else if (direction === "right") {
      this.setFlipX(this.config.flipX ? true : false);
    }
  }

  move(direction) {
    if (this.dead || this.isAttacking) return;

    const speed = 300;

    if (direction === "left") {
      this.setVelocityX(-speed);
      this.setFlipX(this.config.flipX ? false : true);
    } else if (direction === "right") {
      this.setVelocityX(speed);
      this.setFlipX(this.config.flipX ? true : false);
    }

    if (this.body.onFloor()) {
      this.play(this.animations.run, true);
    }
  }

  idle() {
    if (this.dead || !this.body.onFloor() || this.isAttacking) return;
    this.setVelocityX(0);
    this.play(this.animations.idle, true);
  }

  jump() {
    if (this.dead || !this.body.onFloor()) return;

    this.setVelocityY(-900);
    if (!this.isAttacking) {
      this.play(this.animations.jump, true);
    }
  }

  fall() {
    if (this.dead || this.body.onFloor() || this.isAttacking) return;
    this.play(this.animations.fall, true);
  }

  attack() {
    const now = this.scene.time.now;

    if (
      this.dead ||
      this.isAttacking ||
      now - this.lastAttackTime < this.attackCooldown
    )
      return;

    this.isAttacking = true;
    this.lastAttackTime = now;
    this.hasHit = false;
    this.attackBox.active = false;

    this.play(this.animations.attack1, false);

    const attackHitFrame = this.config.attackHitFrame || 3;
    const frameRate =
      this.scene.anims.anims.get(this.animations.attack1).frameRate || 10;
    const frameDelay = (1000 / frameRate) * (attackHitFrame - 1);

    this.scene.time.delayedCall(frameDelay, () => {
      if (this.isAttacking && !this.attackBox.active) {
        this.attackBox.active = true;
      }
    });

    const totalFrames = this.config.attackDuration || 6;
    const totalDuration = (1000 / frameRate) * totalFrames;

    this.scene.time.delayedCall(totalDuration, () => {
      this.isAttacking = false;
      this.attackBox.active = false;
      this.hasHit = false;
    });
  }

  updateAttackBox() {
    const direction = this.flipX ? -1 : 1;
    this.attackBox.x = this.x + this.attackBox.offsetX * direction;
    this.attackBox.y = this.y + this.attackBox.offsetY;
  }

  takeHit(damage) {
    if (this.dead) return;

    this.health = Math.max(0, this.health - damage);

    gsap.to(this.healthBar, {
      width: `${(this.health / this.maxHealth) * 100}%`,
      duration: 0.3,
      ease: "power1.out",
    });

    if (this.health <= 0) {
      this.die();
    } else {
      this.setTintFill(0xffffff);
      this.scene.time.delayedCall(100, () => {
        this.clearTint();
      });
    }
  }

  die() {
    this.health = 0;
    this.dead = true;
    this.play(this.animations.death, true);

    this.body.setEnable(false);

    this.setVelocity(0, 0);
  }
}
