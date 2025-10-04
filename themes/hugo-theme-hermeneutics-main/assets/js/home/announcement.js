let isAnnouncementVisible = false;
const announcement = () => document.getElementById('home-announcement__container');

const showAnnouncement = () => {
    const el = announcement();
    if (el) {
        el.classList.remove('translate-x-[120%]', 'opacity-0');
        isAnnouncementVisible = true;
    }
};

const closeAnnouncement = () => {
    const el = announcement();
    if (el) {
        el.classList.add('translate-x-[120%]', 'opacity-0');
        isAnnouncementVisible = false;
    }
};

const toggleAnnouncement = () => (
    isAnnouncementVisible ? closeAnnouncement() : showAnnouncement()
);

document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        toggleAnnouncement();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showAnnouncement, 2025);
    const closeBtn = document.getElementById('home-announcement__close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAnnouncement);
    }
});