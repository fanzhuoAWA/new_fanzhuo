document.addEventListener('DOMContentLoaded', () => {
    const progressBall = document.getElementById('article-readprog');
    const article = document.querySelector('article');

    if (!progressBall || !article) return;

    let isTicking = false;

    const updateReadingProgress = () => {
        const articleRect = article.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollableHeight = articleRect.height - windowHeight;

        if (scrollableHeight <= 0) {
            progressBall.dataset.visible = 'false';
            return;
        }

        const scrollTop = -articleRect.top;
        let progress = (scrollTop / scrollableHeight) * 100;
        progress = Math.min(100, Math.max(0, progress));

        // 更新文本
        progressBall.textContent = `${Math.round(progress)}%`;

        // 【核心改动】JS 只改变数据属性，不关心样式
        const shouldShow = progress > 5 && progress < 95;
        progressBall.dataset.visible = shouldShow.toString(); // "true" or "false"

        // 更新颜色逻辑不变
        const hue = Math.round(progress * 1.2);
        progressBall.style.setProperty('--progress-hue', hue);
    };

    const onScroll = () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                updateReadingProgress();
                isTicking = false;
            });
            isTicking = true;
        }
    };

    progressBall.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    updateReadingProgress();
});