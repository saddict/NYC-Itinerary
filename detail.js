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
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bryant_Park_with_NYPL.jpg", alt: "Bryant Park and the New York Public Library", caption: "Bryant Park and the New York Public Library" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/2011-NYC-Bryant-Park-Library.JPG", alt: "New York Public Library viewed from Bryant Park", caption: "The library as seen from Bryant Park" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bryant_Park,_Midtown_Manhattan,_New_York_(7237732066).jpg", alt: "Bryant Park in Midtown Manhattan", caption: "Bryant Park as the first stop of the day" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=Bethesda%20Terrace%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://d2wsrtli9cxkek.cloudfront.net/media/images/locations/Bethesda-Terrace-and-Fountain-May-2018_18.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1151.1627906977&q=80&s=1d5129a9f4efae83b55b4adc6de921e9&w=2475", alt: "Bethesda Fountain in Central Park", caption: "Bethesda Fountain in the heart of Central Park" },
        { src: "https://d2wsrtli9cxkek.cloudfront.net/media/images/locations/Bethesda-Terrace-July-2018_0007.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1151.1627906977&q=80&s=8b9e49fc448d5144c3e5a8fd6e30b328&w=2475", alt: "Bethesda Terrace in Central Park", caption: "Bethesda Terrace for the middle of the park walk" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bow_Bridge_in_Central_Park,_NYC.jpg", alt: "Bow Bridge in Central Park", caption: "Bow Bridge as part of the Central Park route" }
      ]
    },
    date: {
      map: "https://maps.google.com/maps?q=Times%20Square%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Times_Square_at_Night_(7823232238).jpg", alt: "Times Square at night", caption: "Times Square once the lights come on" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shubert_Theatre_NYC_from_Shubert_Alley.jpg", alt: "Shubert Theatre seen from Shubert Alley", caption: "A theater-district stop near Broadway" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/New_York_City_-_Times_Square_(16727268647).jpg", alt: "Times Square in Midtown Manhattan", caption: "The Broadway district in the evening" }
      ]
    },
    insider: {
      map: "https://maps.google.com/maps?q=Hell%27s%20Kitchen%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Restaurant_Row_0473New_York_City.JPG", alt: "Restaurant Row in the Theater District", caption: "Restaurant Row near the theater district" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Film_Center_Building.jpg", alt: "Film Center Building on Ninth Avenue", caption: "A real Hell's Kitchen and Ninth Avenue streetscape" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ninth-ave-at-49th-st-facing-south.jpg", alt: "Ninth Avenue in Hell's Kitchen", caption: "Ninth Avenue after the show" }
      ]
    }
  },
  2: {
    morning: {
      map: "https://maps.google.com/maps?q=Battery%20Park%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Battery_Park.JPG", alt: "Battery Park in Lower Manhattan", caption: "Battery Park at the southern tip of Manhattan" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/South_Ferry_td_(2018-08-02)_28_-_Whitehall_Terminal.jpg", alt: "Whitehall Terminal at South Ferry", caption: "Whitehall Terminal for the ferry portion of the morning" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Staten_Island_Ferry_terminal.jpg", alt: "Staten Island Ferry terminal in Lower Manhattan", caption: "The Staten Island Ferry terminal near Battery Park" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=9%2F11%20Memorial%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/National_September_11_Memorial,_World_Trade_Center,_New_York,_New_York_-_Flickr_id_32584500337.jpg", alt: "National September 11 Memorial", caption: "The 9/11 Memorial in Lower Manhattan" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/The_WTC_Transportation_Hub.jpg", alt: "WTC Transportation Hub and One World Trade Center", caption: "The memorial district around the Oculus and One World Trade Center" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/South_Street_Seaport_Historic_District,_New_York_(461740787).jpg", alt: "South Street Seaport Historic District", caption: "South Street Seaport as the afternoon waterfront stop" }
      ]
    },
    date: {
      map: "https://maps.google.com/maps?q=Brooklyn%20Bridge%20Park%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Brooklyn_Bridge_Park_td_(2019-08-23)_043_-_Pier_1.jpg", alt: "Pier 1 promenade in Brooklyn Bridge Park", caption: "Brooklyn Bridge Park at Pier 1" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/2024-11-17-Manhattan_Bridge_Dumbo-0407.jpg", alt: "Manhattan Bridge from Washington Street in DUMBO", caption: "The classic DUMBO Manhattan Bridge view" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Under_the_Brooklyn_bridge_at_Night.jpg", alt: "Brooklyn Bridge at night from DUMBO", caption: "Brooklyn Bridge at night from the DUMBO side" }
      ]
    },
    insider: {
      map: "https://maps.google.com/maps?q=DUMBO%20Brooklyn%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/View_of_Manhattan_Bridge_from_Washington_Street_in_DUMBO,_Brooklyn.jpg", alt: "Washington Street view in DUMBO", caption: "Washington Street in DUMBO" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Dumbo_-_Brooklyn,_NYC.jpg", alt: "DUMBO streetscape in Brooklyn", caption: "A real DUMBO neighborhood street" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Brooklyn_Bridge_Park.jpg", alt: "Brooklyn Bridge Park in Brooklyn", caption: "Brooklyn Bridge Park looking across the waterfront" }
      ]
    }
  },
  3: {
    morning: {
      map: "https://maps.google.com/maps?q=Metropolitan%20Museum%20of%20Art%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Details_of_the_exterior_of_Metropolitan_Museum_of_Art.jpg", alt: "Exterior of the Metropolitan Museum of Art", caption: "The Metropolitan Museum of Art exterior" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Metropolitan_Museum_of_Art.JPG", alt: "Front of the Metropolitan Museum of Art", caption: "The Met as the first stop of the last day" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Metropolitan_Museum_of_Art_-_From_the_far_side.jpg", alt: "Metropolitan Museum of Art from the far side", caption: "Another view of the museum and its Upper East Side setting" }
      ]
    },
    afternoon: {
      map: "https://maps.google.com/maps?q=Center%20for%20Book%20Arts%20New%20York&t=&z=14&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://centerforbookarts.org/wp-content/uploads/2022/05/letterpress1_2-1024x683.jpg", alt: "Center for Book Arts letterpress studio", caption: "Inside the Center for Book Arts printshop" },
        { src: "https://centerforbookarts.org/wp-content/uploads/2025/01/CBAscrapbook1-816x1024.jpg", alt: "Center for Book Arts archival display", caption: "A look at the Center for Book Arts collections and history" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Flatiron_Building,_New_York_City.jpg", alt: "Flatiron Building in Manhattan", caption: "Flatiron nearby after the Center for Book Arts visit" }
      ]
    },
    date: {
      map: "https://maps.google.com/maps?q=The%20High%20Line%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/The_High_Line_New_York_(11600580143).jpg", alt: "The High Line in Manhattan", caption: "The High Line for the final sunset walk" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/2016-11_New_York_City_High_Line.jpg", alt: "High Line walkway in New York City", caption: "A real stretch of the High Line path" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/The_High_Line_01.JPG", alt: "The High Line park in Manhattan", caption: "Another view of the High Line before dinner" }
      ]
    },
    insider: {
      map: "https://maps.google.com/maps?q=Greenwich%20Village%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed",
      photos: [
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Greenwich_Village_(27483343909).jpg", alt: "Greenwich Village streetscape", caption: "A real Greenwich Village streetscape" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/NYC_-_Greenwich_Village_-_Gay_Street.JPG", alt: "Gay Street in Greenwich Village", caption: "Gay Street in Greenwich Village" },
        { src: "https://commons.wikimedia.org/wiki/Special:FilePath/Washington_Square_Arch_by_David_Shankbone.jpg", alt: "Washington Square Arch", caption: "Washington Square Arch as part of the Village route" }
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
