
const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// HERO SEARCH
document.getElementById("heroSearch").addEventListener("submit", event => {
  event.preventDefault();

  const query = document.getElementById("searchInput").value
    .trim()
    .toLowerCase();

  if (!query) {
    document.getElementById("searchInput").focus();
    return;
  }

  let target = "inspiration";

  if (/contractor|builder|worker|professional/.test(query)) {
    target = "contractors";
  } else if (/cost|price|budget|estimate|money/.test(query)) {
    target = "estimator";
  } else if (/material|tile|paint|floor/.test(query)) {
    target = "materials";
  } else if (/advisor|help|plan/.test(query)) {
    target = "advisor";
  } else if (/kitchen|bathroom|living|bedroom|home/.test(query)) {
    target = "inspiration";
  }

  document.getElementById(target).scrollIntoView({
    behavior: "smooth"
  });
});

// RENOVATION COST ESTIMATOR
const estimateForm = document.getElementById("estimateForm");

function calculateEstimate() {
  const area = Number(document.getElementById("area").value);
  const rate = Number(document.getElementById("finish").value);
  const project = document.getElementById("projectType").value;

  if (!Number.isFinite(area) || area < 50 || area > 10000) {
    alert("Please enter an area between 50 and 10,000 square feet.");
    return;
  }

  const multipliers = {
    full: 1,
    kitchen: 1.25,
    bathroom: 1.4,
    living: 0.8
  };

  const projectNames = {
    full: "full home renovation",
    kitchen: "kitchen renovation",
    bathroom: "bathroom renovation",
    living: "living room renovation"
  };

  const total = area * rate * multipliers[project];

  document.getElementById("estimateAmount").textContent =
    money.format(total);

  document.getElementById("estimateDetails").textContent =
    `${area.toLocaleString("en-IN")} sq. ft. · ${projectNames[project]} · ` +
    `${money.format(rate)} base rate per sq. ft.`;

  document.querySelector(".estimate-result").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

estimateForm.addEventListener("submit", event => {
  event.preventDefault();
  calculateEstimate();
});

// Update the initial estimate whenever the user changes an input.
["projectType", "area", "finish"].forEach(id => {
  document.getElementById(id).addEventListener("change", calculateEstimate);
});

// SMART ADVISOR DEMO
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(message, sender) {
  const bubble = document.createElement("div");

  bubble.className = "chat-bubble " +
    (sender === "user" ? "user-message" : "bot-message");

  // textContent prevents user input from being interpreted as HTML.
  bubble.textContent = message;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAdvisorReply(message) {
  const text = message.toLowerCase();

  if (/kitchen/.test(text)) {
    return "For a kitchen renovation, start by measuring the space and " +
      "listing cabinets, countertop, plumbing, electrical work and finishes. " +
      "Keep a contingency fund of around 10–15%. Compare itemised quotes " +
      "before choosing a contractor.";
  }

  if (/bathroom/.test(text)) {
    return "For a bathroom project, inspect waterproofing, plumbing, " +
      "ventilation, tiles and fixtures. Prioritise waterproofing and " +
      "reliable workmanship before spending on decorative finishes.";
  }

  if (/budget|cost|price|money|₹|rupee/.test(text)) {
    return "Begin with your maximum budget and separate labour, materials, " +
      "fixtures and finishing costs. Keep 10–15% aside for unexpected " +
      "expenses. Use Renova's estimator for an initial, indicative figure.";
  }

  if (/contractor|builder|worker/.test(text)) {
    return "When comparing contractors, check completed projects, references, " +
      "scope of work, timelines, payment milestones and written quotations. " +
      "Verify credentials and never rely on ratings alone.";
  }

  if (/material|tile|paint|floor/.test(text)) {
    return "Choose materials based on durability, maintenance, climate and " +
      "budget. Compare product specifications and installation costs, " +
      "not just the displayed price.";
  }

  if (/full home|whole home|entire home/.test(text)) {
    return "For a full home renovation, list the rooms and work required, " +
      "set a budget, identify structural or plumbing issues and plan the " +
      "work sequence. Confirm permissions where applicable before starting.";
  }

  return "Let's break your renovation into manageable steps: identify the " +
    "space, list your must-haves, set a budget and timeline, and compare " +
    "qualified contractors. Tell me which room you're renovating and your " +
    "approximate budget for more focused planning.";
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";

  // A local demo response; connect an AI API for real AI functionality.
  addMessage(getAdvisorReply(message), "bot");
});

document.querySelectorAll(".quick-prompts button").forEach(button => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.prompt;
    addMessage(prompt, "user");
    addMessage(getAdvisorReply(prompt), "bot");
  });
});

// LOGIN DEMO
document.getElementById("loginForm").addEventListener("submit", event => {
  event.preventDefault();

  const message = document.getElementById("loginMessage");

  message.textContent =
    "UI demo only: authentication is not configured yet. " +
    "Connect a secure backend to enable real login.";
});

// SET INITIAL ESTIMATE
calculateEstimate();
