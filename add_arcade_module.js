// add_arcade_module.js - Injects the complete Arcade & Game Studio into generate_app.js
const fs = require('fs');
const path = require('path');

let code = fs.readFileSync(path.join(__dirname, 'generate_app.js'), 'utf8');

// 1. Add to sidebar navigation
const sidebarAnchor = `<div class="nav-item" data-tool="surprise" onclick="navigateTo('surprise')">
        <span class="icon">🎁</span> <span>Random Surprise</span> <span class="fav-star" onclick="toggleFav(event, 'surprise')">★</span>
      </div>`;

const sidebarAdd = `<div class="nav-item" data-tool="surprise" onclick="navigateTo('surprise')">
        <span class="icon">🎁</span> <span>Random Surprise</span> <span class="fav-star" onclick="toggleFav(event, 'surprise')">★</span>
      </div>
      <div class="nav-item" data-tool="arcade" onclick="navigateTo('arcade')">
        <span class="icon">🎮</span> <span>Arcade & Game Studio</span> <span class="fav-star" onclick="toggleFav(event, 'arcade')">★</span>
      </div>`;

code = code.replace(sidebarAnchor, sidebarAdd);

// 2. Add to MODULES array
const modulesAnchor = `  {
    id: 'surprise',
    title: 'Random Surprise',
    icon: '🎁',
    tag: 'Creative',
    desc: 'Instant entertaining jokes, fun science facts, riddles, fortune cookies, and compliments.'
  }`;

const modulesAdd = `  {
    id: 'surprise',
    title: 'Random Surprise',
    icon: '🎁',
    tag: 'Creative',
    desc: 'Instant entertaining jokes, fun science facts, riddles, fortune cookies, and compliments.'
  },
  {
    id: 'arcade',
    title: 'Arcade & Game Studio',
    icon: '🎮',
    tag: 'Games',
    desc: 'Printable waiting-time paper games: Sudoku, Random Maze Labyrinth, Tic-Tac-Toe Tournament, Dots & Boxes, and Word Search.'
  }`;

code = code.replace(modulesAnchor, modulesAdd);

// 3. Add to switch in renderCurrentTool
const switchAnchor = `case 'surprise': renderSurpriseModule(); break;`;
const switchAdd = `case 'surprise': renderSurpriseModule(); break;\n    case 'arcade': renderArcadeModule(); break;`;
code = code.replace(switchAnchor, switchAdd);

// 4. Implement Arcade rendering & helper logic
const arcadeRenderImplementation = `
/* =========================================================================
   15. MODULE 15: ARCADE & GAME STUDIO
   ========================================================================= */

// Sudoku Seeds and randomized permutation engine
const SUDOKU_BASE_EASY = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

const SUDOKU_SOL_EASY = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

let currentSudokuSeed = 0;
let currentMazeSeed = 0;
let currentWordSearchSeed = 0;

function renderArcadeModule() {
  const game = document.getElementById('arcadeGameType')?.value || 'sudoku';
  if (game === 'sudoku') renderSudokuGame();
  else if (game === 'maze') renderMazeGame();
  else if (game === 'tictactoe') renderTicTacToeGame();
  else if (game === 'dots') renderDotsGame();
  else if (game === 'wordsearch') renderWordSearchGame();
}

/* --- GAME 1: SUDOKU GENERATOR --- */
function renderSudokuGame() {
  const { w, ctx, margin, maxW } = PrintEngine.begin();
  const mode = document.getElementById('sudokuMode')?.value || '9x9';
  const showSol = document.getElementById('sudokuShowSol')?.checked || false;

  let y = 14;
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🧩 SUDOKU PUZZLE 🧩', w / 2, y);
  y += 22;

  ctx.font = '600 11px monospace';
  ctx.fillText('DIFFICULTY: ' + (mode === '4x4' ? 'KIDS MINI (4x4)' : 'CLASSIC 9x9'), w / 2, y);
  y += 16;
  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  y += 16;

  if (mode === '4x4') {
    // 4x4 Mini Sudoku
    const sz = 4;
    const cellSize = Math.floor((maxW - 40) / sz);
    const startX = Math.round((w - sz * cellSize) / 2);
    const miniPuzzle = [
      [1, 0, 0, 4],
      [0, 2, 3, 0],
      [0, 3, 1, 0],
      [4, 0, 0, 2]
    ];

    for (let r = 0; r < sz; r++) {
      for (let c = 0; c < sz; c++) {
        const cX = startX + c * cellSize;
        const cY = y + r * cellSize;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = (r % 2 === 0 && r > 0 ? 3 : 1);
        ctx.strokeRect(cX, cY, cellSize, cellSize);

        const val = miniPuzzle[r][c];
        if (val > 0) {
          ctx.font = '800 22px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(String(val), cX + cellSize / 2, cY + 12);
        }
      }
    }
    // Outer border
    ctx.lineWidth = 3;
    ctx.strokeRect(startX, y, sz * cellSize, sz * cellSize);
    y += sz * cellSize + 20;

  } else {
    // 9x9 Standard Sudoku
    const sz = 9;
    const cellSize = Math.floor((maxW - 10) / sz); // ~36px
    const startX = Math.round((w - sz * cellSize) / 2);

    // Permute numbers based on seed for variety
    const perm = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (currentSudokuSeed > 0) {
      // Rotate digits
      const s = currentSudokuSeed % 8 + 1;
      for (let i = 1; i <= 9; i++) perm[i] = ((i + s - 1) % 9) + 1;
    }

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cX = startX + c * cellSize;
        const cY = y + r * cellSize;

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(cX, cY, cellSize, cellSize);

        const baseVal = SUDOKU_BASE_EASY[r][c];
        const val = baseVal > 0 ? perm[baseVal] : 0;
        if (val > 0) {
          ctx.font = '800 17px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(String(val), cX + cellSize / 2, cY + 8);
        }
      }
    }

    // Thick 3x3 block borders
    ctx.lineWidth = 3;
    for (let i = 0; i <= 3; i++) {
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(startX, y + i * 3 * cellSize);
      ctx.lineTo(startX + 9 * cellSize, y + i * 3 * cellSize);
      ctx.stroke();

      // Vertical
      ctx.beginPath();
      ctx.moveTo(startX + i * 3 * cellSize, y);
      ctx.lineTo(startX + i * 3 * cellSize, y + 9 * cellSize);
      ctx.stroke();
    }

    y += 9 * cellSize + 20;
  }

  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Rules: Fill every row, column and box with 1 to ' + (mode === '4x4' ? '4' : '9') + '.', w / 2, y);
  y += 18;

  if (showSol && mode === '9x9') {
    PrintEngine.drawDashedLine(ctx, y, margin, w - margin, [4, 4]);
    y += 14;
    ctx.font = '700 10px monospace';
    ctx.fillText('✂ TEAR-OFF ANSWER KEY (SUDOKU SOLUTION) ✂', w / 2, y);
    y += 16;

    // Mini solution grid
    const solCell = 14;
    const solX = Math.round((w - 9 * solCell) / 2);
    ctx.font = '600 9px monospace';
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = SUDOKU_SOL_EASY[r][c];
        ctx.fillText(String(val), solX + c * solCell + solCell / 2, y + r * solCell);
      }
    }
    y += 9 * solCell + 12;
  }

  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  PrintEngine.finish(y + 14);
}

/* --- GAME 2: RANDOM MAZE GENERATOR (Labyrinth) --- */
function renderMazeGame() {
  const { w, ctx, margin, maxW } = PrintEngine.begin();
  const cols = 15;
  const rows = 17;
  const cellSize = Math.floor(maxW / cols); // ~23px
  const startX = Math.round((w - cols * cellSize) / 2);

  let y = 14;
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌀 MAZE RUNNER 🌀', w / 2, y);
  y += 22;

  ctx.font = '700 12px monospace';
  ctx.fillText('FIND YOUR WAY TO THE GOAL!', w / 2, y);
  y += 16;
  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  y += 18;

  // Generate Maze using Depth-First Search with seed
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = { visited: false, top: true, right: true, bottom: true, left: true };
    }
  }

  // Pseudo-random based on currentMazeSeed
  let seedVal = currentMazeSeed * 9301 + 49297;
  function rnd() {
    seedVal = (seedVal * 9301 + 49297) % 233280;
    return seedVal / 233280;
  }

  const stack = [];
  let current = { r: 0, c: 0 };
  grid[0][0].visited = true;

  while (true) {
    const neighbors = [];
    const { r, c } = current;
    if (r > 0 && !grid[r - 1][c].visited) neighbors.push({ r: r - 1, c, dir: 'top', opp: 'bottom' });
    if (r < rows - 1 && !grid[r + 1][c].visited) neighbors.push({ r: r + 1, c, dir: 'bottom', opp: 'top' });
    if (c > 0 && !grid[r][c - 1].visited) neighbors.push({ r, c: c - 1, dir: 'left', opp: 'right' });
    if (c < cols - 1 && !grid[r][c + 1].visited) neighbors.push({ r, c: c + 1, dir: 'right', opp: 'left' });

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(rnd() * neighbors.length)];
      grid[r][c][next.dir] = false;
      grid[next.r][next.c][next.opp] = false;
      grid[next.r][next.c].visited = true;
      stack.push(current);
      current = { r: next.r, c: next.c };
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      break;
    }
  }

  // Open start and exit
  grid[0][0].top = false;
  grid[rows - 1][cols - 1].bottom = false;

  // Draw maze walls
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;

  // Entrance indicator
  ctx.font = '800 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('▼ START', startX + cellSize / 2, y - 6);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x1 = startX + c * cellSize;
      const y1 = y + r * cellSize;
      const x2 = x1 + cellSize;
      const y2 = y1 + cellSize;
      const cell = grid[r][c];

      if (cell.top) {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y1); ctx.stroke();
      }
      if (cell.right) {
        ctx.beginPath(); ctx.moveTo(x2, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      if (cell.bottom) {
        ctx.beginPath(); ctx.moveTo(x1, y2); ctx.lineTo(x2, y2); ctx.stroke();
      }
      if (cell.left) {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1, y2); ctx.stroke();
      }
    }
  }

  y += rows * cellSize + 10;
  // Exit indicator
  ctx.fillText('▲ GOAL 🏆', startX + (cols - 1) * cellSize + cellSize / 2, y + 6);
  y += 24;

  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  PrintEngine.finish(y + 12);
}

/* --- GAME 3: TIC-TAC-TOE TOURNAMENT --- */
function renderTicTacToeGame() {
  const { w, ctx, margin, maxW } = PrintEngine.begin();
  const p1 = document.getElementById('tttPlayer1')?.value || 'Player 1';
  const p2 = document.getElementById('tttPlayer2')?.value || 'Player 2';
  const rounds = parseInt(document.getElementById('tttRounds')?.value || '6', 10);

  let y = 14;
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚔️ TIC-TAC-TOE SHOWDOWN ⚔️', w / 2, y);
  y += 22;

  // Player scoreboard
  ctx.strokeRect(margin, y, maxW, 36);
  ctx.font = '700 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('X: ' + p1, margin + 12, y + 12);
  ctx.textAlign = 'right';
  ctx.fillText('O: ' + p2, w - margin - 12, y + 12);
  y += 46;

  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  y += 16;

  // Print grids in pairs (2 columns)
  const gridW = 120;
  const colSpacing = maxW - gridW * 2;
  const leftX = margin + Math.floor(colSpacing / 3);
  const rightX = leftX + gridW + Math.floor(colSpacing / 3);

  for (let r = 0; r < rounds; r += 2) {
    const round1 = r + 1;
    const round2 = r + 2 <= rounds ? r + 2 : null;

    // Draw round 1 grid
    ctx.font = '800 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ROUND #' + round1, leftX + gridW / 2, y);
    drawSingleTicTacToe(ctx, leftX, y + 14, gridW);

    if (round2) {
      ctx.fillText('ROUND #' + round2, rightX + gridW / 2, y);
      drawSingleTicTacToe(ctx, rightX, y + 14, gridW);
    }

    y += gridW + 36;
    if (r + 2 < rounds) {
      PrintEngine.drawDashedLine(ctx, y - 8, margin, w - margin, [2, 2]);
    }
  }

  // Champion Box
  ctx.strokeRect(margin + 20, y, maxW - 40, 32);
  ctx.font = '800 13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('👑 TOURNAMENT CHAMPION: ____________', w / 2, y + 10);
  y += 46;

  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  PrintEngine.finish(y + 12);
}

function drawSingleTicTacToe(ctx, x, y, size) {
  const step = size / 3;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';

  // Vertical lines
  ctx.beginPath();
  ctx.moveTo(x + step, y); ctx.lineTo(x + step, y + size);
  ctx.moveTo(x + step * 2, y); ctx.lineTo(x + step * 2, y + size);
  ctx.stroke();

  // Horizontal lines
  ctx.beginPath();
  ctx.moveTo(x, y + step); ctx.lineTo(x + size, y + step);
  ctx.moveTo(x, y + step * 2); ctx.lineTo(x + size, y + step * 2);
  ctx.stroke();
}

/* --- GAME 4: DOTS & BOXES CHALLENGE --- */
function renderDotsGame() {
  const { w, ctx, margin, maxW } = PrintEngine.begin();
  const sz = parseInt(document.getElementById('dotsGridSize')?.value || '5', 10); // 4x4 or 5x5 or 6x6
  const p1 = document.getElementById('dotsP1')?.value || 'P1';
  const p2 = document.getElementById('dotsP2')?.value || 'P2';

  let y = 14;
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎯 DOTS & BOXES 🎯', w / 2, y);
  y += 22;

  ctx.font = '600 11px monospace';
  ctx.fillText('CONNECT DOTS • CLAIM BOXES', w / 2, y);
  y += 16;
  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  y += 16;

  // Draw Dots Grid
  const dotSpacing = Math.floor((maxW - 30) / (sz - 1));
  const startX = Math.round((w - (sz - 1) * dotSpacing) / 2);

  for (let r = 0; r < sz; r++) {
    for (let c = 0; c < sz; c++) {
      const dX = startX + c * dotSpacing;
      const dY = y + r * dotSpacing;
      ctx.beginPath();
      ctx.arc(dX, dY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
    }
  }

  y += (sz - 1) * dotSpacing + 24;

  // Score Box
  ctx.strokeRect(margin, y, maxW, 40);
  ctx.font = '700 12px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(p1 + ' Boxes: [    ]', margin + 14, y + 14);
  ctx.textAlign = 'right';
  ctx.fillText(p2 + ' Boxes: [    ]', w - margin - 14, y + 14);
  y += 50;

  ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Take turns drawing 1 line. Close a box to write your initial!', w / 2, y);
  y += 16;

  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  PrintEngine.finish(y + 12);
}

/* --- GAME 5: WORD SEARCH PUZZLE --- */
function renderWordSearchGame() {
  const { w, ctx, margin, maxW } = PrintEngine.begin();
  const theme = document.getElementById('wsTheme')?.value || 'food';
  const customWordsRaw = document.getElementById('wsCustomWords')?.value || '';

  let wordList = ['VADAPAV', 'SAMOSA', 'CHAI', 'MISAL', 'POHA', 'DOSA'];
  if (theme === 'cities') {
    wordList = ['MUMBAI', 'PUNE', 'DELHI', 'NAGPUR', 'GOA', 'SURAT'];
  } else if (theme === 'custom' && customWordsRaw.trim()) {
    wordList = customWordsRaw.split(',').map(s => s.trim().toUpperCase().replace(/[^A-Z]/g, '')).filter(Boolean);
  }

  let y = 14;
  ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🔍 WORD SEARCH 🔍', w / 2, y);
  y += 22;

  ctx.font = '700 12px monospace';
  ctx.fillText('THEME: ' + (theme === 'food' ? 'MAHARASHTRA FAST FOOD' : theme === 'cities' ? 'INDIAN CITIES' : 'CUSTOM WORDS'), w / 2, y);
  y += 16;
  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  y += 16;

  // 10x10 Word Search Grid
  const sz = 10;
  const cellSize = Math.floor((maxW - 10) / sz); // ~34px
  const startX = Math.round((w - sz * cellSize) / 2);

  const grid = Array(sz).fill(null).map(() => Array(sz).fill(''));

  // Place words horizontally or vertically
  let seed = currentWordSearchSeed * 1337 + 7919;
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (const word of wordList.slice(0, 6)) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 80) {
      attempts++;
      const dir = rnd() > 0.5 ? 'H' : 'V';
      if (dir === 'H') {
        const r = Math.floor(rnd() * sz);
        const c = Math.floor(rnd() * (sz - word.length + 1));
        let ok = true;
        for (let i = 0; i < word.length; i++) {
          if (grid[r][c + i] && grid[r][c + i] !== word[i]) { ok = false; break; }
        }
        if (ok) {
          for (let i = 0; i < word.length; i++) grid[r][c + i] = word[i];
          placed = true;
        }
      } else {
        const r = Math.floor(rnd() * (sz - word.length + 1));
        const c = Math.floor(rnd() * sz);
        let ok = true;
        for (let i = 0; i < word.length; i++) {
          if (grid[r + i][c] && grid[r + i][c] !== word[i]) { ok = false; break; }
        }
        if (ok) {
          for (let i = 0; i < word.length; i++) grid[r + i][c] = word[i];
          placed = true;
        }
      }
    }
  }

  // Fill remaining empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < sz; r++) {
    for (let c = 0; c < sz; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(rnd() * letters.length)];
      }
    }
  }

  // Draw Letter Grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#cbd5e1';
  ctx.font = '700 16px monospace';
  ctx.textAlign = 'center';

  for (let r = 0; r < sz; r++) {
    for (let c = 0; c < sz; c++) {
      const cX = startX + c * cellSize;
      const cY = y + r * cellSize;
      ctx.strokeRect(cX, cY, cellSize, cellSize);
      ctx.fillStyle = '#000000';
      ctx.fillText(grid[r][c], cX + cellSize / 2, cY + 9);
    }
  }

  // Outer thick border
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(startX, y, sz * cellSize, sz * cellSize);

  y += sz * cellSize + 16;

  // Word Bank with [ ] Checkboxes
  ctx.font = '800 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('WORDS TO FIND:', w / 2, y);
  y += 18;

  ctx.font = '700 12px monospace';
  // Print in 2 columns
  for (let i = 0; i < wordList.length; i += 2) {
    const w1 = '[ ] ' + wordList[i];
    const w2 = wordList[i + 1] ? '[ ] ' + wordList[i + 1] : '';
    ctx.textAlign = 'left';
    ctx.fillText(w1, margin + 20, y);
    if (w2) {
      ctx.fillText(w2, w / 2 + 10, y);
    }
    y += 16;
  }

  y += 8;
  PrintEngine.drawDashedLine(ctx, y, margin, w - margin);
  PrintEngine.finish(y + 12);
}
`;

// Insert arcade rendering logic before ExportManager
const exportAnchor = `/* =========================================================================\n   6. EXPORT MANAGER (PRINT, PNG, ESC/POS)\n   ========================================================================= */`;
code = code.replace(exportAnchor, arcadeRenderImplementation + '\n' + exportAnchor);

// 5. Add Module Editor form for 'arcade'
const arcadeEditorForm = `  } else if (id === 'arcade') {
    html += \`
      <div class="editor-card">
        <div class="form-group">
          <label class="form-label">Choose Paper Game</label>
          <select class="form-control" id="arcadeGameType" onchange="handleArcadeGameChange()">
            <option value="sudoku" selected>🧩 Sudoku (Classic 9x9 / Kids 4x4)</option>
            <option value="maze">🌀 Maze Runner (Random Labyrinth)</option>
            <option value="tictactoe">⚔️ Tic-Tac-Toe Showdown Tournament</option>
            <option value="dots">🎯 Dots & Boxes Challenge</option>
            <option value="wordsearch">🔍 Word Search Puzzle (Food / Cities / Custom)</option>
          </select>
        </div>

        <!-- SUDOKU CONTROLS -->
        <div id="arcadeSubSudoku">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Sudoku Grid Size</label>
              <select class="form-control" id="sudokuMode" onchange="renderArcadeModule()">
                <option value="9x9" selected>Classic 9×9 Puzzle</option>
                <option value="4x4">Kids Mini 4×4 Puzzle</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-check" style="margin-top:24px;">
                <input type="checkbox" id="sudokuShowSol" onchange="renderArcadeModule()"> Include Tear-off Solution
              </label>
            </div>
          </div>
          <button class="btn sm primary" style="width:100%; margin-top:8px;" onclick="currentSudokuSeed++; renderArcadeModule();">🎲 Generate New Sudoku Puzzle</button>
        </div>

        <!-- MAZE CONTROLS -->
        <div id="arcadeSubMaze" style="display:none;">
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
            Generates an algorithmic labyrinth from Entrance to Exit. Perfect for kids or friends to trace with a pen.
          </p>
          <button class="btn sm primary" style="width:100%;" onclick="currentMazeSeed++; renderArcadeModule();">🎲 Generate New Random Maze</button>
        </div>

        <!-- TIC TAC TOE CONTROLS -->
        <div id="arcadeSubTtt" style="display:none;">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Player 1 (X)</label>
              <input type="text" class="form-control" id="tttPlayer1" value="Player 1" oninput="renderArcadeModule()">
            </div>
            <div class="form-group">
              <label class="form-label">Player 2 (O)</label>
              <input type="text" class="form-control" id="tttPlayer2" value="Player 2" oninput="renderArcadeModule()">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Number of Rounds</label>
            <select class="form-control" id="tttRounds" onchange="renderArcadeModule()">
              <option value="4">4 Rounds</option>
              <option value="6" selected>6 Rounds</option>
              <option value="8">8 Rounds</option>
            </select>
          </div>
        </div>

        <!-- DOTS & BOXES CONTROLS -->
        <div id="arcadeSubDots" style="display:none;">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Grid Size</label>
              <select class="form-control" id="dotsGridSize" onchange="renderArcadeModule()">
                <option value="4">4 × 4 Dots</option>
                <option value="5" selected>5 × 5 Dots</option>
                <option value="6">6 × 6 Dots</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Player 1 & 2</label>
              <div style="display:flex; gap:6px;">
                <input type="text" class="form-control" id="dotsP1" value="P1" oninput="renderArcadeModule()">
                <input type="text" class="form-control" id="dotsP2" value="P2" oninput="renderArcadeModule()">
              </div>
            </div>
          </div>
        </div>

        <!-- WORD SEARCH CONTROLS -->
        <div id="arcadeSubWordSearch" style="display:none;">
          <div class="form-group">
            <label class="form-label">Theme</label>
            <select class="form-control" id="wsTheme" onchange="handleWordSearchThemeChange()">
              <option value="food" selected>Food & Snacks (Vadapav, Samosa, Chai...)</option>
              <option value="cities">Indian Cities (Mumbai, Pune, Delhi...)</option>
              <option value="custom">Custom Words (Type your own)</option>
            </select>
          </div>
          <div class="form-group" id="wsCustomGroup" style="display:none;">
            <label class="form-label">Custom Words (Comma separated)</label>
            <input type="text" class="form-control" id="wsCustomWords" value="BURGER, PIZZA, FRIES, SHAKE, TACO" oninput="renderArcadeModule()">
          </div>
          <button class="btn sm primary" style="width:100%; margin-top:8px;" onclick="currentWordSearchSeed++; renderArcadeModule();">🎲 Shuffle Word Search Grid</button>
        </div>
      </div>
    \`;
  `;

const editorAnchor = `  } else if (id === 'surprise') {`;
code = code.replace(editorAnchor, arcadeEditorForm + '\n' + editorAnchor);

// 6. Add sub-control event handlers in Section 11 (Helper Handlers)
const handlerAdd = `
function handleArcadeGameChange() {
  const g = document.getElementById('arcadeGameType').value;
  ['Sudoku', 'Maze', 'Ttt', 'Dots', 'WordSearch'].forEach(k => {
    const el = document.getElementById('arcadeSub' + k);
    if (el) el.style.display = 'none';
  });
  if (g === 'sudoku') document.getElementById('arcadeSubSudoku').style.display = 'block';
  else if (g === 'maze') document.getElementById('arcadeSubMaze').style.display = 'block';
  else if (g === 'tictactoe') document.getElementById('arcadeSubTtt').style.display = 'block';
  else if (g === 'dots') document.getElementById('arcadeSubDots').style.display = 'block';
  else if (g === 'wordsearch') document.getElementById('arcadeSubWordSearch').style.display = 'block';

  renderArcadeModule();
}

function handleWordSearchThemeChange() {
  const theme = document.getElementById('wsTheme').value;
  const customGroup = document.getElementById('wsCustomGroup');
  if (customGroup) customGroup.style.display = (theme === 'custom' ? 'block' : 'none');
  renderArcadeModule();
}
`;

const handlerAnchor = `function handleHotelLogoUpload(e) {`;
code = code.replace(handlerAnchor, handlerAdd + '\n' + handlerAnchor);

fs.writeFileSync(path.join(__dirname, 'generate_app.js'), code, 'utf8');
console.log('Successfully added Arcade & Game Studio to generate_app.js!');
