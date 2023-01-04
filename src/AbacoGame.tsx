// vendors
import { useEffect } from "react";

// game
import Game from "./Abaco";

// styles
import "./App.css";

function AbagoGame() {
  useEffect(() => {
    const game = Game(55, 14, "sum", false);
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="game" style={{ width: "500px", height: "500px" }}></div>
        </div>
      </div>
    </div>
  );
}

export default AbagoGame;
