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

  // Intersection Observer để hiện/ẩn khi scroll
  const introSection = document.querySelector('.intro');
  if (introSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Lướt xuống - hiện
          entry.target.classList.add('intro--visible');
        } else {
          // Lướt lên - ẩn
          entry.target.classList.remove('intro--visible');
        }
      });
    }, { threshold: 0.15 });

    observer.observe(introSection);
  }
});
