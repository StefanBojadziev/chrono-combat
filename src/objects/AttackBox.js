export default class AttackBox extends Phaser.GameObjects.Zone {
  constructor(scene, x, y, width, height, offsetX, offsetY) {
    super(scene, x + offsetX, y + offsetY, width, height);
    scene.add.existing(this);

    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.active = false;

    // this.setInteractive();
    // this.scene.input.enableDebug(this, 0xff0000);
  }
}
