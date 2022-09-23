// vendors
import { useEffect, useState } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// game
import createGame from "./firstGame";

// styles
import "./App.css";
import styles from "./blockly.module.css";

// components
import Modal from "./testModal";

let toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "forward",
    },
    {
      kind: "block",
      type: "turn-left",
    },
    {
      kind: "block",
      type: "turn-right",
    },
  ],
};

const config = {
  grid: {
    spacing: 1,
    length: 1,
    colour: "#fff",
    snap: true,
  },
  move: {
    scrollbars: {
      vertical: true,
      horizontal: false,
    },
    drag: false,
    wheel: true,
  },
  // maxInstances: {
  //   block-forward: 1,
  // },
};

function App() {
  const [xml, setXml] = useState(
    '<xml id="xmlteste" xmlns="http://www.w3.org/1999/xhtml"></xml>'
  );
  const [workspaceConfiguration, setWorkspaceConfiguration] = useState(null);
  const [javascriptCode, setJavascriptCode] = useState("");
  const [game, setGame] = useState(null);
  const [toolboxCategories, setToolboxCategories] = useState({
    kind: "flyoutToolbox",
    contents: [],
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textModal, setTextModal] = useState(null);

  useEffect(() => {
    if (!workspaceConfiguration) {
      setWorkspaceConfiguration(config);
    }
  }, []);

  useEffect(() => {
    // window.location.reload();
  }, []);

  useEffect(() => {
    const game = createGame(openSuccessModal, openFailModal);
    setGame(game);
    constructWorkspace();
    setToolboxCategories(toolbox);

    return () => {
      game.reset();
    };
  }, [setWorkspaceConfiguration]);

  function changeSpeed(velocity) {
    game.changeSpeedAnimation(velocity);
  }

  function workspaceDidChange(workspace) {
    Blockly.svgResize(workspace);
    const rootBlock = workspace
      .getAllBlocks()
      .find((block) => block.type === "block_start");

    const code = getCode(rootBlock);
    setJavascriptCode(code);
  }

  function constructWorkspace() {
    Blockly.Blocks["block_start"] = {
      init: function () {
        this.appendDummyInput().appendField("Quando executar");
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setDeletable(false);
        this.setEditable(false);
        this.setMovable(false);
      },
    };

    Blockly.JavaScript["block_start"] = function (block) {
      var code = ``;
      return code;
    };

    const blockStart = Blockly.getMainWorkspace().newBlock("block_start");
    blockStart.initSvg();
    blockStart.render();
    blockStart.moveBy(170, 50);

    Blockly.Blocks["forward"] = {
      init: function () {
        this.appendDummyInput().appendField("Avançar");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
      },
    };

    Blockly.JavaScript["forward"] = function (block) {
      // TODO: Assemble JavaScript into code variable.
      var code = "await moveBia()\n";
      return code;
    };

    Blockly.Blocks["turn-right"] = {
      init: function () {
        this.appendDummyInput().appendField("Virar à direita");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
      },
    };

    Blockly.JavaScript["turn-right"] = function (block) {
      // TODO: Assemble JavaScript into code variable.
      var code = "await turnRight()\n";
      return code;
    };

    Blockly.Blocks["turn-left"] = {
      init: function () {
        this.appendDummyInput().appendField("Virar à esquerda");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
      },
    };

    Blockly.JavaScript["turn-left"] = function (block) {
      // TODO: Assemble JavaScript into code variable.
      var code = "await turnLeft()\n";
      return code;
    };
  }

  function getCode(block) {
    debugger;
    let code = "";
    let nextBlock;

    if (block) {
      nextBlock = block.nextConnection.targetBlock();
      code += Blockly.JavaScript[block.type]();
    }

    if (nextBlock) {
      code += getCode(nextBlock);
    }

    return code;
  }

  function runBlockyCode() {
    if (isRunning) return;

    setIsRunning(true);
    game.play(javascriptCode);
  }

  function restartGame() {
    game.reset();
    setIsRunning(false);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIsRunning(false);

    game.reset();
  }

  function openSuccessModal(text) {
    const title = "Parabéns!";

    setTextModal({ title, text });
    setIsModalOpen(true);
  }

  function openFailModal(text) {
    const title = "Que pena!";

    setTextModal({ title, text });
    setIsModalOpen(true);
  }

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            id="first-game"
            style={{ width: "500px", height: "500px" }}
          ></div>

          {!isRunning ? (
            <button onClick={runBlockyCode}>Run</button>
          ) : (
            <button onClick={restartGame}> Rerun</button>
          )}

          <Slider
            handleStyle={[{ border: "solid 2px #7A00C4" }]}
            trackStyle={[{ backgroundColor: "#7A00C4" }]}
            activeDotStyle={{ border: "2px solid #7A00C4" }}
            min={0}
            defaultValue={50}
            marks={{
              0: "Lento",
              50: "Regular",
              100: "Rápido",
            }}
            step={null}
            onChange={changeSpeed}
          />
        </div>

        <div>
          <div>Tela de botoes</div>
          <BlocklyWorkspace
            className={styles.container} // you can use whatever classes are appropriate for your app's CSS
            toolboxConfiguration={toolboxCategories} // this must be a JSON toolbox definition
            workspaceConfiguration={config}
            initialXml={xml}
            onXmlChange={setXml}
            onWorkspaceChange={workspaceDidChange}
          />
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClick={closeModal}
          title={textModal.title}
          text={textModal.text}
        />
      )}
    </div>
  );
}

export default App;
