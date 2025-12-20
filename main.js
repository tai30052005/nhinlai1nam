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

  // Events Section - Timeline và Ngày hẹn
  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const monthNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Dữ liệu events mẫu - bạn có thể chỉnh sửa
  const eventsData = {
    1: [
      { date: '15/01', title: 'Cuộc hẹn đầu năm', description: 'Khởi đầu năm mới với những kế hoạch và mục tiêu mới', image: 'cuilua2025.jpg' },
      { date: '28/01', title: 'Tiệc tất niên', description: 'Tổng kết năm cũ và chào đón năm mới', image: 'cuilua2025.jpg' }
    ],
    2: [
      { date: '10/02', title: 'Chuyến đi cuối tuần', description: 'Khám phá địa điểm mới cùng nhau', image: 'cuilua2025.jpg' }
    ],
    3: [
      { date: '08/03', title: 'Ngày hội phụ nữ', description: 'Chúc mừng ngày 8/3 với những món quà ý nghĩa', image: 'cuilua2025.jpg' },
      { date: '20/03', title: 'Cà phê sáng', description: 'Buổi trò chuyện thân mật tại quán cà phê yêu thích', image: 'cuilua2025.jpg' }
    ],
    4: [
      { date: '15/04', title: 'Picnic công viên', description: 'Ngày nắng đẹp cùng nhau dã ngoại', image: 'cuilua2025.jpg' }
    ],
    5: [
      { date: '01/05', title: 'Lễ lao động', description: 'Kỷ niệm ngày lễ với hoạt động đặc biệt', image: 'cuilua2025.jpg' },
      { date: '18/05', title: 'Sinh nhật thành viên', description: 'Chúc mừng sinh nhật với bánh và quà', image: 'cuilua2025.jpg' }
    ],
    6: [
      { date: '10/06', title: 'Chuyến đi biển', description: 'Nghỉ dưỡng tại bãi biển đẹp', image: 'cuilua2025.jpg' },
      { date: '25/06', title: 'Tiệc BBQ', description: 'Buổi tiệc nướng ngoài trời', image: 'cuilua2025.jpg' }
    ],
    7: [
      { date: '05/07', title: 'Xem phim cùng nhau', description: 'Buổi tối xem bộ phim mới ra mắt', image: 'cuilua2025.jpg' }
    ],
    8: [
      { date: '12/08', title: 'Chuyến đi núi', description: 'Leo núi và ngắm cảnh', image: 'cuilua2025.jpg' },
      { date: '28/08', title: 'Tiệc mừng', description: 'Chúc mừng thành tích của nhóm', image: 'cuilua2025.jpg' }
    ],
    9: [
      { date: '15/09', title: 'Trung thu', description: 'Đón trung thu với bánh trung thu và đèn lồng', image: 'cuilua2025.jpg' }
    ],
    10: [
      { date: '10/10', title: 'Chuyến đi cuối tuần', description: 'Khám phá thành phố mới', image: 'cuilua2025.jpg' },
      { date: '25/10', title: 'Halloween party', description: 'Tiệc hóa trang Halloween', image: 'cuilua2025.jpg' }
    ],
    11: [
      { date: '20/11', title: 'Ngày nhà giáo', description: 'Tri ân thầy cô', image: 'cuilua2025.jpg' }
    ],
    12: [
      { date: '15/12', title: 'Chuẩn bị năm mới', description: 'Lên kế hoạch cho năm 2026', image: 'cuilua2025.jpg' },
      { date: '31/12', title: 'Đếm ngược năm mới', description: 'Đón năm mới với pháo hoa và niềm vui', image: 'cuilua2025.jpg' }
    ]
  };

  const timelineMonths = document.getElementById('timelineMonths');
  const eventsContent = document.getElementById('eventsContent');
  const timelineProgress = document.getElementById('timelineProgress');

  // Tạo timeline months
  if (timelineMonths) {
    months.forEach((month, index) => {
      const monthEl = document.createElement('div');
      monthEl.className = 'timeline__month';
      monthEl.dataset.month = index + 1;
      
      monthEl.innerHTML = `
        <div class="timeline__month-dot"></div>
        <div class="timeline__month-label">${month}</div>
      `;
      
      monthEl.addEventListener('click', () => {
        // Remove active class from all months
        document.querySelectorAll('.timeline__month').forEach(m => m.classList.remove('active'));
        monthEl.classList.add('active');
        
        // Show events for selected month
        showEventsForMonth(index + 1);
      });
      
      timelineMonths.appendChild(monthEl);
    });
  }

  // Hiển thị events cho tháng được chọn
  function showEventsForMonth(month) {
    if (!eventsContent) return;
    
    const events = eventsData[month] || [];
    
    eventsContent.innerHTML = `
      <div class="event-month active">
        <h3 class="event-month__title">${months[month - 1]} 2025</h3>
        ${events.length > 0 ? `
          <div class="event-list">
            ${events.map(event => `
              <div class="event-item">
                ${event.image ? `
                  <div class="event-item__image">
                    <img src="${event.image}" alt="${event.title}" loading="lazy">
                  </div>
                ` : ''}
                <div class="event-item__content">
                  <div class="event-item__date">${event.date}</div>
                  <h4 class="event-item__title">${event.title}</h4>
                  <p class="event-item__description">${event.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="text-align: center; color: var(--muted); padding: 40px;">
            <p>Tháng này chưa có cuộc hẹn nào được ghi lại</p>
          </div>
        `}
      </div>
    `;
  }

  // Mặc định hiển thị tháng 1
  if (timelineMonths && timelineMonths.children.length > 0) {
    timelineMonths.children[0].classList.add('active');
    showEventsForMonth(1);
  }

  // Intersection Observer cho Events section
  const eventsSection = document.querySelector('.events');
  if (eventsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('events--visible');
          });
        } else {
          requestAnimationFrame(() => {
            entry.target.classList.remove('events--visible');
          });
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(eventsSection);
  }

  // Testimonials Section - Góc nhỏ tâm sự
  const testimonialsSection = document.querySelector('.testimonials');
  if (testimonialsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('testimonials--visible');
          });
        } else {
          requestAnimationFrame(() => {
            entry.target.classList.remove('testimonials--visible');
          });
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(testimonialsSection);
  }

  // Xử lý form tâm sự với Firebase
  const testimonialsForm = document.getElementById('testimonialsForm');
  const testimonialsSuccess = document.getElementById('testimonialsSuccess');
  
  // Đợi Firebase load xong
  function waitForFirebase() {
    return new Promise((resolve) => {
      if (window.firebaseDatabase) {
        resolve(window.firebaseDatabase);
      } else {
        const checkInterval = setInterval(() => {
          if (window.firebaseDatabase) {
            clearInterval(checkInterval);
            resolve(window.firebaseDatabase);
          }
        }, 100);
      }
    });
  }
  
  if (testimonialsForm) {
    testimonialsForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('.testimonials__submit');
      const submitText = submitButton.querySelector('.testimonials__submit-text');
      const submitLoader = submitButton.querySelector('.testimonials__submit-loader');
      const formData = new FormData(this);
      
      // Disable button và hiển thị loading
      submitButton.disabled = true;
      submitText.style.display = 'none';
      submitLoader.style.display = 'inline-flex';
      
      try {
        // Đợi Firebase sẵn sàng
        const database = await waitForFirebase();
        const { ref, push, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
        
        // Lấy dữ liệu từ form
        const message = formData.get('message').trim();
        
        if (!message) {
          alert('Vui lòng nhập tâm sự của bạn!');
          submitButton.disabled = false;
          submitText.style.display = 'inline';
          submitLoader.style.display = 'none';
          return;
        }
        
        // Tạo object tâm sự
        const testimonial = {
          message: message,
          timestamp: Date.now(),
          date: new Date().toLocaleString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        
        // Lưu vào Firebase
        const testimonialsRef = ref(database, 'testimonials');
        const newTestimonialRef = push(testimonialsRef);
        await set(newTestimonialRef, testimonial);
        
        // Hiển thị thông báo thành công
        testimonialsForm.style.display = 'none';
        testimonialsSuccess.style.display = 'block';
        
        // Reset form
        this.reset();
        
        // Scroll đến success message
        testimonialsSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Tự động ẩn success message sau 5 giây và hiện lại form
        setTimeout(() => {
          testimonialsSuccess.style.display = 'none';
          testimonialsForm.style.display = 'block';
        }, 5000);
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Có lỗi xảy ra khi gửi tâm sự. Vui lòng kiểm tra kết nối Firebase và thử lại sau.');
        
        // Reset button
        submitButton.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
      }
    });
  }
  
  // Pagination state
  let currentPage = 1;
  const itemsPerPage = 4;
  let allTestimonials = [];
  
  // Load và hiển thị danh sách tâm sự từ Firebase
  async function loadTestimonials() {
    const messagesList = document.getElementById('testimonialsMessagesList');
    if (!messagesList) return;
    
    try {
      // Đợi Firebase sẵn sàng
      const database = await waitForFirebase();
      const { ref, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
      
      const testimonialsRef = ref(database, 'testimonials');
      
      // Lắng nghe thay đổi realtime
      onValue(testimonialsRef, (snapshot) => {
        const data = snapshot.val();
        
        if (!data || Object.keys(data).length === 0) {
          messagesList.innerHTML = `
            <div class="testimonials__empty">
              <p>Chưa có tâm sự nào. Hãy là người đầu tiên chia sẻ nhé! 💫</p>
            </div>
          `;
          // Ẩn pagination nếu không có data
          const pagination = document.getElementById('testimonialsPagination');
          if (pagination) pagination.style.display = 'none';
          return;
        }
        
        // Chuyển đổi object thành array và sắp xếp theo timestamp (mới nhất trước)
        allTestimonials = Object.entries(data)
          .map(([id, testimonial]) => ({
            id,
            ...testimonial
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        
        // Reset về trang 1 khi có data mới
        currentPage = 1;
        
        // Render với pagination
        renderTestimonials();
      }, (error) => {
        console.error('Error loading testimonials:', error);
        messagesList.innerHTML = `
          <div class="testimonials__error">
            <p>Không thể tải tâm sự. Vui lòng kiểm tra kết nối Firebase.</p>
          </div>
        `;
        const pagination = document.getElementById('testimonialsPagination');
        if (pagination) pagination.style.display = 'none';
      });
      
    } catch (error) {
      console.error('Error setting up Firebase listener:', error);
      messagesList.innerHTML = `
        <div class="testimonials__error">
          <p>Lỗi kết nối Firebase. Vui lòng kiểm tra cấu hình.</p>
        </div>
      `;
      const pagination = document.getElementById('testimonialsPagination');
      if (pagination) pagination.style.display = 'none';
    }
  }
  
  // Render testimonials với pagination
  function renderTestimonials() {
    const messagesList = document.getElementById('testimonialsMessagesList');
    const pagination = document.getElementById('testimonialsPagination');
    if (!messagesList) return;
    
    // Tính toán pagination
    const totalPages = Math.ceil(allTestimonials.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTestimonials = allTestimonials.slice(startIndex, endIndex);
    
    // Render danh sách
    if (currentTestimonials.length === 0) {
      messagesList.innerHTML = `
        <div class="testimonials__empty">
          <p>Không có tâm sự nào ở trang này.</p>
        </div>
      `;
    } else {
      messagesList.innerHTML = currentTestimonials.map((testimonial, index) => `
        <div class="testimonial-item" style="animation-delay: ${index * 0.1}s">
          <div class="testimonial-item__content">
            <p class="testimonial-item__message">"${testimonial.message}"</p>
            <div class="testimonial-item__meta">
              <span class="testimonial-item__author">Ẩn danh</span>
              <span class="testimonial-item__date">${testimonial.date}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    // Render pagination
    if (pagination) {
      if (totalPages <= 1) {
        pagination.style.display = 'none';
      } else {
        pagination.style.display = 'flex';
        pagination.innerHTML = `
          <button 
            class="pagination__btn pagination__btn--prev" 
            id="prevPageBtn"
            ${currentPage === 1 ? 'disabled' : ''}
          >
            ← Trước
          </button>
          <div class="pagination__info">
            <span class="pagination__current">${currentPage}</span>
            <span class="pagination__separator">/</span>
            <span class="pagination__total">${totalPages}</span>
          </div>
          <button 
            class="pagination__btn pagination__btn--next" 
            id="nextPageBtn"
            ${currentPage === totalPages ? 'disabled' : ''}
          >
            Sau →
          </button>
        `;
        
        // Event listeners cho pagination
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
              currentPage--;
              renderTestimonials();
              // Scroll lên đầu danh sách
              messagesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        }
        
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
              currentPage++;
              renderTestimonials();
              // Scroll lên đầu danh sách
              messagesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        }
      }
    }
  }
  
  // Load testimonials khi page load
  loadTestimonials();
  
  // Toggle giữa form và danh sách tâm sự
  const viewTestimonialsBtn = document.getElementById('viewTestimonialsBtn');
  const backToFormBtn = document.getElementById('backToFormBtn');
  const testimonialsFormWrapper = document.querySelector('.testimonials__form-wrapper');
  const testimonialsMessages = document.getElementById('testimonialsMessages');
  
  if (viewTestimonialsBtn && testimonialsMessages) {
    viewTestimonialsBtn.addEventListener('click', () => {
      testimonialsFormWrapper.style.display = 'none';
      testimonialsSuccess.style.display = 'none';
      testimonialsMessages.style.display = 'block';
      
      // Scroll đến phần hiển thị tâm sự
      testimonialsMessages.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  if (backToFormBtn && testimonialsFormWrapper) {
    backToFormBtn.addEventListener('click', () => {
      testimonialsMessages.style.display = 'none';
      testimonialsFormWrapper.style.display = 'block';
      
      // Scroll đến phần form
      testimonialsFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
