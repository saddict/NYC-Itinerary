const budgetLevel = document.getElementById("budgetLevel");
const budgetOutput = document.getElementById("budgetOutput");
const day = document.body.getAttribute("data-day");

const detailsData = {
  budget: {
    cost: 120,
    1: {
      morning: ["Bagel + coffee near Bryant Park.", "Library visit and 5th Ave walk."],
      afternoon: ["Long Central Park loop.", "Grab deli lunch west of the park."],
      date: ["TKTS deals or off-Broadway.", "Dessert walk in Hell's Kitchen."],
      insider: ["Avoid Broadway-adjacent food blocks.", "Enter Central Park before noon for lighter crowds."]
    },
    2: {
      morning: ["Take Staten Island Ferry for free skyline views.", "FiDi breakfast special."],
      afternoon: ["9/11 Memorial area walk.", "Seaport lunch deal menus."],
      date: ["Sunset bridge walk + pizza slice split.", "Night skyline at Brooklyn Bridge Park."],
      insider: ["Cross bridge before 6:30pm.", "Walk inland in DUMBO for cheaper food."]
    },
    3: {
      morning: ["Pick one museum and keep it focused.", "Use timed entry to skip long queues."],
      afternoon: ["Village + SoHo self-guided route.", "Pause in Washington Square."],
      date: ["High Line sunset walk.", "Bakery dessert and riverside benches."],
      insider: ["Weekend Village gets dense after 2pm.", "Mid-train cars ease transfers."]
    }
  },
  standard: {
    cost: 220,
    1: {
      morning: ["Sit-down breakfast near Bryant Park.", "Library and Midtown architecture walk."],
      afternoon: ["Central Park highlights with planned lunch stop.", "Hotel reset before evening."],
      date: ["Broadway with prebooked seats.", "Late dessert in Hell's Kitchen."],
      insider: ["Weeknight shows are easier to price.", "Bryant Park area is calmer after 8pm."]
    },
    2: {
      morning: ["Battery Park start + ferry option.", "Coffee stop in FiDi."],
      afternoon: ["9/11 Memorial + Wall Street + Seaport lunch.", "Move to Brooklyn before rush."],
      date: ["Bridge walk at golden hour.", "DUMBO dinner with skyline photos."],
      insider: ["Use ferry when subway service is disrupted.", "Reserve dinner ahead on weekends."]
    },
    3: {
      morning: ["Museum priority list with timed entry.", "Short cafe break."],
      afternoon: ["Greenwich Village lunch.", "SoHo and Washington Square loop."],
      date: ["High Line then one skyline observation deck.", "Night cap in Chelsea."],
      insider: ["Museum shops consume time quickly.", "Start High Line from south for best flow."]
    }
  },
  premium: {
    cost: 380,
    1: {
      morning: ["Brunch and curated Midtown route.", "Private guide option in the park."],
      afternoon: ["Central Park highlights + shopping stop.", "Downtime before show."],
      date: ["Prime Broadway seats.", "Cocktail lounge and dessert pairing."],
      insider: ["Use reservations for all dinner stops.", "Car service helps for tight theater timing."]
    },
    2: {
      morning: ["Harbor cruise or premium ferry slot.", "FiDi breakfast lounge."],
      afternoon: ["Guided downtown history route.", "Seaport waterfront dining."],
      date: ["DUMBO reservation + East River ferry return.", "Rooftop skyline view."],
      insider: ["Brooklyn waterfront waits spike after 7pm.", "Book rooftop tables early."]
    },
    3: {
      morning: ["Museum VIP/tour entry.", "Private transfer between zones."],
      afternoon: ["Village tasting route.", "Designer shopping in SoHo."],
      date: ["Sunset deck reservation + chef tasting menu.", "Late Hudson river walk."],
      insider: ["Premium decks still have peak slots.", "Prepay for smooth entry windows."]
    }
  }
};

function fillList(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderDetail() {
  const selected = budgetLevel.value;
  localStorage.setItem("nyc_budget_level", selected);
  const item = detailsData[selected][day];
  budgetOutput.textContent = `Budget mode: ${selected} ($${detailsData[selected].cost}/day est.).`;
  fillList("morningList", item.morning);
  fillList("afternoonList", item.afternoon);
  fillList("dateList", item.date);
  fillList("insiderList", item.insider);
}

const saved = localStorage.getItem("nyc_budget_level");
if (saved && detailsData[saved]) budgetLevel.value = saved;
budgetLevel.addEventListener("change", renderDetail);
renderDetail();
