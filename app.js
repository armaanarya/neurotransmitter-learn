// Learn mode: each question needs 2 correct answers to be mastered.
// Level 0 = new/missed, 1 = got it once, 2 = mastered. A miss drops it back to 0.
// Items marked typed: true are asked as a typed answer at level 1.
const KEY = "nt-learn-v1";
let levels = load();
let lastIdx = -1;
let current = null;

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(levels)); } catch {}
}
const lvl = (i) => levels[QUESTIONS[i].q] || 0;
const shuffle = (arr) => arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, "");
const $ = (id) => document.getElementById(id);

function kindLabel(item) {
  if (item.a === "Oversupply" || item.a === "Undersupply") return "Oversupply or undersupply?";
  if (/supply|→|deteriorate/i.test(item.q + item.a)) return "Malfunction";
  return "Function";
}

function next() {
  const open = QUESTIONS.map((_, i) => i).filter((i) => lvl(i) < 2);
  const done = QUESTIONS.length - open.length;
  $("fill").style.width = (done / QUESTIONS.length) * 100 + "%";
  $("count").textContent = `${done} / ${QUESTIONS.length} mastered`;

  if (open.length === 0) {
    $("card").innerHTML = `<p class="prompt">All ${QUESTIONS.length} mastered.</p>
      <button id="again">Study again</button>`;
    $("again").onclick = resetAll;
    return;
  }

  // Prefer items you've started (level 1) and avoid showing the same one twice in a row.
  let pool = open.filter((i) => i !== lastIdx);
  if (pool.length === 0) pool = open;
  const started = pool.filter((i) => lvl(i) === 1);
  if (started.length && Math.random() < 0.5) pool = started;
  const idx = pool[Math.floor(Math.random() * pool.length)];
  lastIdx = idx;
  const item = QUESTIONS[idx];
  current = { idx, item, answered: false };

  const typed = item.typed && lvl(idx) === 1;
  let html = `<div class="kind">${kindLabel(item)}${typed ? " · type it" : ""}</div>
    <div class="prompt">${item.q}</div>`;

  if (typed) {
    html += `<input id="typed" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type the neurotransmitter">
      <div class="row"><button id="submit">Check</button><button id="idk">Don't know</button></div>`;
  } else {
    shuffle([item.a, ...item.wrong]).forEach((opt) => {
      html += `<button class="opt" data-v="${opt.replace(/"/g, "&quot;")}">${opt}</button>`;
    });
    html += `<div class="row"><button id="idk">Don't know</button></div>`;
  }
  html += `<div id="after"></div>`;
  $("card").innerHTML = html;

  if (typed) {
    const input = $("typed");
    input.focus();
    $("submit").onclick = () => checkTyped(input.value);
    input.onkeydown = (e) => { if (e.key === "Enter") { e.stopPropagation(); checkTyped(input.value); } };
  } else {
    document.querySelectorAll(".opt").forEach((b) => (b.onclick = () => pick(b)));
  }
  $("idk").onclick = () => finish(false, null);
}

function checkTyped(val) {
  if (current.answered || !val.trim()) return;
  const item = current.item;
  const ok = [item.a, ...(ALIASES[item.a] || [])].some((x) => norm(x) === norm(val));
  finish(ok, val);
}

function pick(btn) {
  if (current.answered) return;
  finish(btn.dataset.v === current.item.a, btn);
}

function finish(ok, picked) {
  if (current.answered) return;
  current.answered = true;
  const { idx, item } = current;
  levels[item.q] = ok ? lvl(idx) + 1 : 0;
  save();

  document.querySelectorAll(".opt").forEach((b) => {
    b.disabled = true;
    if (b.dataset.v === item.a) b.classList.add("right");
  });
  if (picked instanceof HTMLElement && !ok) picked.classList.add("wrongpick");
  if ($("typed")) $("typed").disabled = true;
  $("idk").remove();
  if ($("submit")) $("submit").remove();

  $("after").innerHTML = `<div class="fb ${ok ? "good" : "bad"}">
      <strong>${ok ? "Correct." : "Answer: " + item.a}</strong><br>${item.why}
    </div>
    <button id="cont" class="on">Continue (Enter)</button>`;
  $("cont").onclick = next;
  $("cont").focus();
}

function resetAll() {
  levels = {};
  save();
  next();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && current && current.answered && !$("learn").hidden) { e.preventDefault(); next(); }
  // 1-4 picks multiple choice options
  if (/^[1-4]$/.test(e.key) && current && !current.answered && !$("typed")) {
    const b = document.querySelectorAll(".opt")[+e.key - 1];
    if (b) pick(b);
  }
});

function show(tab) {
  $("learn").hidden = tab !== "learn";
  $("table").hidden = tab !== "table";
  $("tab-learn").classList.toggle("on", tab === "learn");
  $("tab-table").classList.toggle("on", tab === "table");
}
$("tab-learn").onclick = () => show("learn");
$("tab-table").onclick = () => show("table");
$("reset").onclick = () => { if (confirm("Reset all progress?")) { resetAll(); show("learn"); } };

$("table").innerHTML = `<table><tr><th>Neurotransmitter</th><th>Function</th><th>Malfunction</th></tr>
  ${TABLE.map((r) => `<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>`;

next();
