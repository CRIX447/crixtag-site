/* ============================================================
   CRIX TAG — script.js
   Everything you need to change is in the SETTINGS block below.
   ============================================================ */

const SETTINGS = {

  /* ---- COUNTDOWN ----
     Off by default. Set this to true when you know your date,
     and the whole countdown section appears on the site.       */
  countdownEnabled: false,

  /* The exact launch moment.
     Format: "YYYY-MM-DDTHH:MM:SS+10:00"
     +10:00 is Tasmania in winter, +11:00 during daylight saving.
     Example below is 1 June 2027 at 6pm.                       */
  releaseDate: "2027-06-01T18:00:00+10:00",

  /* The date shown above the counter.
     Leave as "" and it gets written automatically from
     releaseDate. Or type your own, e.g. "Summer 2027".         */
  releaseLabel: "",

  /* ---- LINKS ----
     Paste your invite here once and every Discord button on the
     site uses it.                                              */
  discordUrl: ""

};

/* ============================================================
   Below here you shouldn't need to touch anything.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  setupDiscordLinks();
  hideMissingImages();
  setupCountdown();
});

/* ---- Discord buttons ---- */
function setupDiscordLinks(){
  if(!SETTINGS.discordUrl) return;
  document.querySelectorAll("[data-discord]").forEach(link => {
    link.href = SETTINGS.discordUrl;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

/* ---- Any image file you haven't added yet just disappears,
        instead of showing a broken icon. ---- */
function hideMissingImages(){
  document.querySelectorAll("img[data-optional]").forEach(img => {
    img.addEventListener("error", () => img.remove());
    if(img.complete && img.naturalWidth === 0) img.remove();
  });
}

/* ---- Countdown ---- */
function setupCountdown(){
  const section = document.getElementById("countdown");
  if(!section || !SETTINGS.countdownEnabled) return;

  const target = new Date(SETTINGS.releaseDate).getTime();
  if(Number.isNaN(target)){
    console.warn("Crix Tag: releaseDate isn't a valid date, so the countdown stayed hidden.");
    return;
  }

  section.hidden = false;
  document.getElementById("cd-date").textContent =
    SETTINGS.releaseLabel || formatDate(target);

  const grid = document.getElementById("cd-grid");
  const live = document.getElementById("cd-live");
  const out = {
    days:  document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins:  document.getElementById("cd-mins"),
    secs:  document.getElementById("cd-secs")
  };

  tick();
  const timer = setInterval(tick, 1000);

  function tick(){
    const left = target - Date.now();

    if(left <= 0){
      clearInterval(timer);
      grid.hidden = true;
      live.hidden = false;
      return;
    }

    const s = Math.floor(left / 1000);
    out.days.textContent  = pad(Math.floor(s / 86400));
    out.hours.textContent = pad(Math.floor(s % 86400 / 3600));
    out.mins.textContent  = pad(Math.floor(s % 3600 / 60));
    out.secs.textContent  = pad(s % 60);
  }
}

function pad(n){
  return String(n).padStart(2, "0");
}

function formatDate(ms){
  return new Date(ms).toLocaleDateString(undefined, {
    day: "numeric", month: "long", year: "numeric"
  });
}
