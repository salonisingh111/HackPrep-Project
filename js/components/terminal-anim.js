const SCRIPT_SEQUENCE = [
  { type: "command", text: "$ hackprep init --domain healthcare" },
  { type: "output", text: "Analyzing 1,240 winning hackathon repositories..." },
  { type: "output", text: "[OK] Architecture: WebRTC + FastAPI + Redis" },
  { type: "output", text: "[OK] Recommended stack: Python 3.12, Postgres, Next.js" },
  { type: "output", text: "[OK] Generated 36h milestone timeline." },
  { type: "command", text: "$ hackprep blueprint --ready" },
  { type: "output", text: "Blueprint compiled: MediConnect ready for submission." }
];

export function initTerminalAnimation(terminalBodyId) {
  const container = document.getElementById(terminalBodyId);
  if (!container) return;

  let currentStep = 0;
  let isPaused = false;

  container.addEventListener("mouseenter", () => { isPaused = true; });
  container.addEventListener("mouseleave", () => { isPaused = false; });

  function renderStep() {
    if (isPaused) return;

    if (currentStep === 0) {
      container.innerHTML = "";
    }

    const item = SCRIPT_SEQUENCE[currentStep];
    const lineEl = document.createElement("div");
    lineEl.className = `terminal-line ${item.type}`;
    lineEl.textContent = item.text;
    container.appendChild(lineEl);

    currentStep = (currentStep + 1) % SCRIPT_SEQUENCE.length;
  }

  renderStep();
  const timer = setInterval(renderStep, 1400);

  return () => clearInterval(timer);
}
