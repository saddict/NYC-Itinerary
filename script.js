const dayFilter = document.getElementById("dayFilter");
const budgetLevel = document.getElementById("budgetLevel");
const budgetOutput = document.getElementById("budgetOutput");
const tripNotes = document.getElementById("tripNotes");
const dayCards = document.querySelectorAll(".day-panel");

const itineraryData = {
  budget: {
    cost: 70,
    days: {
      1: ["I keep breakfast simple near Bryant Park so we can ease into the city.", "I leave most of the afternoon for a long Central Park walk and an easy lunch.", "I end the night with discount theater options and a dessert stop for us."],
      2: ["I start with the ferry or Battery Park for skyline views without overspending.", "I mapped a downtown walk that still leaves room for a relaxed lunch.", "I save golden hour for Brooklyn and keep dinner casual but memorable."],
      3: ["I keep the morning focused on one museum so the day never feels rushed.", "I make the Center for Book Arts the anchor of the afternoon.", "I finish with a sunset walk and one last neighborhood dessert stop."]
    }
  },
  standard: {
    cost: 100,
    days: {
      1: ["I planned a cozy breakfast by Bryant Park before we wander through the library and Midtown landmarks.", "I give us a real Central Park stretch with a seated lunch built in.", "I hold the evening for a Broadway show and a dessert stop nearby."],
      2: ["I start us downtown with harbor views and a slower Financial District morning.", "I keep the afternoon scenic, with the memorial area, Wall Street, and a waterfront lunch.", "I planned dinner and skyline time in Brooklyn when the light is best."],
      3: ["I start with a museum visit that feels intentional instead of overpacked.", "I made the Center for Book Arts a major part of the day, with time to browse, linger, and enjoy Flatiron together.", "I wrap the trip with the High Line at sunset and a final easy dinner."]
    }
  },
  premium: {
    cost: 185,
    days: {
      1: ["I upgrade the morning with a nicer brunch and a more polished Midtown route.", "I leave room for Central Park highlights and a little shopping together.", "I finish with prime theater seats and a proper late-night drink or dessert."],
      2: ["I start with a harbor cruise or premium ferry timing for the best views.", "I keep downtown comfortable with a slower lunch and less transit stress.", "I plan a reservation in DUMBO and a polished skyline finish."],
      3: ["I begin with a premium museum experience or guided visit.", "I still center the day on the Center for Book Arts, then keep the neighborhood wandering unhurried.", "I close with a sunset deck and a special dinner nearby."]
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
