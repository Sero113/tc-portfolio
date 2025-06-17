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

document.addEventListener('DOMContentLoaded', function() {
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
        video.muted = true; // Ensure the video is muted
        video.playsInline = true; // Plays inline without fullscreen
        video.autoplay = true; // Enable autoplay

        // Try playing the video programmatically
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
            // Show mini-nav when section is in view
            miniNav.classList.add("active");
          } else {
            // Hide mini-nav when section is out of view
            miniNav.classList.remove("active");
          }
        });
      },
      {
        root: null, // Use viewport
        threshold: 0.2, // Trigger when 20% of the section is in view
      }
    );
  
    // Observe the target section
    observer.observe(section);
  });

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
      root: null, // Use viewport
      threshold: 0.2, // Trigger when 20% of the section is in view
      rootMargin: "-100px 0px 0px 0px", // Adjusts the top trigger point
    }
  );

  document.addEventListener("DOMContentLoaded", () => {
    // Select the sections to observe and the mini-nav element
    const sections = document.querySelectorAll('.uxui-work');
    const miniNav = document.querySelector('.mini-nav');
  
    if (sections && miniNav) {
      // Set up IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              miniNav.classList.add('active'); // Show mini-nav
            } else {
              miniNav.classList.remove('active'); // Hide mini-nav
            }
          });
        },
        {
          root: null, // Use the viewport as the root
          threshold: 0.0010, // Trigger when 10% of the section is visible
        }
      );
  
      // Observe each section
      sections.forEach((section) => observer.observe(section));
    } else {
      console.error("Unable to find the specified sections or mini-nav in the DOM.");
    }
  });

  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    
    // Keep the preloader visible for 5 seconds
    setTimeout(() => {
        preloader.style.opacity = "0"; // Start the fade-out
        preloader.style.pointerEvents = "none"; // Prevent interaction during the fade
    }, 1000); // 5 seconds delay
    
    // Remove the preloader completely after the fade-out
    setTimeout(() => {
        preloader.style.display = "none";
    }, 1200); // Additional 0.5s to match the fade-out duration
});

document.addEventListener("DOMContentLoaded", () => {
    const desktopVideo = document.getElementById("desktop-video");
    const mobileGif = document.getElementById("mobile-gif");

    // Check if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Hide the video and show the GIF
        desktopVideo.style.display = "none";
        mobileGif.style.display = "block";
    } else {
        // Hide the GIF and show the video
        desktopVideo.style.display = "block";
        mobileGif.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in-element");
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, index * 3000); // 3000ms = 3 seconds
  });
});

document.addEventListener("scroll", function () {
  const backButton = document.querySelector(".back-button");
  if (window.scrollY > 0) { // Adjust scroll threshold as needed
    backButton.classList.add("active");
  } else {
    backButton.classList.remove("active");
  }
});
  



document.addEventListener("DOMContentLoaded", function () {
  const currentLocation = window.location.pathname.split("/").pop(); // Get current file name
  const navLinks = document.querySelectorAll(".nav-link");
  let isActive = false; // Flag to check if any link is active

  navLinks.forEach(link => {
      const linkPath = link.getAttribute("href").split("/").pop();
      
      if (currentLocation === linkPath) {
          link.classList.add("active");
          isActive = true;
      } else {
          link.classList.remove("active");
      }
  });

  // If no link matches, remove all active states
  if (!isActive) {
      navLinks.forEach(link => link.classList.remove("active"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const desktopVideo = document.getElementById("desktop-video");
  const mobileGif = document.getElementById("mobile-gif");

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Show GIF, hide video
    desktopVideo.style.display = "none";
    mobileGif.style.display = "block";
  } else {
    // Show video, hide GIF
    desktopVideo.style.display = "block";
    mobileGif.style.display = "none";

    // Ensure autoplay on desktop
    desktopVideo.muted = true;
    desktopVideo.play().catch((error) => {
      console.warn("Autoplay might be blocked:", error);
    });
  }
});
