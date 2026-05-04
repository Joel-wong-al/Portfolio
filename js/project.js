/* ============================================================
   PROJECT DETAIL PAGE
   - Triggers the "folder opening" animation on load
   - Reads ?id= from the URL and fills every section of the page
     with the matching project data from the projects object below.

   Each project supports:
     fileId, tag, title, sub                  → hero
     role, timeline, type, status             → meta cells
     banner: { type: 'image' | 'video' | 'placeholder',
               src: '...', alt/title: '...' }
     overview: ['paragraph 1', 'paragraph 2', ...]
     process:  [ { title, body }, ... ]       → numbered steps
     outcome:  { intro, bullets: [...] }
     tools:    ['Maya', 'Unity', ...]
     links:    [ { label, href }, ... ]
     credits:  'plain text or HTML string'
     gallery:  [ { src, caption }, ... ]      → empty array = hide section
   ============================================================ */

/* ---------- TRIGGER OPENING ANIMATION ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const opener = document.getElementById('opener');
    if (opener) opener.classList.add('done');
  }, 600);
});

/* ---------- PROJECT DATA ---------- */
const projects = {
  '01': {
    fileId:   '// FILE-01',
    tag:      'Mission File · 2025',
    title:    'Convinight Shift',
    sub:      'An interactive theft prevention game that trains observation skills through a security simulation — the player works the night shift in a convenience store and must spot suspicious behaviour on the cameras.',
    role:     'Gameplay Systems Dev & 3D Artist',
    timeline: '1 Month',
    type:     'School Project · SPF Collab',
    status:   'Completed',

    banner: {
      type: 'video',
      src: 'https://www.youtube.com/embed/8H8_WQpZhjE',
      title: 'Convinight Shift gameplay trailer'
    },

    overview: [
      'Convinight Shift is an interactive educational game built to raise awareness about theft prevention and discourage stealing through engaging gameplay. Players take on the role of a security guard working the night shift in a convenience store, relying on observation and decision-making to identify suspicious behaviour and catch potential thieves.',
      'To reinforce the message, the game also includes a short narrative animation showing the consequences of theft, helping players understand the real-world impact of these actions. My focus on this project was the gameplay layer — designing core mechanics, implementing the security camera system, and contributing 3D assets and textures to the environment.'
    ],

    process: [
      {
        title: 'Research &amp; Discovery',
        body: 'The project was framed around the theme of crime prevention. As a team we explored a few different angles and settled on theft because it&rsquo;s relatable, common — particularly among youths — and lets us tackle a real-world issue without feeling preachy.'
      },
      {
        title: 'Design Exploration',
        body: 'I explored gameplay concepts that could balance entertainment with education. <em>Five Nights at Freddy&rsquo;s</em> was a strong reference for surveillance-driven, tension-based play. To make it feel relatable, I anchored the setting in something familiar: a neighbourhood convenience store rather than a generic shop.'
      },
      {
        title: 'Build &amp; Iteration',
        body: 'I owned the security camera system, which is the core of the gameplay loop — letting players monitor different areas of the store. I also contributed textures and 3D assets for the environment. The biggest challenge was keeping the mechanics intuitive without losing tension; I iterated on the camera switching flow and HUD until it read clearly at first glance.'
      },
      {
        title: 'Launch &amp; Reflection',
        body: 'This was one of my first large-scale collaborative projects, and the biggest lesson was about communication. Working remotely made it hard to track progress and align tasks, which sometimes caused overlaps. It pushed me to communicate more clearly and take real ownership of my responsibilities — a step beyond what classwork on its own teaches.'
      }
    ],

    outcome: {
      intro: 'The project was well received and successfully demonstrated how interactive media can communicate real-world messages. The most meaningful outcome: an invitation to collaborate further with the Singapore Police Force on a follow-up, which gave us valuable real-world exposure.',
      bullets: [
        'Strengthened my coding and gameplay development skills',
        'Improved my 3D modelling and texturing workflow in Maya and Substance Painter',
        'Gained hands-on experience working on a real-world inspired team project'
      ]
    },

    tools:   ['Autodesk Maya', 'Unity', 'Substance Painter', 'VS Code', 'GitHub'],

    links: [
      { label: 'Watch Demo (YouTube)', href: 'https://www.youtube.com/watch?v=8H8_WQpZhjE' },
      { label: 'GitHub Repository',    href: 'https://github.com/Joel-wong-al/Delta_Challenge' }
    ],

    credits: 'Developed as a team project.<br/>Designed &amp; built by Joel Wong, Rasuli, Zenon, and Javier.',

    gallery: [
      { src: 'assets/projects/convinight/gameplay-store-interior.jpg', caption: 'Store interior · gameplay view' },
      { src: 'assets/projects/convinight/gameplay-aisle-view.jpg',     caption: 'Aisle perspective · NPC behaviour' },
      { src: 'assets/projects/convinight/security-camera-hud.jpg',     caption: 'Security camera HUD · Day 1 / Wave 1' },
      { src: 'assets/projects/convinight/storefront-exterior.jpg',     caption: 'Storefront exterior · TrustMart' },
      { src: 'assets/projects/convinight/substance-painter.jpg',       caption: 'Substance Painter · facade texturing' },
      { src: 'assets/projects/convinight/asset-layout-sheet.jpg',      caption: 'Modular asset & UV layout' }
    ]
  },

  '02': {
    fileId:   '// FILE-02',
    tag:      'Mission File · 2026',
    title:    'World Without Assumption',
    sub:      'A VR empathy experience that lets users step into the perspective of individuals with disabilities — and redesign everyday environments to be more inclusive.',
    role:     'Gameplay Systems Developer (VR)',
    timeline: '1 Month',
    type:     'School Project',
    status:   'Completed',

    banner: {
      type: 'video',
      src: 'https://www.youtube.com/embed/HjS8tjuzudU',
      title: 'World Without Assumption · VR walkthrough'
    },

    overview: [
      'World Without Assumption is an empathy-driven VR experience designed to help users better understand the challenges faced by individuals with disabilities. Through first-person simulation, users are placed into scenarios where they experience everyday environments from the perspective of people with different conditions.',
      'The experience covers four simulated disabilities: colour blindness, myopia, physical disability (wheelchair use), and congenital absence. Each scenario is designed to surface real-world challenges and limitations that are often overlooked.',
      'Beyond observation, users also get to rethink and redesign elements of the environment to better support accessibility. That shifts the experience from passive awareness into active problem-solving — encouraging users not only to empathize but to think critically about inclusive design.'
    ],

    process: [
      {
        title: 'Research &amp; Discovery',
        body: 'The project sat under the theme of Social Good and Inclusive Design. After deciding to build something in VR, we explored where immersive interaction could create the most meaningful impact. Through online research, forums, and personal observations, we identified four common conditions that significantly affect daily life: colour blindness, myopia, physical disability (wheelchair users), and congenital absence. That research became the foundation for designing scenarios that felt both realistic and impactful.'
      },
      {
        title: 'Design Exploration',
        body: 'Because this was an experience-driven project, I focused on understanding how VR environments are structured and how users naturally interact within them. I reviewed existing VR applications to spot common interaction patterns and gameplay mechanics that could be adapted. Rather than referencing a specific game, the design was grounded in real-world environments — I studied everyday spaces where individuals with disabilities run into difficulty, so each scenario would feel relatable.'
      },
      {
        title: 'Build &amp; Iteration',
        body: 'I owned the core gameplay systems for VR interaction: wheelchair locomotion using a velocity-based movement system, elevator/lift functionality, keycard access, and item detection. Making each disability simulation feel real was a major focus. Visual filters were tuned to accurately represent colour blindness and myopia, wheelchair movement carried added weight and resistance to simulate real physical effort, and controller limitations were introduced to replicate congenital absence without breaking gameplay. The hardest part was balancing realism with usability — keeping the experience immersive without becoming frustrating took several iterations.'
      },
      {
        title: 'Launch &amp; Reflection',
        body: 'The project was successfully presented and received positive feedback from lecturers, particularly for the concept and the level of realism. The biggest lesson for me was time management and prioritisation — this project ran alongside other major assignments, so I had to balance multiple responsibilities while keeping quality up. It pushed me to plan workload more carefully and stay adaptable under pressure.'
      }
    ],

    outcome: {
      intro: 'The project successfully demonstrated how immersive technology can promote empathy and awareness for inclusive design. By letting users experience real-world challenges from a different perspective, it encouraged deeper understanding and more thoughtful consideration of accessibility.',
      bullets: [
        'Developed strong VR interaction and gameplay system skills',
        'Gained experience designing for accessibility and inclusivity',
        'Learned to balance realism, usability, and engagement in immersive experiences'
      ]
    },

    tools:   ['Unity', 'Visual Studio', 'GitHub', 'Oculus Quest'],

    links: [
      { label: 'Watch Demo (YouTube)', href: 'https://www.youtube.com/watch?v=HjS8tjuzudU' },
      { label: 'GitHub Repository',    href: 'https://github.com/Prxst1ge/IP_Project2.2' }
    ],

    credits: 'Developed as a team project.<br/>Designed &amp; built by Joel Wong, Rasuli, Zenon, and Javier.',

    gallery: [
      { src: 'assets/projects/world-without-assumption/vr-dining-room.jpg',         caption: 'VR scene · dining room interaction' },
      { src: 'assets/projects/world-without-assumption/wheelchair-unity-scene.jpg', caption: 'Wheelchair model · Unity scene view' },
      { src: 'assets/projects/world-without-assumption/mrt-directory-board.jpg',    caption: 'MRT directory board · environment study' },
      { src: 'assets/projects/world-without-assumption/redesign-explanation-ui.jpg', caption: 'ReDesign Explanation · in-experience UI' },
      { src: 'assets/projects/world-without-assumption/repair-button-script.jpg',   caption: 'RepairButton.cs · interaction trigger' },
      { src: 'assets/projects/world-without-assumption/replay-scene-script.jpg',    caption: 'Replay_SceneM.cs · scene flow logic' }
    ]
  },

  '03': {
    fileId:   '// FILE-03',
    tag:      'Mission File · 2025',
    title:    'Prestige',
    sub:      'A product-focused website that showcases custom 3D modelled casing designs through an interactive shopping experience inspired by blind-box mechanics.',
    role:     '3D Artist, Front-End Developer & Prototype Designer',
    timeline: '1 Month',
    type:     'School Project',
    status:   'Completed',

    banner: {
      type: 'video',
      src: 'https://www.youtube.com/embed/T_xfB1DPH8Y',
      title: 'Prestige · product showcase walkthrough'
    },

    overview: [
      'Prestige is a product showcase website built to combine 3D modelling and web design into a cohesive digital experience. The site presents custom-designed earbuds casings alongside sourced phone casings in a way that feels engaging and interactive.',
      'Users can explore the products, learn about the design process, and walk through a simulated purchasing journey. A key feature is a blind-box style mechanic that adds an element of surprise to browsing — turning a product page into something closer to an experience.',
      'I worked across both the visual and technical sides: creating original 3D models for the casings and implementing interactive website features that support the overall user experience.'
    ],

    process: [
      {
        title: 'Research &amp; Discovery',
        body: 'We started by exploring different types of websites that could effectively showcase both 3D modelling and web development skills. A product-based website was the most natural fit — it lets us demonstrate technical and visual strengths in the same project. <em>Caseify</em> served as a primary reference, particularly for layout, product presentation, and overall user experience.'
      },
      {
        title: 'Design Exploration',
        body: 'During the design phase we explored different casing concepts that could be modelled and presented on the site. PureRef helped us collect references and direction for the products themselves. For the website interface, we used Figma to prototype layouts, user flows, and interaction ideas — visualising how users would navigate the site before any code was written.'
      },
      {
        title: 'Build &amp; Iteration',
        body: 'I designed and modelled a Gundam-inspired earbuds casing — concept, then full model in Maya, then textured in Substance Painter to reach the final look. On the web side, my teammate and I split responsibilities and worked collaboratively across the codebase. One feature I owned was the sign-in system, which fed into the simulated user experience of browsing and purchasing. We iterated on both the visual design and functionality to keep the site feeling cohesive.'
      },
      {
        title: 'Launch &amp; Reflection',
        body: 'As one of our first major projects, the launch was a valuable learning experience. The project was largely successful, but it also highlighted areas to improve in both technical execution and presentation. The biggest takeaway: I learned how to actually <em>showcase</em> a product. Before this, I had limited experience presenting my work in a way that communicates value to users, and Prestige helped me develop a stronger awareness of how design, interaction, and presentation come together.'
      }
    ],

    outcome: {
      intro: 'The project successfully demonstrated how 3D modelling and web development can be combined into one interactive product experience. It also became a strong foundation for understanding how to present and market digital products — reinforcing that even well-designed work needs effective presentation to reach its audience.',
      bullets: [
        'Developed my 3D modelling and texturing workflow',
        'Gained experience in UI design and web interaction',
        'Learned how to present and simulate a product-based experience'
      ]
    },

    tools:   ['Figma', 'Autodesk Maya', 'Substance Painter', 'Visual Studio', 'GitHub'],

    links: [
      { label: 'Watch Demo (YouTube)', href: 'https://youtu.be/T_xfB1DPH8Y' },
      { label: 'GitHub Repository',    href: 'https://github.com/Joel-wong-al/ID_Website' }
    ],

    credits: 'Developed as a team project.<br/>Designed &amp; built by Joel Wong and team.',

    gallery: [
      { src: 'assets/projects/prestige/gundam-front-textured.jpg', caption: 'Gundam earbuds casing · final textured render' },
      { src: 'assets/projects/prestige/gundam-three-quarter.jpg',  caption: 'Three-quarter view · form study' },
      { src: 'assets/projects/prestige/gundam-wireframe.jpg',      caption: 'Wireframe · Maya modelling pass' },
      { src: 'assets/projects/prestige/figma-prototype-board.jpg', caption: 'Figma · home, search & checkout flows' },
      { src: 'assets/projects/prestige/figma-flow-overview.jpg',   caption: 'Figma · full prototype board overview' },
      { src: 'assets/projects/prestige/website-homepage.jpg',      caption: 'Live website · homepage with quick links' }
    ]
  },

  '04': {
    fileId:   '// FILE-04',
    tag:      'Mission File · 2023',
    title:    'Project Delta',
    sub:      'A fourth case file — keep them varied to show range.',
    role:     'Designer & Researcher',
    timeline: '4 Months',
    type:     'Research',
    status:   'Published',
    banner:   { type: 'placeholder' },
    overview: ['Replace this with a fuller introduction to Project Delta.'],
    process:  [],
    outcome:  { intro: 'Wrap-up text goes here.', bullets: [] },
    tools:    ['D3.js', 'Python', 'Figma'],
    links:    [],
    credits:  'Designed &amp; built by Joel Wong.',
    gallery:  []
  }
};

/* ---------- POPULATE THE PAGE ---------- */
const params = new URLSearchParams(window.location.search);
const id = params.get('id') || '01';
const project = projects[id] || projects['01'];

// HERO + META
const setText = (sel, value) => {
  const el = document.getElementById(sel);
  if (el) el.textContent = value;
};
setText('topFileId',    project.fileId);
setText('heroTag',      project.tag);
setText('heroTitle',    project.title);
setText('heroSub',      project.sub);
setText('metaRole',     project.role);
setText('metaTimeline', project.timeline);
setText('metaType',     project.type);
setText('metaStatus',   project.status);
document.title = `${project.title} · Mission File`;

// BANNER — image, YouTube embed, or original placeholder
const bannerFrame = document.getElementById('bannerFrame');
if (bannerFrame && project.banner) {
  if (project.banner.type === 'video') {
    bannerFrame.classList.add('has-media', 'has-video');
    bannerFrame.innerHTML = `
      <iframe
        src="${project.banner.src}"
        title="${project.banner.title || project.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
      <div class="banner-corners">
        <span></span><span></span><span></span><span></span>
      </div>`;
  } else if (project.banner.type === 'image') {
    bannerFrame.classList.add('has-media');
    bannerFrame.innerHTML = `
      <img src="${project.banner.src}" alt="${project.banner.alt || project.title}" />
      <div class="banner-corners">
        <span></span><span></span><span></span><span></span>
      </div>`;
  }
  // 'placeholder' → leave the original CSS-rendered placeholder text
}

// OVERVIEW PARAGRAPHS
const overviewBody = document.getElementById('overviewBody');
if (overviewBody && project.overview && project.overview.length) {
  overviewBody.innerHTML = project.overview.map((p) => `<p>${p}</p>`).join('');
}

// PROCESS STEPS
const processList = document.getElementById('processList');
if (processList && project.process && project.process.length) {
  processList.innerHTML = project.process
    .map((step, i) => {
      const num = String(i + 1).padStart(2, '0');
      return `
        <div class="step" data-num="${num}">
          <h4>${step.title}</h4>
          <p>${step.body}</p>
        </div>`;
    })
    .join('');
}

// OUTCOME
const outcomeIntro = document.getElementById('outcomeIntro');
if (outcomeIntro && project.outcome && project.outcome.intro) {
  outcomeIntro.textContent = project.outcome.intro;
}
const outcomeList = document.getElementById('outcomeList');
if (outcomeList) {
  const bullets = (project.outcome && project.outcome.bullets) || [];
  if (bullets.length) {
    outcomeList.innerHTML = bullets.map((b) => `<li>${b}</li>`).join('');
  } else {
    outcomeList.style.display = 'none';
  }
}

// TOOLS
const toolsList = document.getElementById('toolsList');
if (toolsList && project.tools && project.tools.length) {
  toolsList.innerHTML = project.tools.map((t) => `<span>${t}</span>`).join('');
}

// LINKS — hide the side block entirely if there are no links
const linksList = document.getElementById('linksList');
const linksBlock = document.getElementById('linksBlock');
if (linksList) {
  if (project.links && project.links.length) {
    linksList.innerHTML = project.links
      .map((l) => `<li><a href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a></li>`)
      .join('');
  } else if (linksBlock) {
    linksBlock.style.display = 'none';
  }
}

// CREDITS
const creditsText = document.getElementById('creditsText');
if (creditsText && project.credits) {
  creditsText.innerHTML = project.credits;
}

// GALLERY — replace the placeholder frames if real images are provided
const galleryGrid = document.getElementById('galleryGrid');
const gallerySection = document.getElementById('gallerySection');
if (galleryGrid) {
  if (project.gallery && project.gallery.length) {
    galleryGrid.innerHTML = project.gallery
      .map(
        (g) => `
        <figure class="g-frame has-image">
          <img src="${g.src}" alt="${g.caption || ''}" loading="lazy" />
          ${g.caption ? `<figcaption>${g.caption}</figcaption>` : ''}
        </figure>`
      )
      .join('');
  }
  // If no gallery items, leave the original placeholder frames as-is
  // (or hide entirely by uncommenting the next line):
  // else if (gallerySection) gallerySection.style.display = 'none';
}
