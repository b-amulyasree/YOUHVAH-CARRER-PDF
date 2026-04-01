const bg = document.getElementById("bg");
const sections = document.querySelectorAll(".section");

let currentBg = "";

/* BACKGROUND SMOOTH TRANSITION */
window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2) {

      const newBg = section.getAttribute("data-bg");

      if (newBg !== currentBg) {
        bg.style.opacity = 0;

        setTimeout(() => {
          bg.style.backgroundImage = `url(${newBg})`;
          bg.style.transform = "scale(1.1)";
          bg.style.opacity = 1;

          setTimeout(() => {
            bg.style.transform = "scale(1)";
          }, 300);

          currentBg = newBg;
        }, 600);
      }
    }
  });
});

/* JOB DATA */
const jobs = {
  tech: [
    "Software Engineer",
    "AI Engineer",
    "Cloud Architect",
    "Blockchain Developer",
    "Data Scientist"
  ],

  finance: [
    "Investment Banker",
    "Financial Analyst",
    "Quant Trader",
    "Wealth Manager"
  ],

  medical: [
    "Surgeon",
    "Cardiologist",
    "Neurologist",
    "Radiologist"
  ],

  law: [
    "Corporate Lawyer",
    "Criminal Lawyer",
    "IP Lawyer"
  ],

  engineering: [
    "Mechanical Engineer",
    "Civil Engineer",
    "Aerospace Engineer"
  ]
};

/* SHOW JOBS */
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
