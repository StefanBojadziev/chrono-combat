export default function createAnimations(scene, playerKey, enemyKey) {
  // Player animations
  scene.anims.create({
    key: `${playerKey}_idle`,
    frames: scene.anims.generateFrameNumbers(`${playerKey}_idle`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: `${playerKey}_run`,
    frames: scene.anims.generateFrameNumbers(`${playerKey}_run`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: `${playerKey}_jump`,
    frames: scene.anims.generateFrameNumbers(`${playerKey}_jump`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${playerKey}_fall`,
    frames: scene.anims.generateFrameNumbers(`${playerKey}_fall`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${playerKey}_attack1`,
    frames: scene.anims.generateFrameNumbers(`${playerKey}_attack1`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${playerKey}_takeHit`,
    frames: scene.anims.generateFrameNumbers(`${playerKey}_takeHit`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${playerKey}_death`,
    frames: scene.anims.generateFrameNumbers(`${playerKey}_death`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  // Enemy animations
  scene.anims.create({
    key: `${enemyKey}_idle`,
    frames: scene.anims.generateFrameNumbers(`${enemyKey}_idle`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: `${enemyKey}_run`,
    frames: scene.anims.generateFrameNumbers(`${enemyKey}_run`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: `${enemyKey}_jump`,
    frames: scene.anims.generateFrameNumbers(`${enemyKey}_jump`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${enemyKey}_fall`,
    frames: scene.anims.generateFrameNumbers(`${enemyKey}_fall`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${enemyKey}_attack1`,
    frames: scene.anims.generateFrameNumbers(`${enemyKey}_attack1`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${enemyKey}_takeHit`,
    frames: scene.anims.generateFrameNumbers(`${enemyKey}_takeHit`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });

  scene.anims.create({
    key: `${enemyKey}_death`,
    frames: scene.anims.generateFrameNumbers(`${enemyKey}_death`, {
      start: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
}
