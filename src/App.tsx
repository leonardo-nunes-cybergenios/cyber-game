import { useEffect, useState } from "react";
import "./App.css";
import Phasergame from "./PhaserGame";
import createGame from "./firstGame";

import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";

// Phasergame

function App() {
  const [xml, setXml] = useState(null);
  const [workspaceConfiguration, setWorkspaceConfiguration] = useState(null);
  const [gameCreated, setGameCreated] = useState(false);
  const [toolboxCategories, setToolboxCategories] = useState({
    kind: "flyoutToolbox",
    contents: [],
  });

  useEffect(() => {
    if (gameCreated) return;

    createGame()
    setGameCreated(true);

    console.log(createGame)

    return ()=> {
      // Cancelar carregamento ao finalizar, react 18 behavior
    }
  }, []);

  async function teste (){
    const video = 'ola'
    console.log(video)
  }

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div id="first-game" style={{ width: "500px", height: "500px" }}></div>
        <div>
          <div>Tela de botoes</div>
          <button onClick={teste}>aqui</button>
          {/* <BlocklyWorkspace
            className="width-100" // you can use whatever classes are appropriate for your app's CSS
            toolboxConfiguration={toolboxCategories} // this must be a JSON toolbox definition
            workspaceConfiguration={workspaceConfiguration}
            initialXml={xml}
            onXmlChange={setXml}
            onWorkspaceChange={workspaceDidChange}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
