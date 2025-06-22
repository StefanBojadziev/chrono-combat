const FighterConfig = {
  //Masaru
  masaru: {
    size: {
      width: 30,
      height: 55,
      scale: 2,
    },
    offset: {
      x: 0,
      y: 2,
    },
    attackBox: {
      offset: { x: 100, y: 0 },
      size: { width: 150, height: 110 },
    },
    attackSpeed: 10 / 6,
    health: 110,
    damage: 8,
    attackFrame: 5,
  },
  //Renzo
  renzo: {
    size: {
      width: 30,
      height: 60,
      scale: 2,
    },
    offset: {
      x: 0,
      y: -2,
    },
    attackBox: {
      offset: { x: 100, y: 0 },
      size: { width: 145, height: 120 },
    },
    attackSpeed: 10 / 4,
    health: 120,
    damage: 7,
    attackFrame: 2,
  },
  //Aleksandar
  aleksandar: {
    size: {
      width: 40,
      height: 85,
      scale: 1.3,
    },
    offset: {
      x: 0,
      y: 14,
    },
    attackBox: {
      offset: { x: 60, y: 0 },
      size: { width: 140, height: 130 },
    },
    attackSpeed: 10 / 4,
    health: 160,
    damage: 6,
    attackFrame: 3,
  },
  //Kenji
  kenji: {
    size: {
      width: 35,
      height: 40,
      scale: 2,
    },
    offset: {
      x: 0,
      y: -2,
    },
    attackBox: {
      offset: { x: 70, y: -50 },
      size: { width: 120, height: 170 },
    },
    attackSpeed: 10 / 7,
    health: 125,
    damage: 8,
    attackFrame: 5,
  },
  //Amina
  amina: {
    size: {
      width: 20,
      height: 43,
      scale: 2.5,
    },
    offset: {
      x: 0,
      y: 0,
    },
    attackBox: {
      offset: { x: 43, y: -20 },
      size: { width: 150, height: 160 },
    },
    attackSpeed: 10 / 5,
    health: 100,
    damage: 5,
    attackFrame: 4,
  },
  //King LeoFric
  kingleofric: {
    size: {
      width: 20,
      height: 52,
      scale: 2,
    },
    offset: {
      x: 0,
      y: 23,
    },
    attackBox: {
      offset: { x: 65, y: 46 },
      size: { width: 145, height: 52 },
    },
    attackSpeed: 10 / 4,
    health: 80,
    damage: 8,
    attackFrame: 3,
  },
  //Isolde
  isolde: {
    size: {
      width: 25,
      height: 43,
      scale: 2,
    },
    offset: {
      x: 0,
      y: 0,
    },
    attackBox: {
      offset: { x: 30, y: -20 },
      size: { width: 110, height: 110 },
    },
    attackSpeed: 10 / 7,
    health: 100,
    damage: 9,
    attackFrame: 4,
  },
  //Roland
  roland: {
    size: {
      width: 25,
      height: 40,
      scale: 2.5,
    },
    offset: {
      x: 0,
      y: -7,
    },
    attackBox: {
      offset: { x: 50, y: -30 },
      size: { width: 150, height: 130 },
    },
    attackSpeed: 10 / 6,
    health: 95,
    damage: 7,
    attackFrame: 5,
  },
};

export default FighterConfig;
