const timelineBtns = document.querySelectorAll('.timeline-btn');
const timelines = {
    coding: document.getElementById('timeline-coding'),
    education: document.getElementById('timeline-education')
};

timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        timelineBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        Object.values(timelines).forEach(timeline => {
            timeline.classList.add('hidden');
        });

        const selectedTimeline = btn.getAttribute('data-timeline');
        const container = timelines[selectedTimeline];
        container.classList.remove('hidden');

        const unplayed = container.querySelectorAll('.scroll-hidden:not(.scroll-show)');
        unplayed.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('scroll-show');
            }, i * 150);
        });
    });
});