function startTypingEffect() {
    const textArray = ["Freelancer", "Designer", "Developer", "Photographer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    const element = document.getElementById("animated-text");

    function typeEffect() {
        let currentText = textArray[textIndex];
        element.textContent = isDeleting
            ? currentText.substring(0, charIndex--)
            : currentText.substring(0, charIndex++);

        if (!isDeleting && charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
        }
        else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(typeEffect, typingSpeed);
        }
        else {
            const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeEffect, currentSpeed);
        }
    }

    typeEffect();
}

function enableHoverDropdowns() {
    document.querySelectorAll('.nav-item.dropdown, .dropdown.dropend').forEach(function (dropdown) {
        const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        const menu = dropdown.querySelector('.dropdown-menu');

        function showDropdown() {
            const dropdownInstance = new bootstrap.Dropdown(toggle);
            dropdownInstance.show();
            menu.classList.add('showing');
        }

        function hideDropdown(e) {
            if (!dropdown.contains(e.relatedTarget)) {
                const dropdownInstance = new bootstrap.Dropdown(toggle);
                dropdownInstance.hide();
                menu.classList.remove('showing');
            }
        }

        toggle.addEventListener('mouseenter', showDropdown);
        menu.addEventListener('mouseenter', showDropdown);
        dropdown.addEventListener('mouseleave', hideDropdown);
    });
}

function animateCount(elementID, target, duration) {
    const element = document.getElementById(elementID);
    const targetNumber = parseInt(target, 10);
    const increment = targetNumber / (duration / 16);
    let currentNumber = 0;

    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            element.innerText = targetNumber;
            clearInterval(counter);
        } else {
            element.innerText = Math.floor(currentNumber);
        }
    }, 16);
}

let counterAnimated = false;

function counterWhenArrived(id) {
    if (counterAnimated) return;

    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();
    const scrollPosition = window.scrollY + window.innerHeight;
    const elementPosition = rect.top + window.scrollY;

    if (scrollPosition >= elementPosition) {
        animateCount("works-completed", 450, 2000);
        animateCount("y-o-e", 25, 2000);
        animateCount("total-clients", 550, 2000);
        animateCount("awards-won", 48, 2000);
        counterAnimated = true;
    }
}

function startAll() {
    enableHoverDropdowns();
    startTypingEffect();
}


window.addEventListener("scroll", () => counterWhenArrived("counter"));
window.onload(startAll());