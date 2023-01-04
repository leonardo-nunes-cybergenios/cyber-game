// vendors
import Phaser from "phaser";

// assets
import backCard from "./assets/back-card.png";

// Global variables
let createRef;

function CreateGame() {
  const config = {
    type: Phaser.CANVAS,
    width: 600,
    height: 600,
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
      width: 600,
      height: 600,
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  function preload() {}

  function create() {
    createRef = this;
  }

  function update() {}

  const game = new Phaser.Game(config);

  return game;
}

export default { CreateGame };
