document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // ---------- 导航栏滚动阴影 ----------
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
        updateActiveLink();
    }

    // ---------- 更新活跃导航链接 ----------
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;

        let currentId = '';
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    // ---------- 汉堡菜单切换 ----------
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        let overlay = document.querySelector('.nav-overlay');
        if (navMenu.classList.contains('active')) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'nav-overlay active';
                overlay.addEventListener('click', closeMenu);
                document.body.appendChild(overlay);
            }
        } else {
            if (overlay) overlay.remove();
        }
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        const overlay = document.querySelector('.nav-overlay');
        if (overlay) overlay.remove();
    }

    // ---------- 实时时钟 ----------
    const clockTime = document.getElementById('clockTime');
    const clockDate = document.getElementById('clockDate');

    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clockTime.textContent = `${h}:${m}:${s}`;

        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekDay = weekDays[now.getDay()];
        clockDate.textContent = `${year}年${month}月${day}日 星期${weekDay}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    // ---------- 碎碎念语录轮播 ----------
    const quotes = [
        { text: '卑以自牧，含章可贞。', source: '——《周易》' },
        { text: '天行健，君子以自强不息。', source: '——《周易》' },
        { text: '地势坤，君子以厚德载物。', source: '——《周易》' },
        { text: '非淡泊无以明志，非宁静无以致远。', source: '——诸葛亮《诫子书》' },
        { text: '路漫漫其修远兮，吾将上下而求索。', source: '——屈原《离骚》' },
        { text: '长风破浪会有时，直挂云帆济沧海。', source: '——李白《行路难》' },
        { text: '宝剑锋从磨砺出，梅花香自苦寒来。', source: '——《警世贤文》' },
        { text: '博观而约取，厚积而薄发。', source: '——苏轼' },
        { text: '纸上得来终觉浅，绝知此事要躬行。', source: '——陆游《冬夜读书示子聿》' },
        { text: '不积跬步，无以至千里；不积小流，无以成江海。', source: '——荀子《劝学》' },
    ];

    const murmurQuote = document.getElementById('murmurQuote');
    const murmurSource = document.getElementById('murmurSource');
    let quoteIndex = 0;

    function showQuote(index) {
        const q = quotes[index];
        murmurQuote.style.opacity = '0';
        murmurSource.style.opacity = '0';
        setTimeout(() => {
            murmurQuote.textContent = q.text;
            murmurSource.textContent = q.source;
            murmurQuote.style.opacity = '1';
            murmurSource.style.opacity = '1';
        }, 400);
    }

    // 初始显示第一句
    showQuote(0);

    // 每 10 秒切换
    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        showQuote(quoteIndex);
    }, 10000);

    // ---------- 事件绑定 ----------
    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 640 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ---------- 项目详情弹窗 ----------
    const modalOverlay = document.getElementById('modalOverlay');
    const project1Link = document.getElementById('project1Link');
    const modalClose = document.getElementById('modalClose');

    function openModal() {
        modalOverlay.classList.add('show');
        document.body.classList.add('no-scroll');
    }

    function closeModal() {
        modalOverlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }

    project1Link.addEventListener('click', openModal);

    modalClose.addEventListener('click', closeModal);

    // 点击关闭
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // ---------- 项目三弹窗 ----------
    const modalOverlay3 = document.getElementById('modalOverlay3');
    const project3Link = document.getElementById('project3Link');
    const modalClose3 = document.getElementById('modalClose3');

    function openModal3() {
        modalOverlay3.classList.add('show');
        document.body.classList.add('no-scroll');
    }

    function closeModal3() {
        modalOverlay3.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }

    project3Link.addEventListener('click', openModal3);

    modalClose3.addEventListener('click', closeModal3);

    modalOverlay3.addEventListener('click', (e) => {
        if (e.target === modalOverlay3) closeModal3();
    });


    });

    // ---------- 初始化 ----------
    onScroll();

