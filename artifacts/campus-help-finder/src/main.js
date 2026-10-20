const resources = [
  {
    name: "Food Pantry",
    description: "Pick up groceries and everyday essentials at no cost, with no questions asked.",
  },
  {
    name: "Counseling Services",
    description: "Talk with a licensed counselor and find confidential support for your wellbeing.",
  },
  {
    name: "Tutoring Center",
    description: "Get one-on-one or small-group academic help from trained peer tutors.",
  },
  {
    name: "Student Legal Aid",
    description: "Meet with a qualified advisor for free guidance on common legal concerns.",
  },
  {
    name: "Childcare Support",
    description: "Explore no-cost childcare options and practical support for student parents.",
  },
  {
    name: "Emergency Housing",
    description: "Find a safe place to stay and connect with help for urgent housing needs.",
  },
];

const arrowIcon = `
  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 20 20" fill="none">
    <path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const markIcon = `
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 20.2s-7-4.2-7-10.1a4.1 4.1 0 0 1 7-2.9 4.1 4.1 0 0 1 7 2.9c0 5.9-7 10.1-7 10.1Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
    <path d="M8.8 12.1h2l1.1-2.2 1.5 4.2 1.1-2h1.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const searchIcon = `
  <svg aria-hidden="true" class="search-icon" viewBox="0 0 24 24" fill="none">
    <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" stroke-width="1.7"/>
    <path d="m16 16 4.1 4.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
  </svg>
`;

const careIcon = `
  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-7.3-4.4-7.3-10.5a4.3 4.3 0 0 1 7.3-3 4.3 4.3 0 0 1 7.3 3C19.3 16.6 12 21 12 21Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>
`;

const cards = resources.map((resource, index) => `
  <article class="resource-card" data-resource-card data-testid="card-resource-${index + 1}" aria-labelledby="resource-title-${index + 1}" style="animation-delay:${index * 45}ms">
    <span class="card-index" aria-hidden="true">0${index + 1} / 06</span>
    <h3 id="resource-title-${index + 1}">${resource.name}</h3>
    <p>${resource.description}</p>
    <a class="learn-link" href="#" data-learn-more aria-label="Learn more about ${resource.name} (details coming soon)">
      Learn more ${arrowIcon}
    </a>
  </article>
`).join("");

document.querySelector("#app").innerHTML = `
  <div class="site-shell">
    <header class="topbar">
      <div class="brand" aria-label="Campus Help Finder">
        <span class="brand-mark">${markIcon}</span>
        <span>Campus Help Finder</span>
      </div>
      <div class="top-note">Student support, made simpler</div>
    </header>

    <main>
      <section class="intro" aria-labelledby="page-title">
        <p class="eyebrow">A good place to start</p>
        <h1 id="page-title">Find your <span>people.</span><br>Find your support.</h1>
        <p class="intro-copy">College can bring a lot at once. This is a simple place to find free support available to students on campus.</p>

        <form class="search-panel" role="search" aria-label="Find campus support" onsubmit="return false">
          <label for="resource-search">What kind of support are you looking for?</label>
          <div class="search-wrap">
            ${searchIcon}
            <input id="resource-search" name="q" type="search" autocomplete="off" placeholder="Try “food”, “housing”, or “tutoring”" aria-describedby="search-hint result-count" data-testid="input-resource-search">
          </div>
          <p class="search-hint" id="search-hint">Search by a service or what you need. Results update as you type.</p>
        </form>
      </section>

      <section class="resources-section" aria-labelledby="resources-title">
        <div class="section-heading">
          <h2 id="resources-title">Free support on campus</h2>
          <p class="result-count" id="result-count" aria-live="polite">6 resources</p>
        </div>
        <div class="resource-grid" id="resource-grid" aria-live="polite">
          ${cards}
          <div class="no-results" id="no-results" hidden data-testid="status-no-results">
            <strong>No matches just yet.</strong>
            <p>Try a different word, or search for a need like food, housing, or help with classes.</p>
          </div>
        </div>
      </section>

      <p class="closing-note">${careIcon}<span>Every resource listed here is free for students. Reaching out is a good first step.</span></p>
    </main>

    <footer>
      <p>Campus Help Finder</p>
      <p>A starting point for student support</p>
    </footer>
  </div>
`;

const searchInput = document.querySelector("#resource-search");
const resourceCards = [...document.querySelectorAll("[data-resource-card]")];
const noResults = document.querySelector("#no-results");
const resultCount = document.querySelector("#result-count");

function filterResources() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  for (const card of resourceCards) {
    const searchableText = card.textContent.toLocaleLowerCase();
    const isMatch = searchableText.includes(query);
    card.hidden = !isMatch;
    if (isMatch) visibleCount += 1;
  }

  noResults.hidden = visibleCount > 0;
  resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "resource" : "resources"}`;
}

searchInput.addEventListener("input", filterResources);

document.querySelectorAll("[data-learn-more]").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
