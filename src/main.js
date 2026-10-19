import "./style.css";

// ---------- Edit your content here ----------
const stats = [
  { value: "2", label: "Full-stack apps" },
  { value: "4", label: "Internship projects" },
  { value: "2027", label: "Grad year" }, // put your real graduation year
];

const skills = {
  Languages: ["JavaScript", "HTML5", "CSS3"],
  Frontend: ["React", "Tailwind CSS", "Vite"],
  Backend: ["Node.js", "Express", "MongoDB", "JWT"],
  Tools: ["Git", "GitHub", "Vercel", "VS Code"],
};

const projects = [
  {
    title: "NoteShare",
    desc: "Notes-sharing MERN app with JWT authentication, an Express and MongoDB backend, and a React + Tailwind frontend.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://note-share-jet.vercel.app/",
    repo: "https://github.com/harneetsingh46/NoteShare",
  },
  {
    title: "BudgetBaby",
    desc: "Budget tracking app with a separately deployed frontend and backend.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Vercel"],
    live: "https://budget-baby.vercel.app/",
    repo: "https://github.com/harneetsingh46/Budget-Baby",
  },
];
// --------------------------------------------

const root = document.documentElement;
const themeBtn = document.querySelector("#theme-toggle");

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/></svg>`;

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

function applyTheme(dark) {
  root.classList.toggle("dark", dark);
  themeBtn.innerHTML = dark ? sunIcon : moonIcon;
  localStorage.setItem("theme", dark ? "dark" : "light");
}
const saved = localStorage.getItem("theme");
applyTheme(saved ? saved === "dark" : false);
themeBtn.addEventListener("click", () =>
  applyTheme(!root.classList.contains("dark")),
);

const menu = document.querySelector("#mobile-menu");
document
  .querySelector("#menu-btn")
  .addEventListener("click", () => menu.classList.toggle("hidden"));
menu
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => menu.classList.add("hidden")),
  );

document.querySelector("#stats").innerHTML = stats
  .map(
    (s) => `
    <div>
      <p class="font-serif text-3xl">${s.value}</p>
      <p class="mt-1 text-xs uppercase tracking-widest text-neutral-500">${s.label}</p>
    </div>`,
  )
  .join("");

document.querySelector("#skills-grid").innerHTML = Object.entries(skills)
  .map(
    ([group, items]) => `
    <div>
      <h3 class="font-serif text-xl">${group}</h3>
      <ul class="mt-4 space-y-2 text-sm text-neutral-400">
        ${items.map((i) => `<li>${i}</li>`).join("")}
      </ul>
    </div>`,
  )
  .join("");

const chip = (t) =>
  `<span class="border border-black/20 px-3 py-1 text-xs text-neutral-600 dark:border-white/20 dark:text-neutral-400">${t}</span>`;

document.querySelector("#projects-list").innerHTML = projects
  .map(
    (p, i) => `
    <article class="grid grid-cols-[3rem_1fr] gap-4 border-b border-black/10 py-10 first:pt-0 dark:border-white/10 sm:grid-cols-[5rem_1fr_auto]">
      <span class="font-serif text-3xl text-neutral-500 dark:text-neutral-700">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <h3 class="font-serif text-2xl">${p.title}</h3>
        <p class="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">${p.desc}</p>
        <div class="mt-5 flex flex-wrap gap-2">${p.stack.map(chip).join("")}</div>
      </div>
      <button data-index="${i}" class="col-start-2 self-start text-left text-xs uppercase tracking-widest text-neutral-500 hover:text-accent sm:col-start-3">View →</button>
    </article>`,
  )
  .join("");

const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal-body");

document.querySelector("#projects-list").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;
  const p = projects[btn.dataset.index];
  modalBody.innerHTML = `
    <h3 class="font-serif text-3xl">${p.title}</h3>
    <p class="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">${p.desc}</p>
    <div class="mt-5 flex flex-wrap gap-2">${p.stack.map(chip).join("")}</div>
    <div class="mt-6 flex gap-6 text-xs uppercase tracking-widest text-accent">
      ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="hover:underline">Live ↗</a>` : ""}
      <a href="${p.repo}" target="_blank" rel="noopener" class="hover:underline">Code ↗</a>
    </div>`;
  modal.showModal();
});
document
  .querySelector("#modal-close")
  .addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});
