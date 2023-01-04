// vendors
import Phaser from "phaser";

// assets
import backgroundImg from "./assets/AbacoGame/bg.png";
import rubberButtonImg from "./assets/AbacoGame/botao_borracha.png";
import moreButtonImg from "./assets/AbacoGame/botao_mais.png";
import lessButtonImg from "./assets/AbacoGame/botao_menos.png";
import checkButtonImg from "./assets/AbacoGame/botao_verificar.png";
import tutorialPlayButton from "./assets/AbacoGame/tutorial_botao_jogar.png";
import tutorialNextButton from "./assets/AbacoGame/tutorial_botao_proximo.png";
import abacusPiecesImg from "./assets/AbacoGame/pecas.png";
import tutorial1Img from "./assets/AbacoGame/tutorial_1.png";
import tutorial2Img from "./assets/AbacoGame/tutorial_2.png";
import tutorial3Img from "./assets/AbacoGame/tutorial_3.png";

function AbacusGame(
  value1: number,
  value2: number,
  type: "sum" | "sub",
  tutorial: boolean
) {
  const calculator = {
    sum: {
      result: value1 + value2,
      symbol: "+",
    },
    sub: {
      result: value1 - value2,
      symbol: "-",
    },
  };

  const abacus = {
    centena: {
      ref: null,
      value: 0,
      text: null,
    },
    dezena: {
      ref: null,
      value: 0,
      text: null,
    },
    unidade: {
      ref: null,
      value: 0,
      text: null,
    },
  };

  const blackboardText = `${value1}${calculator[type].symbol}${value2}=`;
  const result = calculator[type].result;

  let createRef, blackboardTextRef, button;

  let isPlayTutorial = tutorial;
  let isPlaying = !tutorial;
  let tutorialStep = 1;

  // C = Centena, D = Dezena, U = Unidade
  function plusCValue() {
    if (abacus.centena.value >= 9) return;

    abacus.centena.ref.enableBody(true, 115, 335, true, true);

    abacus.centena.value++;

    abacus.centena.text.setText(abacus.centena.value);
    abacus.centena.ref.anims.play(`c-${abacus.centena.value}`);
  }

  function plusDValue() {
    if (abacus.dezena.value >= 9) return;

    abacus.dezena.ref.enableBody(true, 115, 335, true, true);

    abacus.dezena.value++;

    abacus.dezena.text.setText(abacus.dezena.value);
    abacus.dezena.ref.anims.play(`d-${abacus.dezena.value}`);
  }

  function plusUValue() {
    if (abacus.unidade.value >= 9) return;

    abacus.unidade.ref.enableBody(true, 115, 335, true, true);
    abacus.unidade.value++;

    abacus.unidade.text.setText(abacus.unidade.value);
    abacus.unidade.ref.anims.play(`u-${abacus.unidade.value}`);
  }

  function subtractionCValue() {
    if (abacus.centena.value <= 0) return;
    abacus.centena.value--;

    if (abacus.centena.value > 0) {
      abacus.centena.ref.anims.play(`c-${abacus.centena.value}`);
    } else {
      abacus.centena.ref.disableBody(true, true);
    }

    abacus.centena.text.setText(abacus.centena.value);
  }

  function subtractionDValue() {
    if (abacus.dezena.value <= 0) return;
    abacus.dezena.value--;

    if (abacus.dezena.value > 0) {
      abacus.dezena.ref.anims.play(`d-${abacus.dezena.value}`);
    } else {
      abacus.dezena.ref.disableBody(true, true);
    }

    abacus.dezena.text.setText(abacus.dezena.value);
  }

  function subtractionUValue() {
    if (abacus.unidade.value <= 0) return;
    abacus.unidade.value--;

    if (abacus.unidade.value > 0) {
      abacus.unidade.ref.anims.play(`u-${abacus.unidade.value}`);
    } else {
      abacus.unidade.ref.disableBody(true, true);
    }

    abacus.unidade.text.setText(abacus.unidade.value);
  }

  function disableAbacusSprites() {
    abacus.centena.ref.disableBody(true, true);
    abacus.dezena.ref.disableBody(true, true);
    abacus.unidade.ref.disableBody(true, true);
  }

  function resetAbacusValues() {
    abacus.centena.value = 0;
    abacus.dezena.value = 0;
    abacus.unidade.value = 0;

    abacus.centena.text.setText(abacus.centena.value);
    abacus.dezena.text.setText(abacus.dezena.value);
    abacus.unidade.text.setText(abacus.unidade.value);
  }

  // Buttons
  function resetGame() {
    resetAbacusValues();

    disableAbacusSprites();
  }

  function next() {
    tutorialStep++;
  }

  function play() {
    isPlayTutorial = false;
  }

  // FINALIZAR
  function check() {
    const sum =
      abacus.centena.value * 100 +
      abacus.dezena.value * 10 +
      abacus.unidade.value;

    const isChecked = sum === result;
    console.log("checando", isChecked);
  }

  // Create game visual particles
  function createButton(x, y, img, fn) {
    button = createRef.add.image(x, y, img);
    button.setInteractive({ useHandCursor: true });
    button.on("pointerdown", fn);
  }

  function createAbacusPieces() {
    // centenas
    abacus.centena.ref.anims.create({
      key: "c-1",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [0],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-2",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [1],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-3",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [2],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-4",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [3],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-5",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [4],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-6",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [5],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-7",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [6],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-8",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [7],
      }),
    });

    abacus.centena.ref.anims.create({
      key: "c-9",
      frames: abacus.centena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [8],
      }),
    });

    // dezenas
    abacus.dezena.ref.anims.create({
      key: "d-1",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [9],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-2",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [10],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-3",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [11],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-4",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [12],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-5",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [13],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-6",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [14],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-7",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [15],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-8",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [16],
      }),
    });

    abacus.dezena.ref.anims.create({
      key: "d-9",
      frames: abacus.dezena.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [17],
      }),
    });

    // unidades
    abacus.unidade.ref.anims.create({
      key: "u-1",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [18],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-2",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [19],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-3",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [20],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-4",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [21],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-5",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [22],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-6",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [23],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-7",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [24],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-8",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [25],
      }),
    });

    abacus.unidade.ref.anims.create({
      key: "u-9",
      frames: abacus.unidade.ref.anims.generateFrameNumbers("abacus-pieces", {
        frames: [26],
      }),
    });
  }

  function createGame() {
    createRef.add.image(250, 250, "background");

    // // buttons
    createButton(265, 325, "plus", plusCValue);
    createButton(265, 420, "less", subtractionCValue);
    createButton(350, 325, "plus", plusDValue);
    createButton(350, 420, "less", subtractionDValue);
    createButton(435, 325, "plus", plusUValue);
    createButton(435, 420, "less", subtractionUValue);

    createButton(450, 240, "rubber", resetGame);
    createButton(435, 480, "check", check);

    // texts
    blackboardTextRef = createRef.add.text(150, 80, abacus.centena.value, {
      fontSize: "64px",
      fontWeight: "bold",
      fill: "#fff",
    });

    blackboardTextRef.setText(blackboardText);

    abacus.centena.text = createRef.add.text(257, 360, abacus.centena.value, {
      fontSize: "32px",
      fontWeight: "bold",
      fill: "#fff",
    });

    abacus.dezena.text = createRef.add.text(342, 360, abacus.dezena.value, {
      fontSize: "32px",
      fontWeight: "bold",
      fill: "#fff",
    });

    abacus.unidade.text = createRef.add.text(427, 360, abacus.unidade.value, {
      fontSize: "32px",
      fontWeight: "bold",
      fill: "#fff",
    });

    // sprites
    abacus.centena.ref = createRef.physics.add.sprite(
      115,
      335,
      "abacus-pieces"
    );

    abacus.dezena.ref = createRef.physics.add.sprite(115, 335, "abacus-pieces");

    abacus.unidade.ref = createRef.physics.add.sprite(
      115,
      335,
      "abacus-pieces"
    );

    disableAbacusSprites();

    createAbacusPieces();
  }

  // CONFIGURATION

  const config = {
    type: Phaser.CANVAS,
    width: 500,
    height: 500,
    parent: "game",
    physics: {
      default: "arcade",
      arcade: {
        // debug: true,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  function preload() {
    // backgrounds
    this.load.image("background", backgroundImg);
    this.load.image("tutorial-1", tutorial1Img);
    this.load.image("tutorial-2", tutorial2Img);
    this.load.image("tutorial-3", tutorial3Img);

    // buttons
    this.load.image("rubber", rubberButtonImg);
    this.load.image("plus", moreButtonImg);
    this.load.image("less", lessButtonImg);
    this.load.image("check", checkButtonImg);
    this.load.image("play", tutorialPlayButton);
    this.load.image("next", tutorialNextButton);

    // abacus pieces
    this.load.spritesheet("abacus-pieces", abacusPiecesImg, {
      // frameWidth: 73,
      frameWidth: 203,
      frameHeight: 270,
    });
  }

  function create() {
    createRef = this;

    if (isPlayTutorial && tutorialStep === 1) {
      this.add.image(250, 250, "tutorial-1");
      createButton(435, 480, "next", next);
    } else {
      createGame();
    }
  }

  function update() {
    if (isPlayTutorial) {
      this.add.image(250, 250, `tutorial-${tutorialStep}`);
      createButton(435, 480, "next", next);
    }

    if (isPlayTutorial && tutorialStep === 3) {
      this.add.image(250, 250, `tutorial-${tutorialStep}`);
      createButton(435, 480, "play", play);
    }

    if (!isPlayTutorial && !isPlaying) {
      isPlaying = true;
      createGame();
    }
  }

  return new Phaser.Game(config);
}

export default AbacusGame;
