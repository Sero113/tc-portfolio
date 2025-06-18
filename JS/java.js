const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".autoplay-video");

  videos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;

    video.play().catch((error) => {
      console.error("Autoplay failed:", error);
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('.mini-nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.mini-nav a');

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".mainwrapper-2");
  const miniNav = document.querySelector(".mini-nav");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          miniNav.classList.add("active");
        } else {
          miniNav.classList.remove("active");
        }
      });
    },
    {
      root: null,
      threshold: 0.2,
    }
  );

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.uxui-work');
  const miniNav = document.querySelector('.mini-nav');

  if (sections && miniNav) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            miniNav.classList.add('active');
          } else {
            miniNav.classList.remove('active');
          }
        });
      },
      {
        root: null,
        threshold: 0.0010,
      }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    console.error("Unable to find the specified sections or mini-nav in the DOM.");
  }
});

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
  }, 1000);

  setTimeout(() => {
    preloader.style.display = "none";
  }, 1200);
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in-element");
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, index * 3000);
  });
});

document.addEventListener("scroll", function () {
  const backButton = document.querySelector(".back-button");
  if (window.scrollY > 0) {
    backButton.classList.add("active");
  } else {
    backButton.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const currentLocation = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");
  let isActive = false;

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();

    if (currentLocation === linkPath) {
      link.classList.add("active");
      isActive = true;
    } else {
      link.classList.remove("active");
    }
  });

  if (!isActive) {
    navLinks.forEach(link => link.classList.remove("active"));
  }
});
