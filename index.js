import Automaton from "./classes/Automaton.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const automaton = new Automaton({
  width: canvas.width,
  height: canvas.height,
  tileSize: 4,
});

automaton.randomise(0.1);

/* Main Loop (tick, render and loop management) */
function tickUpdate(dt) {
  automaton.update();
}

function tickRender(t) {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  automaton.draw(ctx);
}

MainLoop.setSimulationTimestep(1000 / 30);
MainLoop.setUpdate(tickUpdate).setDraw(tickRender).start();

document.addEventListener("visibilitychange", () => {
  document.hidden ? MainLoop.stop() : MainLoop.start();
});