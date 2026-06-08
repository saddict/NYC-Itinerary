const budgetLevel = document.getElementById("budgetLevel");
const budgetOutput = document.getElementById("budgetOutput");
const day = document.body.getAttribute("data-day");
const detailMap = document.getElementById("detailMap");
const photoGrid = document.getElementById("photoGrid");
const mediaTitle = document.getElementById("mediaTitle");
const sectionButtons = document.querySelectorAll(".section-btn");
const timeCards = document.querySelectorAll(".time-card");
let activeSection = "morning";

const detailsData = {
  budget: {
    cost: 70,
    1: {
      morning: ["I would start us with bagels or coffee near Bryant Park so the first morning feels easy.", "I keep the library and Fifth Avenue stretch close together so we can settle into the city without rushing."],
      afternoon: ["I leave room for a longer Central Park walk with freedom to pause wherever we want.", "I keep lunch flexible with a deli or cafe on the west side of the park."],
      date: ["I would check same-day theater deals or a smaller off-Broadway option.", "I finish the night with dessert in Hell's Kitchen so we still get a little date-night feeling."],
      insider: ["I would avoid the obvious restaurant blocks around Times Square unless we already have reservations.", "I built in earlier park time because Central Park is calmer before the middle of the day."]
    },
    2: {
      morning: ["I start with the Staten Island Ferry or Battery Park so we get skyline views without adding much cost.", "I keep breakfast simple downtown before we start walking."],
      afternoon: ["I mapped a slower route through the 9/11 Memorial area and lower Manhattan.", "I left lunch near the Seaport so we can sit for a bit before heading toward Brooklyn."],
      date: ["I like a sunset bridge walk with something casual to eat afterward.", "I save the best skyline pause for Brooklyn Bridge Park at night."],
      insider: ["I would cross toward Brooklyn before the evening crush if we want the walk to feel more relaxed.", "I kept DUMBO dinner casual because the views matter more than a formal reservation here."]
    },
    3: {
      morning: ["I would pick one museum and give it our full attention instead of trying to do too much.", "I would use timed entry so the day starts smoothly."],
      afternoon: ["I made the Center for Book Arts the heart of this day, with real time to browse the exhibitions, studio spaces, and bookshop atmosphere.", "I planned the rest of the afternoon around Flatiron so the visit feels like the main event, not an add-on."],
      date: ["I finish with the High Line at sunset and dinner nearby so the trip ends softly.", "I would keep room for one last dessert or a bench stop before heading back."],
      insider: ["I would check the Center for Book Arts hours before we go so we can give it the time it deserves.", "I kept this route concentrated so we spend more time together in the places that matter most."]
    }
  },
  standard: {
    cost: 100,
    1: {
      morning: ["I planned a sit-down breakfast near Bryant Park so our first morning feels grounded.", "I pair the library with a Midtown architecture walk because it feels classic without being overwhelming."],
      afternoon: ["I built in Central Park highlights with a real lunch break instead of rushing from sight to sight.", "I even left room for a short reset before the evening."],
      date: ["I save the night for Broadway with seats booked ahead when possible.", "I would end it with dessert in Hell's Kitchen while the city still feels lively."],
      insider: ["I would look at weeknight performances first because they are usually easier on the budget.", "I like Bryant Park later in the evening when Midtown softens a bit."]
    },
    2: {
      morning: ["I start us at Battery Park with the option for harbor views if we want them.", "I keep a coffee stop in the Financial District so the morning stays unhurried."],
      afternoon: ["I grouped the memorial, Wall Street, and Seaport so the route makes sense and still feels reflective.", "I move us toward Brooklyn before the rush so golden hour stays enjoyable."],
      date: ["I timed the bridge and waterfront for the best light.", "I planned dinner in DUMBO so we can keep the skyline in view."],
      insider: ["I would use the ferry as a backup if subway service gets messy.", "I would reserve dinner ahead on weekends if we want something specific."]
    },
    3: {
      morning: ["I start with one museum priority and a short cafe break so the day still feels spacious.", "I would rather we see less and enjoy it more."],
      afternoon: ["I made the Center for Book Arts a major part of the afternoon, with enough time to really look around and enjoy being there together.", "I kept lunch and the surrounding Flatiron walk close by so the visit can stay at the center of the day."],
      date: ["I finish with the High Line and an easy west-side dinner.", "I keep the evening open enough that we can linger if the mood is right."],
      insider: ["I would budget extra time inside the Center for Book Arts because it feels like one of the most personal stops on the itinerary.", "I start the High Line from the south so the evening route feels clean and simple."]
    }
  },
  premium: {
    cost: 185,
    1: {
      morning: ["I would start with a nicer brunch and a more polished Midtown route.", "I could even leave room for a guided or curated stop if we want it."],
      afternoon: ["I keep Central Park scenic and comfortable, with space for shopping if it feels right.", "I leave enough downtime before the show so the night never feels squeezed."],
      date: ["I would book prime Broadway seats.", "I would follow that with a cocktail or dessert somewhere that feels a little special."],
      insider: ["I would make reservations for the evening pieces of the day.", "I would consider car service only if timing around theater gets tight."]
    },
    2: {
      morning: ["I would upgrade the harbor portion with a cruise or premium ferry timing.", "I would make breakfast downtown a little calmer and more comfortable."],
      afternoon: ["I would shape downtown into a more curated route with a real waterfront lunch.", "I still move us toward Brooklyn early enough to enjoy the evening."],
      date: ["I would book a stronger DUMBO dinner reservation and take advantage of the ferry if it fits.", "I like the idea of ending with a rooftop skyline view."],
      insider: ["I would avoid arriving at the Brooklyn waterfront too late because waits build quickly.", "I would book rooftops well ahead if we go that route."]
    },
    3: {
      morning: ["I would start with a premium museum entry or guided option.", "I would keep transit easy so the day still feels calm."],
      afternoon: ["Even at the premium level, I still want the Center for Book Arts to be the real anchor of the day.", "I would build extra time around the visit, then let the neighborhood wandering happen naturally afterward."],
      date: ["I would end with a sunset reservation and a better dinner nearby.", "I would leave room for a final Hudson walk if we still have energy."],
      insider: ["I would still prebook timed entries so the day runs smoothly.", "I would not overfill this day because the Center for Book Arts deserves real attention."]
    }
  }
};

const mediaData = {
  1: {
    morning: {
      map: "https://maps.google.com/maps?q=Bryant%20Park%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://drupal.nypl.org/sites-drupal/default/files/styles/max_scale_960x960/public/2023-04/1_The%20New%20York%20Public%20Library%2C%20from%20Bryant%20Park_0.png?itok=9tBJqbqM", alt: "The New York Public Library seen from Bryant Park", caption: "The New York Public Library from Bryant Park" },
        { src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=80", alt: "Bryant Park and Midtown", caption: "Bryant Park as our first reset point" },
        { src: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=80", alt: "Midtown avenue walk", caption: "A classic Midtown walk to open the trip" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=Bethesda%20Terrace%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://d2wsrtli9cxkek.cloudfront.net/media/images/locations/Bethesda-Terrace-and-Fountain-May-2018_18.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1151.1627906977&q=80&s=1d5129a9f4efae83b55b4adc6de921e9&w=2475", alt: "Bethesda Fountain in Central Park", caption: "Bethesda Fountain in the heart of Central Park" },
        { src: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=900&q=80", alt: "Bow Bridge in Central Park", caption: "Bow Bridge for a slower afternoon walk" },
        { src: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80", alt: "Central Park paths", caption: "The kind of park stretch I want us to linger in" }
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
        { src: "https://images.unsplash.com/photo-1529429611278-ec4b65f2f476?auto=format&fit=crop&w=900&q=80", alt: "Museum entrance in NYC", caption: "A focused museum morning" },
        { src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80", alt: "Museum interior gallery", caption: "Enough time to actually enjoy the galleries" },
        { src: "https://images.unsplash.com/photo-1518991791750-7491a8d1a0d5?auto=format&fit=crop&w=900&q=80", alt: "Upper East Side museum district", caption: "Starting the last day with something calm and beautiful" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=Center%20for%20Book%20Arts%20New%20York&t=&z=14&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://centerforbookarts.org/wp-content/uploads/2022/05/letterpress1_2-1024x683.jpg", alt: "Center for Book Arts letterpress studio", caption: "Inside the Center for Book Arts printshop" },
        { src: "https://centerforbookarts.org/wp-content/uploads/2025/01/CBAscrapbook1-816x1024.jpg", alt: "Center for Book Arts archival display", caption: "A look at the Center for Book Arts collections and history" },
        { src: "https://images.unsplash.com/photo-1448317846460-907988886b33?auto=format&fit=crop&w=900&q=80", alt: "Flatiron neighborhood street scene", caption: "Flatiron wandering around the Center" }
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
  photoGrid.innerHTML = data.photos
    .map((p) => `
      <figure class="photo-card">
        <img loading="lazy" src="${p.src}" alt="${p.alt}" />
        <figcaption>${p.caption || p.alt}</figcaption>
      </figure>
    `)
    .join("");
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
timeCards.forEach((card) => {
  card.addEventListener("mouseenter", () => setActiveSection(card.dataset.section));
});
renderDetail();
setActiveSection(activeSection);
