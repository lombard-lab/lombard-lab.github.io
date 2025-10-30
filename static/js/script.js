// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Video player functionality
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const video = document.getElementById(videoId);
            const icon = this.querySelector('i');
            
            if (video.paused) {
                video.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                video.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });
    
    // Update play button when video ends
    const videos = document.querySelectorAll('.dataset-video video');
    
    videos.forEach(video => {
        video.addEventListener('ended', function() {
            const button = this.closest('.dataset-video').querySelector('.play-btn');
            const icon = button.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });
        
        // Show controls on hover
        const videoContainer = video.closest('.dataset-video');
        const controls = videoContainer.querySelector('.video-controls');
        
        videoContainer.addEventListener('mouseenter', function() {
            controls.style.opacity = '1';
        });
        
        videoContainer.addEventListener('mouseleave', function() {
            // Only hide controls if video is not playing
            if (video.paused) {
                controls.style.opacity = '0.8';
            }
        });
    });
    
    // Filter functionality for papers and datasets
    const searchInputs = document.querySelectorAll('.search-box input');
    const filterSelects = document.querySelectorAll('.filter-options select');
    
    function filterItems() {
        const searchTerm = this.value.toLowerCase();
        const filterValue = this.dataset.filter || this.parentElement.querySelector('select')?.value;
        const container = this.closest('.page-content');
        const items = container.querySelectorAll('.card');
        
        items.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            const matchesSearch = title.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm));
            const matchesFilter = !filterValue || filterValue === 'all' || 
                item.dataset.category === filterValue || 
                tags.includes(filterValue.toLowerCase());
            
            if (matchesSearch && matchesFilter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchInputs.forEach(input => {
        input.addEventListener('input', filterItems);
    });
    
    filterSelects.forEach(select => {
        select.addEventListener('change', filterItems);
    });
    
    // Dataset page specific functionality
    const datasetCards = document.querySelectorAll('.dataset-card');
    datasetCards.forEach(card => {
        card.addEventListener('click', function() {
            const datasetId = this.dataset.id;
            // In a real implementation, this would navigate to a dataset detail page
            // For now, we'll just show an alert
            alert(`Viewing details for dataset: ${this.querySelector('h3').textContent}`);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});