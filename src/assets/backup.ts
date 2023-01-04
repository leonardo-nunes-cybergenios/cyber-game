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
import abagoPiecesImg from "./assets/AbacoGame/pecas.png";
import tutorial1Img from "./assets/AbacoGame/tutorial_1.png";
import tutorial2Img from "./assets/AbacoGame/tutorial_2.png";
import tutorial3Img from "./assets/AbacoGame/tutorial_3.png";

let cValue = 0;
let dValue = 0;
let uValue = 0;

function AbacoGame() {
  //necessário criar this para funções
  let abacoU, abacoD, abacoC, createThis, button;

  let firstTime = false;
  const result = 34;
  let tutorialStep = 1;
  let cValueText, dValueText, uValueText;

  let exerciceText;

  // function plusValue(variable, variableText) {
  //   if (variable >= 9) return;
  //   variable++;

  //   variableText.setText(variable);
  // }

  // function subtractionValue(variable) {
  //   if (variable <= 0) return;
  //   variable--;
  // }

  // FUNCTIONS

  function createButton(x, y, img, fn) {
    button = createThis.add.image(x, y, img);
    button.setInteractive({ useHandCursor: true });
    button.on("pointerdown", fn);
  }

  function plusCValue() {
    if (cValue >= 9) return;

    // abacoC.enableBody(true, 115, 340, true, true);

    cValue++;

    if (cValue > 0) {
      abacoC.anims.play(`c-${cValue}`);
    }

    cValueText.setText(cValue);
  }

  function plusDValue() {
    if (dValue >= 9) return;

    abacoD.enableBody(true, 115, 340, true, true);

    dValue++;

    if (dValue > 0) {
      abacoD.anims.play(`d-${dValue}`);
    }

    dValueText.setText(dValue);
  }

  function plusUValue() {
    if (uValue >= 9) return;

    abacoU.enableBody(true, 115, 340, true, true);
    uValue++;

    if (uValue > 0) {
      abacoU.anims.play(`u-${uValue}`);
    }

    uValueText.setText(uValue);
  }

  function subtractionCValue() {
    if (cValue <= 0) return;
    cValue--;

    if (cValue > 0) {
      abacoC.anims.play(`c-${cValue}`);
    } else {
      abacoC.disableBody(true, true);
    }

    cValueText.setText(cValue);
  }

  function subtractionDValue() {
    if (dValue <= 0) return;
    dValue--;

    if (dValue > 0) {
      abacoD.anims.play(`d-${dValue}`);
    } else {
      abacoD.disableBody(true, true);
    }

    dValueText.setText(dValue);
  }

  function subtractionUValue() {
    if (uValue <= 0) return;
    uValue--;

    if (uValue > 0) {
      abacoU.anims.play(`u-${uValue}`);
    } else {
      abacoU.disableBody(true, true);
    }

    uValueText.setText(uValue);
  }

  function resetImages() {
    abacoC.disableBody(true, true);
    abacoD.disableBody(true, true);
    abacoU.disableBody(true, true);
  }

  function reset() {
    cValue = 0;
    dValue = 0;
    uValue = 0;

    cValueText.setText(cValue);
    dValueText.setText(dValue);
    uValueText.setText(uValue);

    // resetImages();
  }

  function createPiecesAnims() {
    // centenas
    abacoC.anims.create({
      key: "c-1",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [0],
      }),
    });

    abacoC.anims.create({
      key: "c-2",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [1],
      }),
    });

    abacoC.anims.create({
      key: "c-3",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [2],
      }),
    });

    abacoC.anims.create({
      key: "c-4",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [3],
      }),
    });

    abacoC.anims.create({
      key: "c-5",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [4],
      }),
    });

    abacoC.anims.create({
      key: "c-6",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [5],
      }),
    });

    abacoC.anims.create({
      key: "c-7",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [6],
      }),
    });

    abacoC.anims.create({
      key: "c-8",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [7],
      }),
    });

    abacoC.anims.create({
      key: "c-9",
      frames: abacoC.anims.generateFrameNumbers("abaco-pieces", {
        frames: [8],
      }),
    });

    // dezenas
    abacoD.anims.create({
      key: "d-1",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [9],
      }),
    });

    abacoD.anims.create({
      key: "d-2",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [10],
      }),
    });

    abacoD.anims.create({
      key: "d-3",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [11],
      }),
    });

    abacoD.anims.create({
      key: "d-4",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [12],
      }),
    });

    abacoD.anims.create({
      key: "d-5",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [13],
      }),
    });

    abacoD.anims.create({
      key: "d-6",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [14],
      }),
    });

    abacoD.anims.create({
      key: "d-7",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [15],
      }),
    });

    abacoD.anims.create({
      key: "d-8",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [16],
      }),
    });

    abacoD.anims.create({
      key: "d-9",
      frames: abacoD.anims.generateFrameNumbers("abaco-pieces", {
        frames: [17],
      }),
    });

    // unidade
    abacoU.anims.create({
      key: "u-1",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [18],
      }),
    });

    abacoU.anims.create({
      key: "u-2",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [19],
      }),
    });

    abacoU.anims.create({
      key: "u-3",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [20],
      }),
    });

    abacoU.anims.create({
      key: "u-4",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [21],
      }),
    });

    abacoU.anims.create({
      key: "u-5",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [22],
      }),
    });

    abacoU.anims.create({
      key: "u-6",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [23],
      }),
    });

    abacoU.anims.create({
      key: "u-7",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [24],
      }),
    });

    abacoU.anims.create({
      key: "u-8",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [25],
      }),
    });

    abacoU.anims.create({
      key: "u-9",
      frames: abacoU.anims.generateFrameNumbers("abaco-pieces", {
        frames: [26],
      }),
    });
  }

  function check() {
    const isChecked = cValue * 100 + dValue * 10 + uValue === result;
    console.log("checando", isChecked);
  }

  function next() {
    if (tutorialStep < 3) {
      tutorialStep++;
    }
  }

  function play() {
    firstTime = false;
    console.log(firstTime);
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

    // abaco pieces
    this.load.spritesheet("abaco-pieces", abagoPiecesImg, {
      // frameWidth: 73,
      frameWidth: 203,
      frameHeight: 270,
    });
  }

  function create() {
    createThis = this;

    // if (firstTime && tutorialStep === 1) {
    //   this.add.image(250, 250, "tutorial-1");
    //   createButton(435, 480, "next", next);
    // } else {
    //   gamePlay();
    // }

    gamePlay()
  }

  function update() {
    if (firstTime) {
      this.add.image(250, 250, `tutorial-${tutorialStep}`);
      createButton(435, 480, "next", next);
    }

    if (firstTime && tutorialStep === 3) {
      this.add.image(250, 250, `tutorial-${tutorialStep}`);
      createButton(435, 480, "play", play);
    }

    if (!firstTime) {
      gamePlay();
    }
  }

  function gamePlay() {
    createThis.add.image(250, 250, "background");

    // // buttons
    createButton(265, 325, "plus", plusCValue);
    createButton(265, 420, "less", subtractionCValue);
    createButton(350, 325, "plus", plusDValue);
    createButton(350, 420, "less", subtractionDValue);
    createButton(435, 325, "plus", plusUValue);
    createButton(435, 420, "less", subtractionUValue);

    createButton(435, 480, "play", play);
    createButton(435, 480, "next", next);
    createButton(450, 240, "rubber", reset);
    createButton(435, 480, "check", check);

    // texts
    exerciceText = createThis.add.text(150, 80, cValue, {
      fontSize: "64px",
      fontWeight: "bold",
      fill: "#fff",
    });

    exerciceText.setText("24+10=");

    cValueText = createThis.add.text(257, 360, cValue, {
      fontSize: "32px",
      fontWeight: "bold",
      fill: "#fff",
    });

    dValueText = createThis.add.text(342, 360, dValue, {
      fontSize: "32px",
      fontWeight: "bold",
      fill: "#fff",
    });

    uValueText = createThis.add.text(427, 360, uValue, {
      fontSize: "32px",
      fontWeight: "bold",
      fill: "#fff",
    });

    // sprites
    abacoC = createThis.physics.add.sprite(115, 340, "abaco-pieces");
    abacoD = createThis.physics.add.sprite(115, 340, "abaco-pieces");
    abacoU = createThis.physics.add.sprite(115, 340, "abaco-pieces");

    // resetImages();

    createPiecesAnims();
  }
  const game = new Phaser.Game(config);

  return game;
}

export default AbacoGame;
