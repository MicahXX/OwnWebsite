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
        timelines[selectedTimeline].classList.remove('hidden');
    });
});