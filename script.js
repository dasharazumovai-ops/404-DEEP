// DOZARC site scripts

// Mobile menu toggle
(function () {
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove("mobile-menu--open");
    toggle.classList.remove("header__menu-toggle--open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  function openMenu() {
    menu.classList.add("mobile-menu--open");
    toggle.classList.add("header__menu-toggle--open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }

  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.contains("mobile-menu--open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the menu after tapping a link
  menu.querySelectorAll(".mobile-menu__link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();


// Video: open enlarged on click; on phones also go fullscreen
(function () {
  var openBtn = document.getElementById("videoOpen");
  var modal = document.getElementById("videoModal");
  var closeBtn = document.getElementById("videoClose");
  var video = document.getElementById("videoPlayer");
  if (!openBtn || !modal || !video) return;

  var isTouch = window.matchMedia("(pointer: coarse)").matches;

  function openVideo() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
    if (isTouch) {
      if (video.requestFullscreen) {
        video.requestFullscreen().catch(function () {});
      } else if (video.webkitEnterFullscreen) {
        try { video.webkitEnterFullscreen(); } catch (e) {}
      }
    }
    closeBtn.focus();
  }

  function closeVideo() {
    video.pause();
    modal.hidden = true;
    document.body.style.overflow = "";
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
    openBtn.focus();
  }

  openBtn.addEventListener("click", openVideo);
  closeBtn.addEventListener("click", closeVideo);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeVideo();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeVideo();
  });
  // leaving fullscreen on a phone also closes the player
  document.addEventListener("fullscreenchange", function () {
    if (isTouch && !document.fullscreenElement && !modal.hidden) closeVideo();
  });
  video.addEventListener("webkitendfullscreen", function () {
    if (!modal.hidden) closeVideo();
  });
})();
