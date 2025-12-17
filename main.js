// Tự động tải ảnh vào gallery intro
document.addEventListener('DOMContentLoaded', function() {
  // Danh sách ảnh - bạn có thể thêm ảnh của nhóm vào đây
  const images = [
    'cuilua2025.jpg',
    'cuilua2025.jpg', // Thêm các ảnh khác vào đây
    'cuilua2025.jpg',
    'cuilua2025.jpg',
    'cuilua2025.jpg',
    'cuilua2025.jpg',
    'cuilua2025.jpg',
    'cuilua2025.jpg'
  ];

  // Tạo gallery items động
  const tracks = document.querySelectorAll('.intro__gallery-track');
  tracks.forEach(track => {
    // Xóa các item mẫu
    track.innerHTML = '';
    
    // Tạo items từ danh sách ảnh (lặp lại để tạo hiệu ứng seamless)
    const itemsToCreate = images.concat(images); // Lặp lại để seamless scroll
    
    itemsToCreate.forEach((imgSrc, index) => {
      const item = document.createElement('div');
      item.className = 'intro__gallery-item';
      item.innerHTML = `<img src="${imgSrc}" alt="Kỷ niệm ${index + 1}" loading="lazy">`;
      track.appendChild(item);
    });
  });

  // Intersection Observer để hiện/ẩn khi scroll với smooth transition
  const introSection = document.querySelector('.intro');
  if (introSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Lướt xuống - hiện với delay nhẹ để mượt hơn
          requestAnimationFrame(() => {
            entry.target.classList.add('intro--visible');
          });
        } else {
          // Lướt lên - ẩn
          requestAnimationFrame(() => {
            entry.target.classList.remove('intro--visible');
          });
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(introSection);
  }

  // Topbar scroll effect - thay đổi style khi scroll
  const topbar = document.querySelector('.topbar');
  let lastScroll = 0;
  let ticking = false;

  function updateTopbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
    
    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateTopbar);
      ticking = true;
    }
  }, { passive: true });

  // Smooth scroll cho các link navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const topbarHeight = topbar ? topbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - topbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect nhẹ cho hero content
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    let heroTicking = false;
    
    function updateHeroParallax() {
      const scrollY = window.scrollY;
      const heroSection = document.querySelector('.hero');
      
      if (heroSection && scrollY < heroSection.offsetHeight) {
        const parallaxValue = scrollY * 0.3;
        heroContent.style.transform = `translateY(${parallaxValue}px)`;
      }
      
      heroTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!heroTicking) {
        window.requestAnimationFrame(updateHeroParallax);
        heroTicking = true;
      }
    }, { passive: true });
  }

  // Preload images để tránh layout shift
  const imageUrls = [...new Set(images)];
  imageUrls.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});
