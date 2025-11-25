// === Mobile menu toggle ===
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('active'));

// === Active nav highlight ===
function setActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current || (href === 'index.html' && current === '')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}
setActiveNav();

// === Smooth scroll for anchors ===
document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.includes('contact.html') || href.includes('about.html')) return;
    const id = href.split('#')[1];
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.classList.remove('active');
    }
  });
});

// === Reveal on scroll ===
const revealEls = document.querySelectorAll('.card, .project-card, .team-card, .hero-text, .split-image, .split-text');
revealEls.forEach(el => { el.style.opacity=0; el.style.transform='translateY(18px)'; el.style.transition='transform .8s ease, opacity .8s ease'; });
function revealOnScroll(){
  revealEls.forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 80){
      el.style.opacity=1;
      el.style.transform='translateY(0)';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// === Dynamic content for About, Services, Portfolio ===
const services = [
  {icon:"https://cdn-icons-png.flaticon.com/512/1006/1006771.png", title:"Web Design", desc:"Designing clean, modern interfaces and layouts for websites and apps."},
  {icon:"https://cdn-icons-png.flaticon.com/512/1006/1006777.png", title:"Front-End Development", desc:"Building responsive, accessible sites using semantic HTML, modern CSS and JS."},
  {icon:"https://cdn-icons-png.flaticon.com/512/2913/2913444.png", title:"UI Prototyping", desc:"Interactive prototypes and mockups to validate product flow and UI decisions."}
];
const portfolio = [
  {img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80", title:"Responsive Portfolio", desc:"Personal portfolio with responsive grid and animations."},
  {img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80", title:"Product Landing Page", desc:"Clean product showcase with call-to-action and features section."},
  {img:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80", title:"Interactive Web App", desc:"Frontend interactions and small app with form handling."}
];

const servicesContainer = document.getElementById('services-container');
const portfolioContainer = document.getElementById('portfolio-container');
const aboutContainer = document.getElementById('about-content');

servicesContainer?.innerHTML = services.map(s=>`
  <article class="card">
    <img class="card-icon" src="${s.icon}" alt="${s.title} icon">
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
  </article>`).join('');

portfolioContainer?.innerHTML = portfolio.map(p=>`
  <div class="project-card">
    <img src="${p.img}" alt="${p.title}">
    <div class="project-info">
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
    </div>
  </div>`).join('');

aboutContainer?.innerHTML = `
  <div class="split">
    <div class="split-image"><img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80" alt="Profile / About image"></div>
    <div class="split-text">
      <h2>About Me</h2>
      <p>I'm <strong>Malaika Zulqarnain</strong>, an aspiring front-end developer focusing on clean UI, accessibility and responsive design. I craft pixel-perfect websites and prototypes for clients and personal projects.</p>
      <a class="btn ghost" href="contact.html">Work with me</a>
    </div>
  </div>
  <hr class="spacer">
  <h3>Team / Collaborators</h3>
  <div class="team-grid">
    <div class="team-card">
      <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=600&q=80" alt="Team member">
      <h4>Malaika Zulqarnain</h4>
      <p>Front-End Developer</p>
    </div>
    <div class="team-card">
      <img src="https://images.unsplash.com/photo-1545996124-1f3a6c3b8a88?auto=format&fit=crop&w=600&q=80" alt="Team member 2">
      <h4>Collaborator</h4>
      <p>UI/UX Designer</p>
    </div>
  </div>
`;

// === Fetch API Quotes ===
const quotesContainer = document.getElementById('quotes-container');
if(quotesContainer){
  fetch('https://type.fit/api/quotes')
    .then(res=>res.json())
    .then(data=>{
      const randomQuotes = data.slice(0,3);
      quotesContainer.innerHTML = randomQuotes.map(q=>`
        <blockquote style="margin-bottom:12px; font-style:italic;">"${q.text}" - ${q.author||"Unknown"}</blockquote>
      `).join('');
    }).catch(err=>quotesContainer.textContent="Failed to load quotes.");
}

// === Contact form validation ===
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const status = document.getElementById('form-status');
    if(!name || !email || !message){
      status.textContent = 'Please complete all required fields.';
      status.style.color = '#b91c1c';
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRe.test(email)){
      status.textContent = 'Please enter a valid email address.';
      status.style.color = '#b91c1c';
      return;
    }
    status.textContent = 'Message sent successfully — thank you!';
    status.style.color = '#065f46';
    contactForm.reset();
  });
}
