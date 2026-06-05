/**
 * 个人主页 - 交互脚本
 * 包含: 导航滚动效果、汉堡菜单、平滑滚动、活跃链接高亮
 */

document.addEventListener('DOMContentLoaded', () => {
    // 元素引用
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
        // 处理遮罩层
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

    // ---------- 事件绑定 ----------
    hamburger.addEventListener('click', toggleMenu);

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    // 滚动监听 (使用被动监听提升性能)
    window.addEventListener('scroll', onScroll, { passive: true });

    // 窗口大小改变时关闭菜单
    window.addEventListener('resize', () => {
        if (window.innerWidth > 640 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ---------- 初始化 ----------
    onScroll();
});
