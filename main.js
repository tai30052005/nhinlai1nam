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

  // Characters Section - Tạo cards cho 12 thành viên
  const charactersData = [
    { name: "Thành viên 1", role: "Người tổ chức", quote: "Luôn là người khởi xướng mọi cuộc vui", stats: { events: 15, photos: 120 }, badges: ["Tổ chức", "Nhiệt tình"] },
    { name: "Thành viên 2", role: "Người chụp ảnh", quote: "Khoảnh khắc đẹp nhất được lưu lại", stats: { events: 14, photos: 200 }, badges: ["Nhiếp ảnh", "Sáng tạo"] },
    { name: "Thành viên 3", role: "Người vui tính", quote: "Tiếng cười là liều thuốc tốt nhất", stats: { events: 16, photos: 95 }, badges: ["Vui vẻ", "Hài hước"] },
    { name: "Thành viên 4", role: "Người lắng nghe", quote: "Luôn thấu hiểu và chia sẻ", stats: { events: 13, photos: 80 }, badges: ["Thấu cảm", "Tâm lý"] },
    { name: "Thành viên 5", role: "Người nấu ăn", quote: "Món ngon kết nối mọi người", stats: { events: 12, photos: 110 }, badges: ["Nấu ăn", "Chu đáo"] },
    { name: "Thành viên 6", role: "Người lên kế hoạch", quote: "Mọi thứ đều được sắp xếp hoàn hảo", stats: { events: 15, photos: 100 }, badges: ["Tổ chức", "Chi tiết"] },
    { name: "Thành viên 7", role: "Người kể chuyện", quote: "Những câu chuyện hay nhất luôn được kể", stats: { events: 14, photos: 90 }, badges: ["Kể chuyện", "Hấp dẫn"] },
    { name: "Thành viên 8", role: "Người hỗ trợ", quote: "Luôn sẵn sàng giúp đỡ mọi người", stats: { events: 13, photos: 85 }, badges: ["Hỗ trợ", "Tận tâm"] },
    { name: "Thành viên 9", role: "Người sáng tạo", quote: "Ý tưởng mới luôn được đón nhận", stats: { events: 12, photos: 105 }, badges: ["Sáng tạo", "Đổi mới"] },
    { name: "Thành viên 10", role: "Người hòa đồng", quote: "Kết nối mọi người lại với nhau", stats: { events: 15, photos: 95 }, badges: ["Hòa đồng", "Thân thiện"] },
    { name: "Thành viên 11", role: "Người tích cực", quote: "Năng lượng tích cực lan tỏa", stats: { events: 14, photos: 100 }, badges: ["Tích cực", "Năng động"] },
    { name: "Thành viên 12", role: "Người ghi nhớ", quote: "Mọi kỷ niệm đều được lưu giữ", stats: { events: 13, photos: 115 }, badges: ["Ghi nhớ", "Trân trọng"] }
  ];

  const charactersGrid = document.getElementById('charactersGrid');
  if (charactersGrid) {
    charactersData.forEach((character, index) => {
      const card = document.createElement('div');
      card.className = 'character-card';
      
      // Tạo avatar với chữ cái đầu
      const initials = character.name.split(' ').map(n => n[0]).join('').substring(0, 2);
      const avatarGradient = [
        'linear-gradient(135deg, #7af0ff, #5468ff)',
        'linear-gradient(135deg, #d86bff, #7af0ff)',
        'linear-gradient(135deg, #5468ff, #d86bff)',
        'linear-gradient(135deg, #7af0ff, #d86bff)',
        'linear-gradient(135deg, #5468ff, #7af0ff)',
        'linear-gradient(135deg, #d86bff, #5468ff)'
      ];
      const gradientIndex = index % avatarGradient.length;
      
      card.innerHTML = `
        <div class="character-card__avatar" style="background: ${avatarGradient[gradientIndex]}">
          <div class="character-card__avatar-inner">
            ${initials}
          </div>
        </div>
        <h3 class="character-card__name">${character.name}</h3>
        <p class="character-card__role">${character.role}</p>
        <p class="character-card__quote">"${character.quote}"</p>
      `;
      
      charactersGrid.appendChild(card);
    });
  }

  // Intersection Observer cho Characters section - hiện/ẩn khi scroll
  const charactersSection = document.querySelector('.characters');
  if (charactersSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Lướt xuống - hiện
          requestAnimationFrame(() => {
            entry.target.classList.add('characters--visible');
          });
        } else {
          // Lướt lên - ẩn
          requestAnimationFrame(() => {
            entry.target.classList.remove('characters--visible');
          });
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(charactersSection);
  }
});
