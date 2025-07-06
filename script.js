document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");
  const mainContainer = document.querySelector(".main-container");

  // Simulate loading
  let counter = 0;
  const preloaderNumber = document.querySelector(".preloader-number");

  const interval = setInterval(() => {
    counter++;
    preloaderNumber.textContent = counter;

    if (counter >= 100) {
      clearInterval(interval);

      // Hide preloader and show main content
      setTimeout(() => {
        preloader.classList.add("hidden");
        mainContainer.classList.add("visible");

        // Remove preloader from DOM after animation completes
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      }, 500);
    }
  }, 20);

  // Navigation Menu Toggle
  const navMenu = document.querySelector(".nav-menu");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navMenu &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      e.target !== navToggle
    ) {
      navMenu.classList.remove("active");
    }
  });

  // Close menu when link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
    });
  });

  // Change nav background on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navToggle.querySelectorAll("span").forEach((span) => {
        span.style.backgroundColor = "#333";
      });
    } else {
      navToggle.querySelectorAll("span").forEach((span) => {
        span.style.backgroundColor = "#fff";
      });
    }
  });

  // Calendar is static, no JavaScript needed for it

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll Down Button
  const scrollDownBtn = document.querySelector(".scroll-down");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", function () {
      const welcomeSection = document.getElementById("welcome");
      if (welcomeSection) {
        window.scrollTo({
          top: welcomeSection.offsetTop,
          behavior: "smooth",
        });
      }
    });
  }

  // RSVP Form Submission
  // const rsvpForm = document.getElementById("rsvp-form");
  // if (rsvpForm) {
  //   rsvpForm.addEventListener("submit", function (e) {
  //     e.preventDefault();

  //     // Get form data
  //     const formData = {
  //       name: document.getElementById("name").value,
  //       email: document.getElementById("email").value,
  //       attendance: document.getElementById("attendance").value,
  //       message: document.getElementById("message").value,
  //     };

  //     // Here you would typically send the data to a server
  //     // For this example, we'll just show a success message

  //     // Clear form
  //     rsvpForm.reset();

  //     // Show success message
  //     const formGroup = document.createElement("div");
  //     formGroup.className = "form-group";
  //     formGroup.innerHTML =
  //       '<p style="color: #d4b78f; font-weight: 500;">Thank you for your response!</p>';

  //     rsvpForm.innerHTML = "";
  //     rsvpForm.appendChild(formGroup);

  //     // Log form data to console (for demonstration)
  //     console.log("Form submitted:", formData);
  //   });
  // }

  document
    .getElementById("rsvp-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;

      const submitButton = form.querySelector('button[type="submit"]');

      // Отключаем кнопку и форму
      submitButton.disabled = true;

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();

      const attendanceValue =
        document.querySelector('input[name="attendance"]:checked')?.value ||
        "Не выбрано";
      const attendanceLabel =
        {
          yes: "Да, я приду",
          "yes-plus": "Да, я приду со второй половинкой",
          no: "Нет, я не смогу прийти",
        }[attendanceValue] || "Не выбрано";

      const drinkElements = document.querySelectorAll(
        'input[name="drinks"]:checked'
      );
      const drinkLabels = {
        wine: "Вино",
        champagne: "Шампанское",
        whiskey: "Виски",
        cognac: "Коньяк",
        nonalcoholic: "Безалкогольные напитки",
      };
      const drinks =
        Array.from(drinkElements)
          .map((input) => drinkLabels[input.value] || input.value)
          .join(", ") || "Не выбрано";

      const message = `
📩 Новая заявка:
👤 Имя: ${name}
📞 Телефон: ${phone}
✅ Присутствие: ${attendanceLabel}
🍷 Напитки: ${drinks}
    `;

      const TOKEN = "8190811426:AAEvOiOTYPOzIDmWzstPCAnLo_y5gDFJkRw"; // ← Вставь сюда токен
      const CHAT_ID_DANIEL = "429385818"; // ← Вставь сюда chat_id
      const CHAT_ID_DARIA = "772094488"; // ← Вставь сюда chat_id

      try {
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID_DANIEL,
            text: message.trim(),
          }),
        });

        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID_DARIA,
            text: message.trim(),
          }),
        });
      } catch (err) {
        console.error("Ошибка отправки в Telegram:", err);
      }

      submitButton.disabled = false;
      form.reset();
    });

  // Reveal animations on scroll
  function revealOnScroll() {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("revealed");
      }
    });

    // Show/hide back to top button
    const backToTopBtn = document.querySelector(".back-to-top");
    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }

  // Initial check on page load
  revealOnScroll();

  // Check on scroll
  window.addEventListener("scroll", revealOnScroll);

  // Back to top button functionality
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
