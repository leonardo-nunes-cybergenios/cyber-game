import biaImg from "./bia.png";
import cyberImg from "./cyber.png";
import backgroundImg from "./background.png";
import obs1Img from "./obstaculo_1.png";
import obs2Img from "./obstaculo_2.png";
import obs3Img from "./obstaculo_3.png";
import abajurImg from "./prop_abajur.png";
import cadeiraImg from "./prop_cadeira.png";
import estanteImg from "./prop_estante.png";
import mesaHorizImg from "./prop_mesa_horiz.png";
import mesaVertImg from "./prop_mesa_vert.png";
import mesinhaImg from "./prop_mesinha.png";
import poltronaImg from "./prop_poltrona.png";
import sofaImg from "./prop_sofa.png";
import vasoImg from "./prop_vaso.png";
import Phaser from "phaser";

const squareSize = 52;
var physics;
var isSliding = false;
var isSuccess = false;
var isFail = false;
var cyber;
var source;
var target = new Phaser.Math.Vector2();
var scene;
var registry;
var events;
var position = "right";
var sys;
var msg = "";

const velocityControl = {
  slow: { speed: 26, time: 2000 },
  regular: { speed: squareSize, time: 1000 },
  fast: { speed: 104, time: 500 },
};

let speedConfig = "regular";

function changeVelocity(value) {
  if (value == 0) {
    speedConfig = "slow";
  } else if (value == 50) {
    speedConfig = "regular";
  } else if (value == 100) {
    speedConfig = "fast";
  }
}

function calcPosition(p, size = 0) {
  return p * squareSize + (size * squareSize) / 2;
}

  function calcPositionSprite(p, size = 0, dif) {
    return p * squareSize + (size * squareSize) / 2 - dif;
  };

function calcCollideCyber(spriteConfig, sprite, squareSize) {
  spriteConfig.setCircle(
    squareSize / 2,
    (sprite.frameWidth - squareSize) / 2,
    0
  );
}

function calcPositionCyberY(p, size = 0) {
  return p * squareSize + (size * squareSize) / 2 + 12;
}

function calcPositionCyberX(p, size = 0) {
  return p * squareSize + (size * squareSize) / 2;
}

function calcCollideSprite(spriteConfig, sprite, squareSize) {
  spriteConfig.setCircle(
    (squareSize - 2) / 2,
    (sprite.frameWidth - squareSize + 2) / 2,
    sprite.frameHeight - squareSize / 2 + 1
  );
}

function createAnims(sprite, name) {
  sprite.anims.create({
    key: "walkDown",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [0, 1, 2, 3, 4],
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: "walkTop",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [5, 6, 7, 8, 9],
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: "walkLeft",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [10, 11, 12, 13, 14],
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: "walkRight",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [15, 16, 17, 18, 19],
    }),
    frameRate: 10,
    repeat: -1,
  });

  sprite.anims.create({
    key: "jumping",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [20, 21, 22, 23],
    }),
    frameRate: 8,
    repeat: 0,
  });

  sprite.anims.create({
    key: "slideRight",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [24, 25, 26, 27, 28, 29, 30, 31],
    }),
    frameRate: 8,
    repeat: -1,
  });

  sprite.anims.create({
    key: "slideLeft",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [32, 33, 34, 35, 36, 37, 38, 39],
    }),
    frameRate: 8,
    repeat: -1,
  });

  sprite.anims.create({
    key: "slideBottom",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [40, 41, 42, 43, 44, 45, 46, 47, 48],
    }),
    frameRate: 9,
    repeat: -1,
  });

  sprite.anims.create({
    key: "slideTop",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [49, 50, 51, 52, 53, 54, 55, 56],
    }),
    frameRate: 8,
    repeat: -1,
  });

  sprite.anims.create({
    key: "collideRight",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [66, 67, 68, 69, 70, 71, 72, 73, 74],
    }),
    frameRate: 9,
    repeat: -1,
  });

  sprite.anims.create({
    key: "collideLeft",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [57, 58, 59, 60, 61, 62, 63, 64, 65],
    }),
    frameRate: 9,
    repeat: -1,
  });

  sprite.anims.create({
    key: "collideTop",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [83, 84, 85, 86, 87, 88, 89, 90],
    }),
    frameRate: 8,
    repeat: -1,
  });

  sprite.anims.create({
    key: "collideBottom",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [75, 76, 77, 78, 79, 80, 81, 82],
    }),
    frameRate: 8,
    repeat: -1,
  });

  sprite.anims.create({
    key: "right",
    frames: sprite.anims.generateFrameNumbers(name, { frames: [15] }),
    frameRate: 1,
    repeat: -1,
  });

  sprite.anims.create({
    key: "left",
    frames: sprite.anims.generateFrameNumbers(name, { frames: [10] }),
    frameRate: 1,
    repeat: -1,
  });

  sprite.anims.create({
    key: "top",
    frames: sprite.anims.generateFrameNumbers(name, { frames: [5] }),
    frameRate: 1,
    repeat: -1,
  });

  sprite.anims.create({
    key: "bottom",
    frames: sprite.anims.generateFrameNumbers(name, { frames: [0] }),
    frameRate: 1,
    repeat: -1,
  });
}

function createAnimsCyber(sprite, name) {
  sprite.anims.create({
    key: "success",
    frames: sprite.anims.generateFrameNumbers(name, {
      frames: [
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
        66, 67, 68,
      ],
    }),
    frameRate: 22,
    repeat: -1,
  });
}

const params = {
  config: {
    background: {
      width: 416,
      height: 416,
    },
  },
  images: [
    {
      name: "background",
      file: backgroundImg,
      positionX: 4,
      positionY: 4,
      verticalSize: 0,
      horizontalSize: 0,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: false,
    },
    {
      name: "estante",
      file: estanteImg,
      positionX: 2,
      positionY: 0,
      verticalSize: 3,
      horizontalSize: 4,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
    },
    {
      name: "vaso",
      file: vasoImg,
      positionX: 0,
      positionY: 1,
      verticalSize: 2,
      horizontalSize: 1,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
    },
    {
      name: "abajur",
      file: abajurImg,
      positionX: 7,
      positionY: 1,
      verticalSize: 2,
      horizontalSize: 1,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
    },
    {
      name: "sofa",
      file: sofaImg,
      positionX: 2,
      positionY: 3,
      verticalSize: 2,
      horizontalSize: 1,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
    },
    {
      name: "mesinha",
      file: mesinhaImg,
      positionX: 3,
      positionY: 3,
      verticalSize: 1,
      horizontalSize: 1,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
    },
    {
      name: "cadeira",
      file: cadeiraImg,
      positionX: 6,
      positionY: 5,
      verticalSize: 1,
      horizontalSize: 1,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
      flip: { x: 1, y: 0 },
    },
    {
      name: "poltrona",
      file: poltronaImg,
      positionX: 5,
      positionY: 3,
      verticalSize: 1,
      horizontalSize: 1,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
    },
    {
      name: "mesaHoriz",
      file: mesaHorizImg,
      positionX: 4,
      positionY: 5,
      verticalSize: 1,
      horizontalSize: 2,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: true,
    },
    {
      name: "obstacle",
      file: obs1Img,
      positionX: 4,
      positionY: 3,
      verticalSize: 1,
      horizontalSize: 1,
      calcPositionX: calcPosition,
      calcPositionY: calcPosition,
      collide: false,
      overlap: true,
    },
  ],
  sprites: [
    {
      name: "bia",
      file: biaImg,
      frameWidth: 58,
      frameHeight: 74,
      positionX: 3,
      positionY: 4,
      verticalSize: 1,
      horizontalSize: 1,
      collideWorldBounds: true,
      defaultPosition: "right",
      calcPositionX: calcPosition,
      calcPositionY: calcPositionSprite,
      movable: true,
      collision: true,
      calArea: calcCollideSprite,
      createAnims: createAnims,
    },
    {
      name: "cyber",
      file: cyberImg,
      frameWidth: 73,
      frameHeight: 73,
      verticalSize: 1,
      horizontalSize: 1,
      positionX: 5,
      positionY: 4,
      movable: false,
      calcPositionX: calcPositionCyberX,
      calcPositionY: calcPositionCyberY,
      calArea: calcCollideCyber,
      createAnims: createAnimsCyber,
    },
  ],
};

function createGame(callbackSuccess, callbackFail) {
  function onCollide(obj1) {
    isFail = true;
    setTimeout(() => {
      let msg = `Cuidado com os obstáculos.`;
      callbackFail(reset, msg);
      scene.pause();
    }, 1000);
    if (obj1.body.touching.up) {
      obj1.anims.play("collideTop", true);
      obj1.y = obj1.y + 1;
      return;
    }

    if (obj1.body.touching.down) {
      obj1.anims.play("collideBottom", true);
      obj1.y = obj1.y - 1;
      return;
    }

    if (obj1.body.touching.left) {
      obj1.anims.play("collideLeft", true);
      obj1.x = obj1.x + 1;
      return;
    }
    if (obj1.body.touching.right) {
      obj1.anims.play("collideRight", true);
      obj1.x = obj1.x - 1;
      return;
    }
  }

  function onCollideWorld(body, left, right, up, down) {
    if (up) {
      isFail = true;
      body.gameObject.anims.play("collideTop", true);
      body.gameObject.y = body.gameObject.y + 1;
      setTimeout(() => {
        scene.pause();
        msg = "Ops! Bati nas paredes. Tente desviar delas.";
        callbackFail(reset, msg);
      }, 1000);
      return;
    }

    if (down) {
      isFail = true;
      body.gameObject.anims.play("collideBottom", true);
      body.gameObject.y = body.gameObject.y - 1;
      setTimeout(() => {
        scene.pause();
        msg = "Ops! Bati nas paredes. Tente desviar delas.";
        callbackFail(reset, msg);
      }, 1000);
      return;
    }

    if (left) {
      isFail = true;
      body.gameObject.anims.play("collideLeft", true);
      body.gameObject.x = body.gameObject.x + 1;
      setTimeout(() => {
        scene.pause();
        msg = "Ops! Bati nas paredes. Tente desviar delas.";
        callbackFail(reset, msg);
      }, 1000);
      return;
    }
    if (right) {
      isFail = true;
      body.gameObject.anims.play("collideRight", true);
      body.gameObject.x = body.gameObject.x - 1;
      setTimeout(() => {
        scene.pause();
        msg = "Ops! Bati nas paredes. Tente desviar delas.";
        callbackFail(reset, msg);
      }, 1000);
      return;
    }
  }

  function preload() {
    params.images.forEach((image) => {
      this.load.image(image.name, image.file);
    });

    params.sprites.forEach((sprite) => {
      this.load.spritesheet(sprite.name, sprite.file, {
        frameWidth: sprite.frameWidth,
        frameHeight: sprite.frameHeight,
      });
    });
  }

  function create() {
    params.images.forEach((image, index) => {
      const imageConfig = this.physics.add
        .staticImage(
          image.calcPositionX(image.positionX, image.horizontalSize),
          image.calcPositionY(image.positionY, image.verticalSize),
          image.name
        )
        .setName(image.name);

      image?.flip ? imageConfig.setFlip(image.flip.x, image.flip.y) : undefined;
      params.images[index].obj = imageConfig;
      imageConfig.setImmovable(true);
    });

    params.sprites.forEach((sprite) => {
      const spriteConfig = this.physics.add
        .sprite(
          sprite.calcPositionX(sprite.positionX, sprite.horizontalSize),
          sprite.calcPositionY(
            sprite.positionY,
            sprite.verticalSize,
            sprite.frameHeight / 2
          ),
          sprite.name
        )
        .setName(sprite.name)
        .setCollideWorldBounds(sprite.collideWorldBounds);

      spriteConfig.body.onWorldBounds = true;
      sprite.calArea(spriteConfig, sprite, squareSize);
      sprite.createAnims(spriteConfig, sprite.name);
      if (sprite.movable) {
        params.images.forEach((image) => {
          if (image.collide)
            this.physics.add.collider(spriteConfig, image.obj, (obj1) =>
              onCollide(obj1)
            );
          if (image.overlap)
            this.physics.add.overlap(spriteConfig, image.obj, () => {
              isSliding = true;
            });
        });
      }
    });

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      onCollideWorld(body, left, right, up, down);
    });

    source = this.children.getByName("bia");
    cyber = this.children.getByName("cyber");

    source.anims.play(position, true);
    this.physics.add.overlap(source, cyber, () => {
      isSuccess = true;
    });

    physics = this.physics;
    scene = this.scene;
    registry = this.registry;
    events = this.events;
    sys = this.sys;
  }

  function update() {
    var distance = Phaser.Math.Distance.Between(
      source.x,
      source.y,
      target.x,
      target.y
    );

    if (source.body.speed > 0) {
      if (distance < 4) {
        source.body.reset(target.x, target.y);
      }
    }
  }

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function sleep(ms, fn, ...args) {
    await timeout(ms);
    return await fn(...args);
  }

  async function actions(slideAnim, defaultAnim) {
    await sleep(velocityControl[speedConfig].time, async () => {
      if (isSliding) {
        isFail = true;
        source.anims.play(slideAnim, true);
        await sleep(1000, async () => {
          msg = "Cuidado com as poças d'água.";
          callbackFail(reset, msg);
          scene.pause();
          // await sleep(1000, () => {
          //   reset()
          // })
        });
      } else if (isSuccess) {
        source.anims.play("jumping", true);
        cyber.anims.play("success", true);
        await sleep(1000, () => {
          callbackSuccess();
        });
      } else {
        if (!isFail) {
          source.anims.play(defaultAnim, true);
        }
      }
    });
  }

  async function positionRight() {
    if (!isFail && !isSuccess) {
      await sleep(300, () => source.anims.play("right", true));
    }
  }

  async function positionLeft() {
    if (!isFail && !isSuccess) {
      await sleep(300, () => source.anims.play("left", true));
    }
  }

  async function positionTop() {
    if (!isFail && !isSuccess) {
      await sleep(300, () => source.anims.play("top", true));
    }
  }

  async function positionBottom() {
    if (!isFail && !isSuccess) {
      await sleep(300, () => source.anims.play("bottom", true));
    }
  }

  async function moveRight() {
    target.x = source.x + squareSize;
    target.y = source.y;
    if (!isFail && !isSuccess) {
      source.anims.play("walkRight", true);
      physics.moveToObject(source, target, velocityControl[speedConfig].speed);
      await actions("slideRight", "right");
    }
  }

  async function moveLeft() {
    target.x = source.x - squareSize;
    target.y = source.y;
    if (!isFail && !isSuccess) {
      source.anims.play("walkLeft", true);
      physics.moveToObject(source, target, velocityControl[speedConfig].speed);
      await actions("slideLeft", "left");
    }
  }

  async function moveTop() {
    target.y = source.y - squareSize;
    target.x = source.x;
    if (!isFail && !isSuccess) {
      source.anims.play("walkTop", true);
      physics.moveToObject(source, target, velocityControl[speedConfig].speed);
      await actions("slideTop", "top");
    }
  }

  async function moveBottom() {
    target.y = source.y + squareSize;
    target.x = source.x;
    if (!isFail && !isSuccess) {
      source.anims.play("walkDown", true);
      physics.moveToObject(source, target, velocityControl[speedConfig].speed);
      await actions("slideBottom", "bottom");
    }
  }
  async function moveForward() {
    if (position === "top") await moveTop();
    else if (position === "bottom") await moveBottom();
    else if (position === "right") await moveRight();
    else if (position === "left") await moveLeft();
  }

  async function turnLeft() {
    console.log(position);

    if (position === "top") {
      await positionLeft();
      position = "left";
    } else if (position === "left") {
      await positionBottom();
      position = "bottom";
    } else if (position === "bottom") {
      await positionRight();
      position = "right";
    } else if (position === "right") {
      await positionTop();
      position = "top";
    }
  }

  async function turnRight() {
    if (position === "bottom") {
      await positionLeft();
      position = "left";
    } else if (position === "right") {
      await positionBottom();
      position = "bottom";
    } else if (position === "top") {
      await positionRight();
      position = "right";
    } else if (position === "left") {
      await positionTop();
      position = "top";
    }
  }

  async function play(javascriptCode) {
    const code = `async function execute(){
      ${javascriptCode}
    }
    execute()`;
    await eval(code);
    if (!isSuccess && !isFail && !isSliding)
      await sleep(1000, async () => {
        msg =
          "Verifique quantos bloquinhos “avance” você colocou no código, conte quantos quadradinhos faltam para eu chegar até o Cyber e programe novamente.";
        callbackFail(reset, msg);
      });
  }

  function reset() {
    isSuccess = false;
    isSliding = false;
    isFail = false;
    position = "right";
    registry.destroy(); // destroy registry
    events.off(); // disable all active events
    scene.restart();
  }

  var config = {
    type: Phaser.CANVAS,
    width: params.config.background.width,
    height: params.config.background.height,
    parent: "game",
    physics: {
      default: "arcade",
      arcade: {
        // debug: true,
      },
    },
    scale: {
      parent: "game",
      mode: Phaser.Scale.FIT,
      width: params.config.background.width,
      height: params.config.background.height,
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  const game = new Phaser.Game(config);

  return {
    game,
    moveBottom,
    moveTop,
    moveLeft,
    moveRight,
    positionRight,
    positionLeft,
    positionTop,
    positionBottom,
    reset,
    play,
  };
}

export default {
  createGame,
  changeVelocity,
};
