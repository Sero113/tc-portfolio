(() => {
  const SITE_GATE_PASSWORD = "7899286";
  const GATE_SESSION_KEY = "tc-portfolio-unlocked";
  const INDEX_PAGE = "index.html";

  const isUnlocked = sessionStorage.getItem(GATE_SESSION_KEY) === "true";
  window.__tcSiteUnlocked = isUnlocked;

  const runPreloaderSequence = (onComplete) => {
    const preloader = document.getElementById("preloader");
    const preloaderVideo = preloader?.querySelector("video");

    if (!preloader) {
      if (typeof onComplete === "function") {
        onComplete();
      }
      return;
    }

    preloader.style.display = "flex";
    preloader.style.opacity = "1";
    preloader.style.pointerEvents = "auto";

    if (preloaderVideo) {
      preloaderVideo.currentTime = 0;
      const playPromise = preloaderVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }

    window.setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
    }, 2000);

    window.setTimeout(() => {
      preloader.style.display = "none";
      if (typeof onComplete === "function") {
        onComplete();
      }
    }, 2200);
  };

  const kickstartVideos = () => {
    const videos = document.querySelectorAll("video[autoplay], .autoplay-video, .homevid, .preloader-video");
    videos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    });
  };

  const pauseVideosWhileLocked = () => {
    document.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("autoplay");
    });
  };

  window.__tcRunPreloaderSequence = runPreloaderSequence;
  window.__tcKickstartVideos = kickstartVideos;

  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || INDEX_PAGE;
  const isIndexPage = currentPage === INDEX_PAGE;

  document.addEventListener("DOMContentLoaded", () => {
    if (window.__tcSiteUnlocked) {
      return;
    }

    if (!isIndexPage) {
      const nextTarget = `${INDEX_PAGE}?next=${encodeURIComponent(currentPage + window.location.search + window.location.hash)}`;
      window.location.replace(nextTarget);
      return;
    }

    const nextPage = new URLSearchParams(window.location.search).get("next");
    document.body.classList.add("site-locked");
    pauseVideosWhileLocked();

    const gate = document.createElement("div");
    gate.className = "site-gate";
    gate.innerHTML = `
      <div class="site-gate-backdrop"></div>
      <form class="site-gate-card" autocomplete="off">
        <p class="site-gate-kicker">Private Access</p>
        <h1>Taylor Camacho's Portfolio</h1>
        <p class="site-gate-note">Reach out directly to receive the password.</p>
        <p>Enter the password to continue.</p>
        <label class="site-gate-label" for="site-password">Password</label>
        <div class="site-gate-row">
          <input id="site-password" class="site-gate-input" type="password" name="password" autocomplete="current-password" />
          <button class="site-gate-button" type="submit">Enter</button>
        </div>
        <p class="site-gate-error" aria-live="polite"></p>
      </form>
    `;

    document.body.appendChild(gate);

    const form = gate.querySelector(".site-gate-card");
    const input = gate.querySelector(".site-gate-input");
    const error = gate.querySelector(".site-gate-error");

    if (!form || !input || !error) {
      return;
    }

    input.focus();

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (input.value === SITE_GATE_PASSWORD) {
        sessionStorage.setItem(GATE_SESSION_KEY, "true");
        window.__tcSiteUnlocked = true;
        document.body.classList.remove("site-locked");
        document.body.classList.add("site-authenticating");
        gate.remove();

        if (nextPage && nextPage !== INDEX_PAGE) {
          window.location.replace(nextPage);
          return;
        }

        runPreloaderSequence(() => {
          document.body.classList.remove("site-authenticating");
          kickstartVideos();
          window.history.replaceState({}, document.title, INDEX_PAGE);
        });
        return;
      }

      error.textContent = "Incorrect password.";
      input.select();
    });
  });
})();

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);
}

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

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let clock = navbar.querySelector(".nav-clock");
  if (!clock) {
    clock = document.createElement("span");
    clock.className = "nav-clock";
    clock.setAttribute("aria-live", "polite");
    navbar.appendChild(clock);
  }

  const updateClock = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    if (clock) {
      clock.innerHTML = `Richmond Hill <span class="nav-clock-sep">+</span> ${time}`;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
});

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
  if (!window.__tcSiteUnlocked) {
    return;
  }

  const videos = document.querySelectorAll("video[autoplay], .autoplay-video, .homevid, .preloader-video");
  const tryPlay = (video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  videos.forEach((video) => {
    tryPlay(video);
    video.addEventListener("loadedmetadata", () => tryPlay(video), { once: true });
    video.addEventListener("canplay", () => tryPlay(video), { once: true });
  });

  const kickstartPlayback = () => videos.forEach((video) => tryPlay(video));
  window.addEventListener("pageshow", kickstartPlayback);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      kickstartPlayback();
    }
  });
  document.addEventListener("touchstart", kickstartPlayback, { once: true, passive: true });
  document.addEventListener("click", kickstartPlayback, { once: true });
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
  if (!window.__tcSiteUnlocked) {
    return;
  }

  if (typeof window.__tcRunPreloaderSequence === "function") {
    window.__tcRunPreloaderSequence();
  }
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

// Contact Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openModal");
  const modal = document.querySelector(".contact-modal");
  const closeBtn = document.querySelector(".close-modal");

  if (!openBtn || !modal || !closeBtn) {
    return;
  }

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    // Close when clicking outside modal content
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});
