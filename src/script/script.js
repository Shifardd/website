    // Loading screen logic
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading');
        const content = document.getElementById('content');

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            content.style.display = 'block';
            // Initialize ScrollSpy after content is visible
            initializeScrollSpy();
            loop(); 
        }, 2000);
    }

    // Initialize Bootstrap ScrollSpy
    function initializeScrollSpy() {
        const scrollSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
        scrollSpyList.forEach(function (scrollSpyEl) {
            bootstrap.ScrollSpy.getOrCreateInstance(scrollSpyEl);
        });

        // Manual scroll spy implementation as backup
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            let current = '';
            const scrollPosition = window.scrollY + 150; // Offset for fixed navbar

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // Update active link on scroll
        window.addEventListener('scroll', updateActiveLink);
        // Set initial active state
        updateActiveLink();
    }

    window.addEventListener('load', hideLoadingScreen);

    // Canvas animation code
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    addEventListener('resize', resize);
    resize();

    let mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2
    };
    addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Follower {
        constructor(delay, color, size) {
            this.x = mouse.x;
            this.y = mouse.y;
            this.delay = delay;
            this.color = color;
            this.size = size || 30;
            this.opacity = 0.1;
        }
        update(targetX, targetY) {
            this.x += (targetX - this.x) * this.delay;
            this.y += (targetY - this.y) * this.delay;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${parseInt(this.color.slice(1,3),16)},${parseInt(this.color.slice(3,5),16)},${parseInt(this.color.slice(5,7),16)},${this.opacity})`;
            ctx.fill();
        }
    }

    const colors = ["#E0F0E0", "#C0E0C0", "#A0D0A0", "#80C080", "#60B060", "#40A040", "#309030", "#208020", "#107010", "#006000"];
    const followers = [];
    for (let i = 0; i < 10; i++) {
        followers.push(new Follower(0.1 + i * 0.05, colors[i % colors.length], 20 + i * 5));
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let tx = mouse.x;
        let ty = mouse.y;
        for (const f of followers) {
            f.update(tx, ty);
            f.draw();
            tx = f.x;
            ty = f.y;
        }
        requestAnimationFrame(loop);
    }