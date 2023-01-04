// assets
import cyberImg from "./assets/firstGame/cyber.png";
import vasoImg from "./assets/firstGame/prop_vaso.png";
import backgroundImg from "./assets/firstGame/background.png";

// função para ler código retirado dos Blockys, necessário async para aguardar os movimentos serem finalizados
async function play(javascriptCode) {
  const code = `async function execute(){
    ${javascriptCode}
  }
  execute()`;

  await eval(code);
  // if (!isSuccess && !isFail && !isSliding) {
  //   bia.anims.play(direction);
  //   await sleep(velocityControl[speedAnimation].time, () => {
  //     const text =
  //       "Verifique quantos bloquinhos “avance” você colocou no código, conte quantos quadradinhos faltam para eu chegar até o Cyber e programe novamente.";
  //     callbackFail(text);
  //   });
}

function CreateGame() {
  // adiciona valores mutáveis
  let cyber;

  // configurações do jogo
  const config = {
    type: Phaser.CANVAS,
    width: 416,
    height: 416,
    // parent direciona o nome da div a que deve se atrelar
    parent: "game",
    physics: {
      default: "arcade",
      arcade: {
        // caso queira ver hitbox de todos elementos
        debug: true,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  // PRIMEIRO monte o Layout do game

  // Preload carrega TODAS as imagens necessárias no jogo, como img ou sprite
  function preload() {
    // imagem apenas carrega com nome e import da imagem

    this.load.image("background", backgroundImg);
    this.load.image("vaso", vasoImg);
    // sprite é necessário além disso os frames que o mesmo possui.
    this.load.spritesheet("cyber", cyberImg, {
      frameWidth: 73,
      frameHeight: 73,
    });
  }

  function create() {
    // Aqui adiciona todas as informações ao jogo
    // Exemplo as imagens foram pre-carregadas, aqui se adiciona realmente a tela do jogo
    // Caso tenha sprite tem que criar cada animação

    // adiciona plano de fundo do jogo(deve-se posicionar com valor de metade do quadro)
    this.add.image(208, 208, "background");

    // confirmar se será realizado com criação de grupos estáticos, caso sim, cria o grupo
    // sendo colliders, ou overlaps
    // não tem diferença na criação, mas cada grupo segue sua regra então, um que colide não deve ter overlap, via de regra.
    const colliders = this.physics.add.staticGroup();
    const overlaps = this.physics.add.staticGroup();

    colliders.create(calculatePosition(0), calculatePosition(1, 2), "vaso");
    overlaps.create(calculatePosition(0), calculatePosition(1, 2), "vaso");

    // sprites
    // calcula posição e adiciona o elemento a imagem do jogo
    // sprites as vezes precisam alinhar mais manualmente a imagem existe o diference por isso.
    cyber = this.physics.add.sprite(
      calculatePosition(5),
      calculatePosition(4, 1, 12),
      "cyber"
    );

    // ANIMAÇÕES CRIAÇÃO

    // É necessário saber os quadros iniciais e finais do sprite para animação
    // criasse a key, para posteriormente chamar animação com essa key
    // animações podem ser meio
    cyber.anims.create({
      key: "success",
      frames: cyber.anims.generateFrameNumbers("cyber", { start: 48, end: 68 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}

function update() {
  // ainda n entendi direito, mas quando tem atualização de informações aqui atualiza +/- isso
}

export default CreateGame;

// Para posicionamento foi criada a função de auxilio, onde deve-se colocar o número do quadrado
// que se deseja adicionar o elemento
function calculatePosition(square: number, itemSize = 1, diference = 0) {
  const squareSize = 52; // depende do jogo

  // square posição X ou Y que deseja
  // itemSize no eixo em que se deseja ocupa quantos blocos.
  return square * squareSize + (itemSize * squareSize) / 2 - diference;
}
