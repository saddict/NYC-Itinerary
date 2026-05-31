const budgetLevel = document.getElementById("budgetLevel");
const budgetOutput = document.getElementById("budgetOutput");
const day = document.body.getAttribute("data-day");
const detailMap = document.getElementById("detailMap");
const photoGrid = document.getElementById("photoGrid");
const mediaTitle = document.getElementById("mediaTitle");
const sectionButtons = document.querySelectorAll(".section-btn");
let activeSection = "morning";

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

const mediaData = {
  1: {
    morning: {
      map: "https://maps.google.com/maps?q=Bryant%20Park%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=900&q=80", alt: "New York Public Library interior" },
        { src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=80", alt: "Bryant Park area" },
        { src: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=80", alt: "Midtown avenue walk" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=Bethesda%20Terrace%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80", alt: "Central Park paths" },
        { src: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=900&q=80", alt: "Bow Bridge view" },
        { src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=80", alt: "Park-side walking route" }
      ]
    },
    date: {
      map: "https://maps.google.com/maps?q=Times%20Square%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=900&q=80", alt: "Times Square at night" },
        { src: "https://images.unsplash.com/photo-1478827387698-1527781a4887?auto=format&fit=crop&w=900&q=80", alt: "Broadway theater district" },
        { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80", alt: "Night walk in Midtown Manhattan" }
      ]
    },
    insider: {
      map: "https://maps.google.com/maps?q=Hell%27s%20Kitchen%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80", alt: "Neighborhood street near Hell's Kitchen" },
        { src: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=80", alt: "Local Manhattan block" },
        { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80", alt: "City planning and route view" }
      ]
    }
  },
  2: {
    morning: {
      map: "https://maps.google.com/maps?q=Battery%20Park%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&q=80", alt: "Lower Manhattan skyline" },
        { src: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=900&q=80", alt: "Ferry terminal area" },
        { src: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=80", alt: "Morning in Financial District" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=9%2F11%20Memorial%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1483648969698-5e7dcaa3444f?auto=format&fit=crop&w=900&q=80", alt: "Downtown Manhattan street canyon" },
        { src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80", alt: "Wall Street district" },
        { src: "https://images.unsplash.com/photo-1534951009808-766178b47a4f?auto=format&fit=crop&w=900&q=80", alt: "Seaport area walk" }
      ]
    },
    date: {
      map: "https://maps.google.com/maps?q=Brooklyn%20Bridge%20Park%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80", alt: "Brooklyn Bridge at sunset" },
        { src: "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=900&q=80", alt: "DUMBO Manhattan Bridge view" },
        { src: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=80", alt: "Evening city walk" }
      ]
    },
    insider: {
      map: "https://maps.google.com/maps?q=DUMBO%20Brooklyn%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?auto=format&fit=crop&w=900&q=80", alt: "Brooklyn side street" },
        { src: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=900&q=80", alt: "Bridge walkway crowd" },
        { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80", alt: "Downtown night route" }
      ]
    }
  },
  3: {
    morning: {
      map: "https://maps.google.com/maps?q=Metropolitan%20Museum%20of%20Art%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1529429611278-ec4b65f2f476?auto=format&fit=crop&w=900&q=80", alt: "Museum entrance in NYC" },
        { src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80", alt: "Museum interior gallery" },
        { src: "https://images.unsplash.com/photo-1518991791750-7491a8d1a0d5?auto=format&fit=crop&w=900&q=80", alt: "Upper East Side museum district" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=Washington%20Square%20Park%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=80", alt: "Washington Square Arch" },
        { src: "https://images.unsplash.com/photo-1448317846460-907988886b33?auto=format&fit=crop&w=900&q=80", alt: "SoHo street scene" },
        { src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80", alt: "Village neighborhood walk" }
      ]
    },
    date: {
      map: "https://maps.google.com/maps?q=The%20High%20Line%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&w=900&q=80", alt: "High Line pathway" },
        { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80", alt: "Chelsea evening skyline" },
        { src: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=900&q=80", alt: "Hudson sunset cityscape" }
      ]
    },
    insider: {
      map: "https://maps.google.com/maps?q=Greenwich%20Village%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80", alt: "Subway map and route planning" },
        { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80", alt: "Trip notes and planning desk" },
        { src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80", alt: "Local NYC neighborhood detail" }
      ]
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

function renderMedia(section) {
  const data = mediaData[day][section];
  mediaTitle.textContent = `Map + Photos: ${section === "date" ? "Date Night" : section.charAt(0).toUpperCase() + section.slice(1)}`;
  detailMap.src = data.map;
  photoGrid.innerHTML = data.photos.map((p) => `<img src="${p.src}" alt="${p.alt}" />`).join("");
}

function setActiveSection(section) {
  activeSection = section;
  sectionButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.section === section));
  renderMedia(section);
}

const saved = localStorage.getItem("nyc_budget_level");
if (saved && detailsData[saved]) budgetLevel.value = saved;
budgetLevel.addEventListener("change", renderDetail);
sectionButtons.forEach((btn) => {
  btn.addEventListener("click", () => setActiveSection(btn.dataset.section));
});
renderDetail();
setActiveSection(activeSection);
