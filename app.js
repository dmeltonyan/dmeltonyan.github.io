(function () {
  "use strict";

  var D = window.PORTFOLIO;
  D.projects = D.projects.filter(function (p) { return p.hidden !== true; });
  var S = D.site;
  var home = document.getElementById("home");
  var caseView = document.getElementById("case-study");

  /* ---------- Helpers ---------- */
  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function has(value) {
    return value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0) && value !== "";
  }
  function tags(list, label) {
    if (!has(list)) return "";
    return '<ul class="tags" aria-label="' + esc(label || "Technologies") + '">' +
      list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }
  function bullets(list, cls) {
    if (!has(list)) return "";
    return '<ul class="' + cls + '">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }
  function external(href) { return /^https?:\/\//.test(href) ? ' target="_blank" rel="noopener"' : ""; }

  /* ---------- Analytics hooks ----------
   * Every tracked element has data-track="event_name". Nothing is sent anywhere by default.
   * To connect a provider later, define window.portfolioAnalytics = function (name, props) { ... }
   * before app.js loads, or listen for the "portfolio:track" event on window.
   */
  function track(name, props) {
    var detail = { name: name, props: props || {} };
    try { window.dispatchEvent(new CustomEvent("portfolio:track", { detail: detail })); } catch (e) {}
    if (typeof window.portfolioAnalytics === "function") {
      try { window.portfolioAnalytics(name, detail.props); } catch (e) {}
    }
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    var props = {};
    if (el.dataset.trackSource) props.source = el.dataset.trackSource;
    if (el.dataset.trackProject) props.project = el.dataset.trackProject;
    track(el.dataset.track, props);
  });

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ---------- Copy email ---------- */
  function copyEmail(source) {
    var email = S.email;
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = email; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      toast(ok ? "Email copied" : email);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () { toast("Email copied"); }, fallback);
    } else {
      fallback();
    }
    track("email_copy", { source: source });
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy-email]");
    if (btn) copyEmail(btn.dataset.copyEmail);
  });

  /* ---------- Home sections ---------- */
  function heroHTML() {
    var status = S.status.map(function (s) {
      return "<li>" + (s.live ? '<span class="dot" aria-hidden="true"></span>' : "") + esc(s.text) + "</li>";
    }).join("");
    return '' +
      '<section class="hero" id="top" aria-labelledby="hero-name">' +
        '<div class="container">' +
          '<h1 id="hero-name">' + esc(S.name) + '</h1>' +
          '<p class="hero-title">' + esc(S.title) + '<span class="sep" aria-hidden="true">|</span><span class="spec">' + esc(S.specialty) + '</span></p>' +
          '<p class="hero-intro">' + esc(S.intro) + '</p>' +
          '<ul class="status" aria-label="Availability">' + status + '</ul>' +
          '<div class="cta">' +
            '<a class="btn btn-primary" href="' + esc(S.links.resume) + '" target="_blank" rel="noopener" data-track="resume_view" data-track-source="hero">View Resume</a>' +
            '<a class="btn" href="mailto:' + esc(S.email) + '" data-track="email_click" data-track-source="hero">Email Me</a>' +
            '<a class="btn" href="' + esc(S.links.linkedin) + '" target="_blank" rel="noopener" data-track="linkedin_click" data-track-source="hero">LinkedIn</a>' +
            '<a class="btn" href="' + esc(S.links.github) + '" target="_blank" rel="noopener" data-track="github_click" data-track-source="hero">GitHub</a>' +
            '<a class="text-link" href="' + esc(S.links.resume) + '" download="David_Meltonyan_Resume.pdf" data-track="resume_download" data-track-source="hero">Download resume (PDF)</a>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  function scanHTML() {
    var focus = D.focusAreas.map(function (f) {
      return "<li><h3>" + esc(f.name) + "</h3><p>" + esc(f.detail) + "</p></li>";
    }).join("");
    var hl = D.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
    return '' +
      '<section class="section reveal" id="overview" aria-labelledby="overview-h">' +
        '<div class="container">' +
          '<div class="section-head"><h2 id="overview-h">At a glance</h2></div>' +
          '<div class="scan">' +
            '<ul class="focus">' + focus + '</ul>' +
            '<ul class="highlights" aria-label="Highlights">' + hl + '</ul>' +
          '</div>' +
          '<div class="tech"><h3>Primary technologies</h3>' + tags(D.technologies, "Primary technologies") + '</div>' +
        '</div>' +
      '</section>';
  }

  function experienceHTML() {
    var featured = D.experience.filter(function (x) { return x.featured; });
    var others = D.experience.filter(function (x) { return !x.featured; });
    var cards = featured.map(function (x) {
      return '' +
        '<li class="job">' +
          '<div class="job-head">' +
            '<h3>' + esc(x.role) + ' <span class="job-company">at ' + esc(x.company) + '</span></h3>' +
            '<span class="job-dates">' + esc(x.dates) + '</span>' +
          '</div>' +
          (has(x.problem) ? '<p class="job-problem"><span class="lead">Problem.</span> ' + esc(x.problem) + '</p>' : "") +
          bullets(x.built, "job-built") +
          tags(x.tech, x.company + " technologies") +
          (has(x.impact) ? '<p class="impact"><span class="lead">Impact.</span> ' + esc(x.impact) + '</p>' : "") +
        '</li>';
    }).join("");
    var minor = others.map(function (x) {
      return '' +
        '<div class="job-minor">' +
          '<h3>' + esc(x.role) + ' <span class="job-company">at ' + esc(x.company) + '</span></h3>' +
          '<span class="job-dates">' + esc(x.dates) + '</span>' +
          (has(x.summary) ? "<p>" + esc(x.summary) + "</p>" : "") +
        '</div>';
    }).join("");
    return '' +
      '<section class="section reveal" id="experience" aria-labelledby="experience-h">' +
        '<div class="container">' +
          '<div class="section-head"><h2 id="experience-h">Experience</h2></div>' +
          '<ul class="jobs">' + cards + '</ul>' +
          minor +
        '</div>' +
      '</section>';
  }

  function projectActions(p) {
    var out = [];
    if (p.caseStudy) out.push('<a class="btn btn-primary btn-small" href="#project/' + esc(p.id) + '" data-track="case_study_open" data-track-project="' + esc(p.id) + '">Read case study</a>');
    if (has(p.links && p.links.code)) out.push('<a class="btn btn-small" href="' + esc(p.links.code) + '"' + external(p.links.code) + ' data-track="project_code_click" data-track-project="' + esc(p.id) + '">View Code</a>');
    if (has(p.links && p.links.demo)) out.push('<a class="btn btn-small" href="' + esc(p.links.demo) + '"' + external(p.links.demo) + ' data-track="project_demo_click" data-track-project="' + esc(p.id) + '">Live Demo</a>');
    return out.length ? '<div class="project-actions">' + out.join("") + "</div>" : "";
  }

  function projectsHTML() {
    var featured = D.projects.filter(function (p) { return p.featured; }).map(function (p) {
      var side = '';
      if (has(p.challenge)) side += '<div class="side-block"><h4>Engineering challenge</h4><p>' + esc(p.challenge) + '</p></div>';
      side += '<div class="side-block"><h4>Built with</h4>' + tags(p.tech, p.name + " technologies") + '</div>';
      return '' +
        '<article class="project project-featured" aria-labelledby="p-' + esc(p.id) + '">' +
          '<div class="project-main">' +
            '<h3 id="p-' + esc(p.id) + '">' + esc(p.name) + '</h3>' +
            '<p class="project-tagline">' + esc(p.tagline) + '</p>' +
            '<p class="project-summary">' + esc(p.summary) + '</p>' +
            bullets(p.bullets, "project-bullets") +
            projectActions(p) +
          '</div>' +
          '<div class="project-side">' + side + '</div>' +
        '</article>';
    }).join("");

    var minor = D.projects.filter(function (p) { return !p.featured; }).map(function (p) {
      var scale = p.showBiasScale
        ? '<div class="bias-scale" aria-hidden="true"><div class="bias-bar"></div><div class="bias-labels"><span>-10</span><span>0</span><span>+10</span></div></div>'
        : "";
      return '' +
        '<article class="project project-minor" aria-labelledby="p-' + esc(p.id) + '">' +
          '<h3 id="p-' + esc(p.id) + '">' + esc(p.name) + '</h3>' +
          '<p class="project-tagline">' + esc(p.tagline) + '</p>' +
          '<p class="project-summary">' + esc(p.summary) + '</p>' +
          scale +
          tags(p.tech, p.name + " technologies") +
          projectActions(p) +
        '</article>';
    }).join("");

    return '' +
      '<section class="section reveal" id="projects" aria-labelledby="projects-h">' +
        '<div class="container">' +
          '<div class="section-head"><h2 id="projects-h">Projects</h2></div>' +
          '<div class="featured">' + featured + '</div>' +
          (minor ? '<div class="minor-grid">' + minor + '</div>' : "") +
        '</div>' +
      '</section>';
  }

  function educationHTML() {
    var items = D.education.map(function (e) {
      return '' +
        '<li>' +
          '<h3>' + esc(e.school) + (e.upcoming ? ' <span class="pill">Upcoming</span>' : "") + '</h3>' +
          '<p>' + esc(e.degree) + '</p>' +
          '<p class="dates">' + esc(e.dates) + '</p>' +
        '</li>';
    }).join("");
    return '' +
      '<section class="section reveal" id="education" aria-labelledby="education-h">' +
        '<div class="container">' +
          '<div class="section-head"><h2 id="education-h">Education</h2></div>' +
          '<ul class="edu">' + items + '</ul>' +
        '</div>' +
      '</section>';
  }

  function aboutHTML() {
    return '' +
      '<section class="section reveal" id="about" aria-labelledby="about-h">' +
        '<div class="container">' +
          '<div class="section-head"><h2 id="about-h">About</h2></div>' +
          '<div class="about-body">' + D.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
        '</div>' +
      '</section>';
  }

  function contactHTML() {
    return '' +
      '<section class="section reveal" id="contact" aria-labelledby="contact-h">' +
        '<div class="container">' +
          '<div class="contact-card">' +
            '<h2 id="contact-h">' + esc(D.contact.heading) + '</h2>' +
            '<p>' + esc(D.contact.text) + '</p>' +
            '<div class="email-row">' +
              '<a href="mailto:' + esc(S.email) + '" data-track="email_click" data-track-source="contact">' + esc(S.email) + '</a>' +
              '<button class="btn btn-small" type="button" data-copy-email="contact">Copy</button>' +
            '</div>' +
            '<div class="contact-links">' +
              '<a class="btn" href="' + esc(S.links.linkedin) + '" target="_blank" rel="noopener" data-track="linkedin_click" data-track-source="contact">LinkedIn</a>' +
              '<a class="btn" href="' + esc(S.links.github) + '" target="_blank" rel="noopener" data-track="github_click" data-track-source="contact">GitHub</a>' +
              '<a class="btn" href="' + esc(S.links.resume) + '" target="_blank" rel="noopener" data-track="resume_view" data-track-source="contact">View Resume</a>' +
              '<a class="btn" href="' + esc(S.links.resume) + '" download="David_Meltonyan_Resume.pdf" data-track="resume_download" data-track-source="contact">Download Resume</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  function renderHome() {
    home.innerHTML = heroHTML() + scanHTML() + experienceHTML() + projectsHTML() + educationHTML() + aboutHTML() + contactHTML();
    setupReveal();
    setupActiveNav();
  }

  /* ---------- Case study ---------- */
  function renderCase(p) {
    var c = p.caseStudy;
    var sections = [];
    if (has(c.problem)) sections.push(["problem", "Problem", "<p>" + esc(c.problem) + "</p>"]);
    if (has(c.architecture)) {
      var steps = c.architecture.map(function (s) {
        return "<li><strong>" + esc(s.label) + "</strong>" + (has(s.note) ? "<span>" + esc(s.note) + "</span>" : "") + "</li>";
      }).join("");
      sections.push(["architecture", "Architecture", '<ol class="flow" aria-label="Request flow">' + steps + '</ol><p class="flow-caption">Each request moves through these stages in order.</p>']);
    }
    if (has(c.built)) sections.push(["built", "What I built", bullets(c.built, "cs-list")]);
    if (has(c.decisions)) {
      var dec = c.decisions.map(function (d) { return "<li><h3>" + esc(d.title) + "</h3><p>" + esc(d.text) + "</p></li>"; }).join("");
      sections.push(["decisions", "Technical decisions", '<ul class="decisions">' + dec + "</ul>"]);
    }
    if (has(c.challenges)) sections.push(["challenges", "Challenges", bullets(c.challenges, "cs-list")]);
    if (has(c.results)) sections.push(["results", "Results", "<p>" + esc(c.results) + "</p>"]);
    if (has(c.improve)) sections.push(["improve", "What I would improve", bullets(c.improve, "cs-list")]);

    var toc = sections.map(function (s) { return '<li><a href="#project/' + esc(p.id) + '/' + s[0] + '">' + s[1] + "</a></li>"; }).join("");
    var body = sections.map(function (s) {
      return '<section class="cs-section" id="cs-' + s[0] + '" aria-labelledby="cs-' + s[0] + '-h"><h2 id="cs-' + s[0] + '-h">' + s[1] + "</h2>" + s[2] + "</section>";
    }).join("");

    var links = [];
    if (has(p.links.code)) links.push('<a class="btn btn-small" href="' + esc(p.links.code) + '"' + external(p.links.code) + ' data-track="project_code_click" data-track-project="' + esc(p.id) + '" data-track-source="case_study">View Code</a>');
    if (has(p.links.demo)) links.push('<a class="btn btn-small" href="' + esc(p.links.demo) + '"' + external(p.links.demo) + ' data-track="project_demo_click" data-track-project="' + esc(p.id) + '" data-track-source="case_study">Live Demo</a>');

    caseView.innerHTML = '' +
      '<article class="cs container" aria-labelledby="cs-title">' +
        '<a class="cs-back" href="#projects">Back to all projects</a>' +
        '<h1 id="cs-title" tabindex="-1">' + esc(p.name) + '</h1>' +
        '<p class="cs-tagline">' + esc(p.tagline) + '</p>' +
        tags(p.tech, p.name + " technologies") +
        (links.length ? '<div class="project-actions">' + links.join("") + '</div>' : "") +
        '<div class="cs-body">' +
          '<ul class="cs-toc" aria-label="On this page">' + toc + '</ul>' +
          '<div>' + body + '</div>' +
        '</div>' +
      '</article>';
    document.title = p.name + " case study | David Meltonyan";
  }

  /* ---------- Router ---------- */
  var homeTitle = document.title;
  function route() {
    var m = location.hash.match(/^#project\/([\w-]+)(?:\/([\w-]+))?$/);
    var project = m && D.projects.filter(function (p) { return p.id === m[1] && p.caseStudy; })[0];
    if (project) {
      var already = !caseView.hidden && caseView.dataset.id === project.id;
      if (!already) {
        renderCase(project);
        caseView.dataset.id = project.id;
        home.hidden = true;
        caseView.hidden = false;
        track("case_study_view", { project: project.id });
      }
      if (m[2]) {
        var target = document.getElementById("cs-" + m[2]);
        if (target) target.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
        var h = document.getElementById("cs-title");
        if (h) h.focus({ preventScroll: true });
      }
      return;
    }
    if (!caseView.hidden) {
      caseView.hidden = true;
      caseView.dataset.id = "";
      home.hidden = false;
      document.title = homeTitle;
      var id = location.hash.slice(1);
      var el = id && document.getElementById(id);
      if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------- Subtle reveal and active nav ---------- */
  function setupReveal() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("reveal-ready");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }
  function setupActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll(".site-nav a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Init ---------- */
  document.getElementById("last-updated").textContent = "Last updated " + S.lastUpdated;
  renderHome();
  route();
})();
