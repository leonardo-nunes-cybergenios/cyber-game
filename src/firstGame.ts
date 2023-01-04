// vendors
import Phaser from "phaser";

// assets
import biaImg from "./assets/firstGame/bia.png";
import cyberImg from "./assets/firstGame/cyber.png";
import backgroundImg from "./assets/firstGame/background.png";
import obs1Img from "./assets/firstGame/obstaculo_1.png";
import abajurImg from "./assets/firstGame/prop_abajur.png";
import cadeiraImg from "./assets/firstGame/prop_cadeira.png";
import estanteImg from "./assets/firstGame/prop_estante.png";
import mesaHorizImg from "./assets/firstGame/prop_mesa_horiz.png";
import mesinhaImg from "./assets/firstGame/prop_mesinha.png";
import poltronaImg from "./assets/firstGame/prop_poltrona.png";
import sofaImg from "./assets/firstGame/prop_sofa.png";
import vasoImg from "./assets/firstGame/prop_vaso.png";

function createGame(callbackSuccess, callbackFail) {
  let bia, cyber, controls, isTurning, scene, registry, events;

  let squareSize = 52;
  let isSliding = false;
  let isSuccess = false;
  let isFail = false;
  let direction = "right";
  let speedAnimation = "regular";

  const DIRECTIONS = ["top", "right", "bottom", "left"];

  const velocityControl = {
    slow: { pixelPerSecond: squareSize / 2, time: 2000 },
    regular: { pixelPerTime: squareSize, time: 1000 },
    fast: { pixelPerTime: squareSize * 2, time: 500 },
  };

  function changeSpeedAnimation(sliderValue) {
    if (sliderValue < 50) {
      speedAnimation = "slow";
    } else if (sliderValue === 50) {
      speedAnimation = "regular";
    } else {
      speedAnimation = "fast";
    }
  }

  function calculatePosition(square, itemSize = 1) {
    return square * squareSize + (itemSize * squareSize) / 2;
  }

  async function sleep(ms, fn, ...args) {
    const timeout = new Promise((resolve) => setTimeout(resolve, ms));
    await timeout;

    return await fn(...args);
  }

  async function turnRight() {
    /// just keyboard
    if (isTurning || isFail) return;

    isTurning = true;
    //
    const position = DIRECTIONS.indexOf(direction);
    if (position < 3) {
      direction = DIRECTIONS[position + 1];
    } else {
      direction = DIRECTIONS[0];
    }

    bia.play(direction, true);

    await sleep(300, () => {
      isTurning = false;
    });
  }

  async function turnLeft() {
    if (isTurning || isFail) return;

    isTurning = true;

    const position = DIRECTIONS.indexOf(direction);

    if (position > 0) {
      direction = DIRECTIONS[position - 1];
    } else {
      direction = DIRECTIONS[3];
    }

    bia.play(direction, true);

    await sleep(300, () => (isTurning = false));
    //   isTurning = false;
    // }, 500);
  }

  function stopActiveMove(player) {
    player?.setVelocityY(0);
    player?.setVelocityX(0);
  }

  async function move(player, frame) {
    if (direction === "top") {
      player?.setVelocityY(frame * -1);
    } else if (direction === "right") {
      player?.setVelocityX(frame);
    } else if (direction === "bottom") {
      player?.setVelocityY(frame);
    } else if (direction === "left") {
      player?.setVelocityX(frame * -1);
    }

    await sleep(velocityControl[speedAnimation].time, () => {
      stopActiveMove(player);
    });
  }

  async function moveBia() {
    if (isFail) return;

    bia.anims.play(`walk-${direction}`, true);

    await move(bia, velocityControl[speedAnimation].pixelPerTime);
  }

  async function collideConfirm() {
    if (isFail) return;
    isFail = true;

    stopActiveMove(bia);

    bia.anims.play(`collide-${direction}`, true);

    await sleep(velocityControl[speedAnimation].time, () =>
      callbackFail("Cuidado com os obstáculos.")
    );
    console.log("bateu nas coisas recalcule filhao");
  }

  async function collideWorldConfirm() {
    if (isFail) return;
    isFail = true;

    stopActiveMove(bia);
    bia.anims.play(`collide-${direction}`, true);

    await sleep(velocityControl[speedAnimation].time, () =>
      callbackFail("Ops! Bati nas paredes. Tente desviar delas.")
    );
  }

  async function slidingConfirm() {
    if (isSliding) return;

    isSliding = true;
    isFail = true;

    setTimeout(() => {
      stopActiveMove(bia);
      bia.anims.play(`slide-${direction}`, true);
    }, velocityControl[speedAnimation].time);

    await sleep(2 * velocityControl[speedAnimation].time, () =>
      callbackFail("Cuidado com as poças d'água!")
    );
  }

  async function successConfirm() {
    if (isSuccess) return;

    isSuccess = true;

    setTimeout(() => {
      stopActiveMove(bia);
      bia.anims.play("success", true);
      cyber.anims.play("success", true);
    }, velocityControl[speedAnimation].time);

    await sleep(2 * velocityControl[speedAnimation].time, () =>
      callbackSuccess("Você está pronto para o próximo nível.")
    );
  }

  async function play(javascriptCode) {
    const code = `async function execute(){
      ${javascriptCode}
    }
    execute()`;

    await eval(code);
    if (!isSuccess && !isFail && !isSliding) {
      bia.anims.play(direction);
      await sleep(velocityControl[speedAnimation].time, () => {
        const text =
          "Verifique quantos bloquinhos “avance” você colocou no código, conte quantos quadradinhos faltam para eu chegar até o Cyber e programe novamente.";
        callbackFail(text);
      });
    }
  }

  function pause() {
    scene?.pause();
  }

  function reset() {
    isFail = false;
    isSliding = false;
    isSuccess = false;
    direction = "right";
    registry?.destroy(); // destroy registry
    events?.off(); // disable all active events
    scene?.restart();
    bia.anims.play("right");
  }

  var config = {
    type: Phaser.CANVAS,
    width: 416,
    height: 416,
    parent: "first-game",
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  function preload() {
    this.load.image("background", backgroundImg);
    this.load.image("obs1", obs1Img);
    this.load.image("abajur", abajurImg);
    this.load.image("cadeira", cadeiraImg);
    this.load.image("estante", estanteImg);
    this.load.image("mesa-hori", mesaHorizImg);
    this.load.image("mesinha", mesinhaImg);
    this.load.image("poltrona", poltronaImg);
    this.load.image("sofa", sofaImg);
    this.load.image("vaso", vasoImg);
    this.load.spritesheet("cyber", cyberImg, {
      frameWidth: 73,
      frameHeight: 73,
    });
    this.load.spritesheet("bia", biaImg, { frameWidth: 58, frameHeight: 74 });
  }

  function create() {
    controls = this.input.keyboard.createCursorKeys();

    this.add.image(208, 208, "background");

    const objects = this.physics.add.staticGroup();

    objects.create(calculatePosition(0), calculatePosition(1, 2), "vaso");
    objects.create(calculatePosition(2), calculatePosition(3, 2), "sofa");
    objects.create(calculatePosition(2, 4), calculatePosition(1), "estante");
    objects.create(calculatePosition(7), calculatePosition(1, 2), "abajur");
    objects.create(calculatePosition(4, 2), calculatePosition(5), "mesa-hori");
    objects.create(calculatePosition(3), calculatePosition(3), "mesinha");
    objects.create(calculatePosition(5), calculatePosition(3), "poltrona");
    objects
      .create(calculatePosition(6), calculatePosition(5), "cadeira")
      .setFlip({ x: 1, y: 0 });

    const water = this.physics.add.staticGroup();
    water.create(calculatePosition(4), calculatePosition(3), "obs1");

    // sprites
    cyber = this.physics.add.sprite(
      calculatePosition(5),
      calculatePosition(4) + 12,
      "cyber"
    );

    bia = this.physics.add.sprite(
      calculatePosition(3),
      calculatePosition(3) + 22,
      "bia"
    );

    // ANIMATIONS

    // Cyber
    //success
    cyber.anims.create({
      key: "success",
      frames: cyber.anims.generateFrameNumbers("cyber", { start: 48, end: 68 }),
      frameRate: 10,
      repeat: -1,
    });

    // Bia
    // directions
    bia.anims.create({
      key: "top",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [5] }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "right",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [15] }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "bottom",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [0] }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "left",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [10] }),
      frameRate: 10,
      repeat: -1,
    });

    // movement
    bia.anims.create({
      key: "walk-top",
      frames: bia.anims.generateFrameNumbers("bia", { start: 6, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "walk-right",
      frames: bia.anims.generateFrameNumbers("bia", { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "walk-bottom",
      frames: bia.anims.generateFrameNumbers("bia", { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "walk-left",
      frames: bia.anims.generateFrameNumbers("bia", { start: 11, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });

    // success
    bia.anims.create({
      key: "success",
      frames: bia.anims.generateFrameNumbers("bia", { start: 20, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });

    // colliders anims
    bia.anims.create({
      key: "collide-top",
      frames: bia.anims.generateFrameNumbers("bia", { start: 83, end: 90 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "collide-right",
      frames: bia.anims.generateFrameNumbers("bia", { start: 66, end: 74 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "collide-bottom",
      frames: bia.anims.generateFrameNumbers("bia", { start: 75, end: 82 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "collide-left",
      frames: bia.anims.generateFrameNumbers("bia", { start: 57, end: 65 }),
      frameRate: 8,
      repeat: -1,
    });

    // sliding anims
    bia.anims.create({
      key: "slide-top",
      frames: bia.anims.generateFrameNumbers("bia", { start: 49, end: 56 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "slide-right",
      frames: bia.anims.generateFrameNumbers("bia", { start: 24, end: 31 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "slide-bottom",
      frames: bia.anims.generateFrameNumbers("bia", { start: 40, end: 48 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "slide-left",
      frames: bia.anims.generateFrameNumbers("bia", { start: 32, end: 39 }),
      frameRate: 8,
      repeat: -1,
    });

    // initial set
    bia.anims.play(direction, true);
    bia.setCollideWorldBounds(true);
    bia.body.onWorldBounds = true;

    // resize frames
    cyber.setCircle(24, 12, 0);
    bia.setCircle(22, 7, 45);

    // colliders
    this.physics.add.collider(bia, objects, collideConfirm, null, this);
    this.physics.add.overlap(bia, cyber, successConfirm, null, this);
    this.physics.add.overlap(bia, water, slidingConfirm, null, this);

    // collide world
    this.physics.world.on("worldbounds", collideWorldConfirm);

    scene = this.scene;
    registry = this.registry;
    events = this.events;
    scene = this.scene;
  }

  async function update() {
    if (controls.up.isDown) {
      await moveBia();
    } else if (controls.right.isDown) {
      await turnRight();
    } else if (controls.left.isDown) {
      await turnLeft();
    } else if (controls.down.isDown) {
      reset();
    }
  }

  const game = new Phaser.Game(config);

  function createGame() {
    return game;
  }

  return {
    createGame,
    changeSpeedAnimation,
    play,
    pause,
    reset,
  };
}

export default createGame;
