// Form Submission Handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Your message has been sent!");
  this.reset();
});

// Scroll Reveal Animation System
const revealOnScroll = (selector) => {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));
};

// Section Observers
const setupSectionObservers = () => {
  // GitHub Icon Animation
  revealOnScroll('.project-animate');

  // Contact Section Animation
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.contact-animate').forEach(el => contactObserver.observe(el));

  // Internships Section Animation
  const internshipTitle = document.querySelector(".internship-bg-text");
  if (internshipTitle) {
    const servicesObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          internshipTitle.classList.add("animate");
        }
      });
    }, { threshold: 0.4 });
    servicesObserver.observe(document.querySelector("#internships"));
  }

  // Education Section Animation
  const eduTitle = document.querySelector(".education-bg-text");
  if (eduTitle) {
    const eduObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          eduTitle.classList.add("animate");
        }
      });
    }, { threshold: 0.4 });
    eduObserver.observe(document.querySelector("#education"));
  }

  // Education Cards Animation
  const eduCards = document.querySelectorAll(".edu-card");
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.3 });
  eduCards.forEach(card => cardObserver.observe(card));
};

// Stats Counter Animation
const setupStatsCounter = () => {
  let statsObserved = false;
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsObserved) {
        statsObserved = true;
        animateCount("finishedCount", 4, 1000);
        animateCount("liveCount", 2, 1000);
        animateCount("internCount", 6, 1000);
        animateCount("pushupCount", 140, 1000);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('#stats');
  if (statsSection) statsObserver.observe(statsSection);
};

function animateCount(id, end, duration) {
  const element = document.getElementById(id);
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * end);
    element.textContent = current;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end;
    }
  };

  window.requestAnimationFrame(step);
}

// Skills Filter System
const setupSkillsFilter = () => {
  const filterButtons = document.querySelectorAll('.skill-filters button');
  const skillCards = document.querySelectorAll('.skill-card');

  function animateSkill(card) {
    const progress = card.querySelector('.progress');
    const percent = card.querySelector('.skill-circle-meter').dataset.percent;
    const dashOffset = 628 - (628 * percent) / 100;
    progress.style.strokeDashoffset = dashOffset;
  }

  function resetAllMeters() {
    document.querySelectorAll('.progress').forEach(bar => {
      bar.style.strokeDashoffset = 628;
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const category = button.dataset.filter;
      resetAllMeters();

      skillCards.forEach(card => {
        const match = category === 'all' || card.dataset.category === category;
        card.classList.toggle('hidden', !match);
        if (match) {
          setTimeout(() => animateSkill(card), 150);
        }
      });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillCards.forEach(card => {
          if (!card.classList.contains('hidden')) {
            animateSkill(card);
          }
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector('#skills'));
};

// Dynamic Text Rotator
const setupDynamicText = () => {
  const dynamicText = document.getElementById("changing-text");
  const roles = ["IoT Developer", "Java Enthusiast", "Software Engineer"];
  let index = 0;

  function updateText() {
    dynamicText.style.opacity = 0;

    setTimeout(() => {
      dynamicText.textContent = roles[index];
      dynamicText.style.opacity = 1;
      index = (index + 1) % roles.length;
    }, 200);

    setTimeout(updateText, 2500);
  }

  updateText();
};

// Network Canvas Animation
const setupNetworkCanvas = () => {
  const canvas = document.getElementById("network-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouse = { x: null, y: null };

  window.addEventListener("mousemove", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  const ICONS = [];
  const ICON_SOURCES = [
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f7.png",
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2601.png",
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f1.png",
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4bb.png",
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a3.png",
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f7.png"
  ];

  ICON_SOURCES.forEach(src => {
    const img = new Image();
    img.src = src;
    ICONS.push(img);
  });

  function Particle(x, y, dx, dy, size, icon) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.icon = icon;

    this.draw = () => {
      const dist = Math.hypot(mouse.x - this.x, mouse.y - this.y);
      if (dist > 100) {
        ctx.drawImage(this.icon, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      }
    };

    this.update = () => {
      if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
      if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };
  }

  let particlesArray = [];

  function init() {
    particlesArray = [];
    const num = 100;
    const iconSize = 7;
    
    for (let i = 0; i < num; i++) {
      const x = Math.random() * (canvas.width - iconSize * 2) + iconSize;
      const y = Math.random() * (canvas.height - iconSize * 2) + iconSize;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const icon = ICONS[Math.floor(Math.random() * ICONS.length)];
      particlesArray.push(new Particle(x, y, dx, dy, iconSize, icon));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();

      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.hypot(dx, dy);

        const mouseDist1 = Math.hypot(mouse.x - particlesArray[i].x, mouse.y - particlesArray[i].y);
        const mouseDist2 = Math.hypot(mouse.x - particlesArray[j].x, mouse.y - particlesArray[j].y);

        if (distance < 120 && mouseDist1 > 100 && mouseDist2 > 100) {
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  init();
  animate();
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  setupSectionObservers();
  setupStatsCounter();
  setupSkillsFilter();
  setupDynamicText();
  setupNetworkCanvas();
});