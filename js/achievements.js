/* ============================================================
   ACHIEVEMENTS & ECA — DATA + MODAL
   Each entry below is rendered as a clickable list item that
   opens a futuristic mission-record modal with full details.

   ----- DATA SCHEMA (per entry) -----
     id:      stable string id (used to wire clicks → data)
     title:   the headline
     period:  year(s) + organising body
     desc:    1–3 short sentences. Keep it scannable.
     shows:   "What it shows about me" — one short line
     image:   path to image (optional). If omitted, modal shows
              a styled "no visual yet" placeholder.

   ----- HOW TO REPLACE THE PLACEHOLDERS -----
     1. Edit the entries below — change title, period, desc, shows
     2. (Optional) Drop an image into assets/records/ and set the
        image: 'assets/records/your-file.jpg' field
     3. Save. That's it — Live Server reloads, modal updates.
   ============================================================ */

const records = {
  achievements: [
    {
      id: 'directors-list-2026',
      title: 'Director\u2019s List',
      period: '2026 \u00b7 Ngee Ann Polytechnic',
      desc: 'Recognised for being in the top 10% of the cohort for strong academic performance during the semester.',
      shows: 'Reflects my consistency, discipline, and commitment to improving my work.',
      image: 'assets/records/directors-list.jpg'
    },
    {
      id: 'top-scorer-product-management-2025',
      title: 'Top Scorer \u2014 Production Management',
      period: '2025 \u00b7 Ngee Ann Polytechnic',
      desc: 'Awarded for achieving the highest performance in the Production Management module, Diploma in Immersive Media.',
      shows: 'Shows my ability to understand concepts deeply and apply them effectively in product-related work.',
      image: 'assets/records/top-scorer-product-management.jpg'
    }
  ],

  eca: [
    {
      id: 'volleyball',
      title: 'Volleyball',
      period: '2024 \u2014 2026 \u00b7 Co-Curricular Activity',
      desc: 'Participated in volleyball as part of my activities outside school, developing teamwork, communication, and discipline.',
      shows: 'Helped me become more adaptable, confident, and comfortable working with others in a team environment.',
      image: 'assets/records/volleyball.jpg'
    },
    {
      id: 'crochet',
      title: 'Crochet',
      period: 'Personal Interest \u00b7 Creative Hobby',
      desc: 'Started learning crochet as a creative hobby to explore patience, craft, and hands-on making.',
      shows: 'Reflects my curiosity, patience, and willingness to learn new skills outside my main field.',
      image: 'assets/records/crochet-beanie.jpg'
    },
    {
      id: 'boys-brigade-primer',
      title: 'Boys\u2019 Brigade Primer',
      period: '2024 \u2014 2026 \u00b7 Volunteer',
      desc: 'Took up the role of Primer \u2014 the term used for volunteers in Boys\u2019 Brigade. More than giving back to my previous CCA, this is an opportunity to grow into a more responsible and dependable figure.',
      shows: 'Shows my willingness to take action, serve others, and be responsible for the duties entrusted to me.',
      image: 'assets/records/boys-brigade-primer.jpg'
    },
    {
      id: 'community-volunteer',
      title: 'Community Volunteer',
      period: '2020 \u2014 2026 \u00b7 Volunteer',
      desc: 'First started volunteering because of my mother, but over time grew to genuinely enjoy helping out and giving back to the community.',
      shows: 'Reflects my interest in helping others and my willingness to take action in supporting the community.',
      image: 'assets/records/community-volunteer.jpg'
    }
  ]
};

/* ============================================================
   RENDER THE TWO LISTS
   ============================================================ */
const ACH_LIST = document.getElementById('achievementsList');
const ECA_LIST = document.getElementById('ecaList');

function renderRecordList(listEl, items, kind) {
  listEl.innerHTML = items
    .map(
      (item) => `
      <li class="record-item" tabindex="0" role="button"
          data-record-kind="${kind}" data-record-id="${item.id}"
          aria-haspopup="dialog">
        <div class="record-item-text">
          <strong>${item.title}</strong>
          <span>${item.period}</span>
        </div>
        <div class="record-item-cta" aria-hidden="true">
          <span>OPEN LOG</span>
          <span class="record-item-arrow">→</span>
        </div>
      </li>`
    )
    .join('');
}

if (ACH_LIST) renderRecordList(ACH_LIST, records.achievements, 'achievements');
if (ECA_LIST) renderRecordList(ECA_LIST, records.eca, 'eca');

/* ============================================================
   MODAL LOGIC
   - Click / Enter / Space on a record-item opens the modal
   - Click backdrop, click ×, or press Escape to close
   - Focus is trapped inside the modal while open
   - Focus returns to the triggering item on close
   ============================================================ */
const modal       = document.getElementById('recordModal');
const closeBtn    = document.getElementById('recordClose');
const titleEl     = document.getElementById('recordTitle');
const typeEl      = document.getElementById('recordType');
const periodEl    = document.getElementById('recordPeriod');
const descEl      = document.getElementById('recordDesc');
const showsEl     = document.getElementById('recordShows');
const visualFrame = document.getElementById('recordVisualFrame');
const particleBox = document.getElementById('recordParticles');

let lastTrigger = null; // remember which item opened the modal

function openRecord(kind, id, triggerEl) {
  const list = records[kind];
  if (!list) return;
  const item = list.find((r) => r.id === id);
  if (!item) return;

  // Populate text content
  typeEl.textContent  = kind === 'eca' ? '// CO-CURRICULAR LOG' : '// MISSION LOG';
  titleEl.textContent = item.title;
  periodEl.textContent = item.period;
  descEl.textContent  = item.desc;
  showsEl.textContent = item.shows;

  // Visual: image if present, themed placeholder otherwise
  if (item.image) {
    visualFrame.innerHTML =
      `<img src="${item.image}" alt="${item.title}" />`;
    visualFrame.classList.remove('is-empty');
  } else {
    visualFrame.innerHTML = `
      <div class="record-visual-empty">
        <div class="rve-grid"></div>
        <div class="rve-label">// VISUAL · NOT YET LOGGED</div>
      </div>`;
    visualFrame.classList.add('is-empty');
  }

  // Show modal
  lastTrigger = triggerEl;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Generate fresh background particles for each open
  spawnModalParticles();

  // Move focus to the close button so keyboard users can dismiss easily
  setTimeout(() => closeBtn.focus(), 60);
}

function closeRecord() {
  if (!modal.classList.contains('is-open')) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  particleBox.innerHTML = ''; // clear particles to prevent buildup
  // Return focus to the trigger that opened the modal
  if (lastTrigger) {
    lastTrigger.focus();
    lastTrigger = null;
  }
}

function spawnModalParticles() {
  particleBox.innerHTML = '';
  const COUNT = 35;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.style.left = Math.random() * 100 + '%';
    p.style.top  = Math.random() * 100 + '%';
    const dur = 6 + Math.random() * 10;
    const delay = -Math.random() * dur;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = delay + 's';
    p.style.opacity = (0.3 + Math.random() * 0.6).toFixed(2);
    const scale = 0.5 + Math.random() * 1.4;
    p.style.transform = `scale(${scale})`;
    if (Math.random() < 0.18) p.classList.add('cyan');
    else if (Math.random() < 0.08) p.classList.add('magenta');
    particleBox.appendChild(p);
  }
}

// Wire up clicks on every record item via event delegation —
// this works for items rendered now AND any added later
document.addEventListener('click', (e) => {
  const item = e.target.closest('.record-item');
  if (item) {
    const kind = item.dataset.recordKind;
    const id   = item.dataset.recordId;
    openRecord(kind, id, item);
    return;
  }
  if (e.target.matches('[data-modal-close]')) {
    closeRecord();
  }
});

// Keyboard support — Enter or Space on a focused item
document.addEventListener('keydown', (e) => {
  const item = document.activeElement && document.activeElement.matches('.record-item')
    ? document.activeElement
    : null;
  if (item && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    openRecord(item.dataset.recordKind, item.dataset.recordId, item);
    return;
  }
  if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    closeRecord();
  }
});
