const sections = document.querySelectorAll(".section");

const bg1 = document.getElementById("bg-layer1");
const bg2 = document.getElementById("bg-layer2");

let activeLayer = 1;
let currentBg = "";

/* SMOOTH BACKGROUND MORPH */
window.addEventListener("scroll", () => {

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2) {

      const newBg = section.dataset.bg;

      if (newBg !== currentBg) {

        if (activeLayer === 1) {
          bg2.style.backgroundImage = `url(${newBg})`;
          bg2.style.opacity = 1;
          bg1.style.opacity = 0;
          activeLayer = 2;
        } else {
          bg1.style.backgroundImage = `url(${newBg})`;
          bg1.style.opacity = 1;
          bg2.style.opacity = 0;
          activeLayer = 1;
        }

        currentBg = newBg;
      }
    }
  });

});

/* PARALLAX DEPTH */
window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  bg1.style.transform = `scale(1.1) translateY(${scrollY * 0.05}px)`;
  bg2.style.transform = `scale(1.15) translateY(${scrollY * 0.08}px)`;
});

/* JOB DATA */
const jobs = {
  tech: ["Software Engineer","AI Engineer","Cloud Architect","Blockchain Developer","Data Scientist"],
  finance: ["Investment Banker","Quant Trader","Wealth Manager"],
  medical: ["Surgeon","Cardiologist","Neurologist"],
  law: ["Corporate Lawyer","IP Lawyer","Criminal Lawyer"],
  engineering: ["Mechanical Engineer","Civil Engineer","Aerospace Engineer"]
};

/* CLICK TO SHOW JOBS */
sections.forEach(section => {
  section.addEventListener("click", () => {
    const key = section.querySelector("h1").innerText.toLowerCase();
    showJobs(key);
  });
});

function showJobs(category) {
  const container = document.getElementById("jobsContainer");
  container.innerHTML = "";

  jobs[category].forEach(job => {
    const div = document.createElement("div");
    div.className = "job";
    div.innerText = job;
    container.appendChild(div);
  });
}
