// Module switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[data-module]');
    const modules = document.querySelectorAll('.module');
    const moduleLinks = document.querySelectorAll('.module-link[data-module]');

    // Function to switch modules
    function switchModule(targetModule) {
        // Hide all modules
        modules.forEach(module => {
            module.classList.remove('active');
        });

        // Show target module
        const targetModuleElement = document.getElementById(targetModule + '-module');
        if (targetModuleElement) {
            targetModuleElement.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-module') === targetModule) {
                link.classList.add('active');
            }
        });
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModule = this.getAttribute('data-module');
            switchModule(targetModule);
        });
    });

    // Handle module link clicks (from homepage cards)
    moduleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModule = this.getAttribute('data-module');
            switchModule(targetModule);
        });
    });

    // Bio sidebar navigation functionality
    const bioNavLinks = document.querySelectorAll('.bio-nav-link');
    const bioSections = document.querySelectorAll('#bio-module section[id]');

    // Smooth scrolling for bio navigation links
    bioNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate offset to account for navbar height
                const offsetTop = targetSection.offsetTop - 120;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active bio navigation link based on scroll position
    function highlightActiveBioLink() {
        let current = '';
        
        bioSections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        bioNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events to update active bio link
    window.addEventListener('scroll', highlightActiveBioLink);
    
    // Initial call to set active bio link on page load
    highlightActiveBioLink();

    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
    const toggleText = darkModeToggle.querySelector('.toggle-text');
    
    // Check for saved dark mode preference or default to light mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode on page load if it was previously enabled
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateToggleButton(true);
    }
    
    // Toggle dark mode when button is clicked
    darkModeToggle.addEventListener('click', function() {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        
        if (isCurrentlyDark) {
            // Switch to light mode
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
            updateToggleButton(false);
        } else {
            // Switch to dark mode
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
            updateToggleButton(true);
        }
    });
    
    // Update toggle button appearance based on current mode
    function updateToggleButton(isDark) {
        if (isDark) {
            toggleIcon.textContent = '☀️';
            toggleText.textContent = 'Light Mode';
        } else {
            toggleIcon.textContent = '🌙';
            toggleText.textContent = 'Dark Mode';
        }
    }
});
