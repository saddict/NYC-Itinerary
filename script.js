const dayFilter = document.getElementById("dayFilter");
const budgetLevel = document.getElementById("budgetLevel");
const budgetOutput = document.getElementById("budgetOutput");
const tripNotes = document.getElementById("tripNotes");
const dayCards = document.querySelectorAll(".day-panel");

const itineraryData = {
  budget: {
    cost: 120,
    days: {
      1: ["Breakfast cart + Bryant Park.", "Central Park long walk + deli lunch.", "TKTS/off-Broadway + dessert walk."],
      2: ["Staten Island Ferry skyline run.", "FiDi + 9/11 area + lunch specials.", "Brooklyn Bridge + pizza slice date night."],
      3: ["Pick one museum with timed value slot.", "Village + SoHo self-guided walk.", "High Line sunset + bakery stop."]
    }
  },
  standard: {
    cost: 220,
    days: {
      1: ["Cafe breakfast + library + 5th Ave.", "Central Park loop + seated lunch.", "Broadway night + Hell's Kitchen dessert."],
      2: ["Battery Park + Liberty option.", "Memorial + Wall Street + Seaport lunch.", "DUMBO dinner + skyline walk."],
      3: ["Museum morning with booked entry.", "Village lunch + SoHo.", "High Line + one paid skyline deck."]
    }
  },
  premium: {
    cost: 380,
    days: {
      1: ["Brunch start + private park pedicab option.", "Central Park + curated shopping block.", "Prime Broadway seats + cocktail lounge."],
      2: ["Early ferry + upgraded harbor cruise.", "Private guide style FiDi route + Seaport dining.", "DUMBO dinner reservation + East River ferry."],
      3: ["Museum VIP/tour slot.", "Village tasting route + SoHo shopping.", "Observation deck at sunset + chef dinner."]
    }
  }
};

function renderItinerary() {
  const selectedBudget = budgetLevel.value;
  const budget = itineraryData[selectedBudget];
  Object.entries(budget.days).forEach(([day, items]) => {
    const list = document.getElementById(`day${day}List`);
    list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  });
  budgetOutput.textContent = `Estimated total: $${budget.cost * 3} ($${budget.cost}/day).`;
  localStorage.setItem("nyc_budget_level", selectedBudget);
}

function applyDayFilter() {
  const selected = dayFilter.value;
  dayCards.forEach((card) => {
    const day = card.getAttribute("data-day");
    const show = selected === "all" || selected === day;
    card.classList.toggle("hidden", !show);
  });
}

function loadNotes() {
  const saved = localStorage.getItem("nyc_trip_notes");
  if (saved) tripNotes.value = saved;
}

function saveNotes() {
  localStorage.setItem("nyc_trip_notes", tripNotes.value);
}

function loadSavedBudget() {
  const saved = localStorage.getItem("nyc_budget_level");
  if (saved && itineraryData[saved]) budgetLevel.value = saved;
}

dayFilter.addEventListener("change", applyDayFilter);
budgetLevel.addEventListener("change", renderItinerary);
tripNotes.addEventListener("input", saveNotes);

loadSavedBudget();
renderItinerary();
applyDayFilter();
loadNotes();
