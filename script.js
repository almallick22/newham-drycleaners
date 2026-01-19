// Add active class to current page link
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a');
  const currentPage = window.location.hash || '#home';
  
  // Set initial active link
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Handle all nav link clicks
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't prevent default for phone links
      if (this.getAttribute('href').startsWith('tel:')) {
        return; // Let phone link work normally
      }
      
      e.preventDefault();
      
      // Remove active class from all links
      links.forEach(l => l.classList.remove('active'));
      
      // Add active to clicked link
      this.classList.add('active');
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#home') {
        // Scroll to TOP of page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Update URL
        history.pushState(null, null, '#home');
      } else {
        // Scroll to specific section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, null, targetId);
        }
      }
    });
  });
  
  // ========== SERVICES ANIMATION ==========
  const services = [
    { name: "Dry Cleaning", icon: "👔", delay: 0 },
    { name: "Alteration & Repairs", icon: "✂️", delay: 200 },
    { name: "Laundry Service", icon: "🧺", delay: 400 },
    { name: "Service Wash", icon: "🧼", delay: 600 },
    { name: "Leather Products", icon: "🧥", delay: 800 },
    { name: "Curtains Cleaned", icon: "🪟", delay: 1000 }
  ];
  
  const servicesContainer = document.getElementById('services-container');
  
  if (servicesContainer) {
    // Clear container
    servicesContainer.innerHTML = '';
    
    // Create service cards
    services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 15px;">${service.icon}</div>
        <div>${service.name}</div>
      `;
      
      servicesContainer.appendChild(card);
      
      // Animate with delay
      setTimeout(() => {
        card.classList.add('visible');
      }, service.delay);
    });
  }
  
  // ========== UPDATE ACTIVE LINK ON SCROLL ==========
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;
    
    // Check which section is in view
    const homeSection = document.querySelector('#home');
    const servicesSection = document.querySelector('#services');
    const contactSection = document.querySelector('#contact');
    
    // Remove active from all
    links.forEach(link => link.classList.remove('active'));
    
    // Determine which section is active
    if (contactSection && scrollPosition >= contactSection.offsetTop) {
      document.querySelector('nav a[href="#contact"]').classList.add('active');
    } else if (servicesSection && scrollPosition >= servicesSection.offsetTop) {
      document.querySelector('nav a[href="#services"]').classList.add('active');
    } else {
      document.querySelector('nav a[href="#home"]').classList.add('active');
    }
  });
});