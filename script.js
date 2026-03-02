/* ==========================================
   Urban Taste Cloud Kitchen — JavaScript
   Handling Navigation, Scroll & Order Form
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Year for Footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Navigation & Scroll Logic ---
    const nav = document.querySelector('.nav');
    const navToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.getElementById('navCta');

    // --- Reveal Animation Observer ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Show top-right CTA button and add shadow to nav on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            navCta.style.display = 'inline-flex';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            navCta.style.display = 'none';
            nav.style.boxShadow = 'none';
        }
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dynamic Dish Selection Logic ---
    const addDishBtn = document.getElementById('addDishBtn');
    const dishSelectionContainer = document.getElementById('dishSelectionContainer');

    addDishBtn.addEventListener('click', () => {
        const dishRows = document.querySelectorAll('.dish-row');
        const firstRow = dishRows[0];

        // Clone the first row
        const newRow = firstRow.cloneNode(true);

        // Reset inputs
        newRow.querySelector('.foodItem').value = "";
        newRow.querySelector('.quantity').value = 1;

        // Setup remove button
        const removeBtn = newRow.querySelector('.btn-remove-dish');
        removeBtn.style.visibility = 'visible';
        removeBtn.addEventListener('click', () => {
            newRow.remove();
        });

        dishSelectionContainer.appendChild(newRow);
    });

    // --- Order Form Logic (Template Only) ---
    const orderForm = document.getElementById('orderForm');

    // Set min date to today
    const dateTimeInput = document.getElementById('deliveryDateTime');
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const localNow = now.toISOString().slice(0, 16);
    dateTimeInput.min = localNow;
    dateTimeInput.value = localNow;

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const address = document.getElementById('deliveryAddress').value.trim();
        const rawDateTime = document.getElementById('deliveryDateTime').value; // e.g., "2026-03-02T15:30"

        // Collect order items
        const dishRows = document.querySelectorAll('.dish-row');
        let orderItemsList = [];
        dishRows.forEach(row => {
            const item = row.querySelector('.foodItem').value;
            const quantity = row.querySelector('.quantity').value;
            if (item && quantity) {
                orderItemsList.push(`${quantity}x ${item}`);
            }
        });
        const orderItemsStr = orderItemsList.join('\n  ');

        // Template only behavior: show alert and reset
        alert("Thank you for your interest! This is a template site, so order booking is disabled.");

        // Optional: reset form after a short delay
        setTimeout(() => {
            orderForm.reset();
            dateTimeInput.value = localNow;
        }, 500);
    });
});

