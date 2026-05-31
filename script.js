const dayFilter = document.getElementById("dayFilter");
const budgetLevel = document.getElementById("budgetLevel");
const budgetOutput = document.getElementById("budgetOutput");
const tripNotes = document.getElementById("tripNotes");
const dayCards = document.querySelectorAll(".day-card");

const budgetLookup = {
  budget: 120,
  standard: 220,
  premium: 380
};

function applyDayFilter() {
  const selected = dayFilter.value;
  dayCards.forEach((card) => {
    const day = card.getAttribute("data-day");
    const show = selected === "all" || selected === day;
    card.classList.toggle("hidden", !show);
  });
}

function updateBudget() {
  const daily = budgetLookup[budgetLevel.value];
  const total = daily * 3;
  budgetOutput.textContent = `Estimated total for 3 days: $${total} ($${daily}/day).`;
}

function loadNotes() {
  const saved = localStorage.getItem("nyc_trip_notes");
  if (saved) {
    tripNotes.value = saved;
  }
}

function saveNotes() {
  localStorage.setItem("nyc_trip_notes", tripNotes.value);
}

dayFilter.addEventListener("change", applyDayFilter);
budgetLevel.addEventListener("change", updateBudget);
tripNotes.addEventListener("input", saveNotes);

applyDayFilter();
updateBudget();
loadNotes();
