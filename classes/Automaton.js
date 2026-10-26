import { moduloEuclidian } from "../lib/math.js";

export default class Automaton {
  constructor({
    width = window.innerWidth,
    height = window.innerHeight,
    tileSize = window.innerWidth / 500,
    colorAlive = "hsl(344, 77%, 48%)",
    colorDead = "hsl(344, 42%, 19%)",

    birth = new Set([3, 6]),
    survival = new Set([2, 3]),
  } = {}) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.colorAlive = colorAlive;
    this.colorDead = colorDead;

    this.cols = Math.floor(width / tileSize);
    this.rows = Math.floor(height / tileSize);
    this.cells = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false),
    );

    this.birth = birth;
    this.survival = survival;
  }

  randomise(prob) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.cells[y][x] = Math.random() < prob;
      }
    }
  }

  draw(ctx) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        ctx.fillStyle = this.cells[y][x] ? this.colorAlive : this.colorDead;
        ctx.fillRect(
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize - 1,
          this.tileSize - 1,
        );
      }
    }
  }

  countNeighbours(x, y) {
    let count = 0;
    for (let dy = -1; dy < 2; dy++) {
      for (let dx = -1; dx < 2; dx++) {
        if (dx === 0 && dy === 0) continue;
        const ny = moduloEuclidian(y + dy, this.rows);
        const nx = moduloEuclidian(x + dx, this.cols);
        if (this.cells[ny][nx]) count++;
      }
    }
    return count;
  }

  update() {
    const next = this.cells.map((row, y) =>
      row.map((alive, x) => {
        const nNeigbours = this.countNeighbours(x, y);
        return alive ? this.survival.has(nNeigbours) : this.birth.has(nNeigbours);
      }),
    );
    this.cells = next;
  }
}
