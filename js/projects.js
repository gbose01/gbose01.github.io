/**
 * projects.js - Interactive portfolio management (filtering, search, view toggles)
 * Designed for performance, responsiveness, and zero-dependencies.
 */
document.addEventListener('DOMContentLoaded', function () {
    // ─── HOMEPAGE: SPOTLIGHT VS COMPACT DIRECTORY TOGGLE ───────────────────────
    var toggleContainer = document.querySelector('.project-view-toggle');
    if (toggleContainer) {
        var toggleBtns = toggleContainer.querySelectorAll('.toggle-btn');
        var featuredView = document.getElementById('projects-featured-view');
        var compactView = document.getElementById('projects-compact-view');

        toggleBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var view = btn.getAttribute('data-view');

                // Update active toggle state
                toggleBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                // Swap visible views with subtle animation class
                if (view === 'compact') {
                    featuredView.style.display = 'none';
                    compactView.style.display = 'block';
                    // Trigger slight reflow for animation
                    setTimeout(function () {
                        compactView.classList.add('fade-in-visible');
                    }, 20);
                } else {
                    compactView.style.display = 'none';
                    featuredView.style.display = 'block';
                    setTimeout(function () {
                        featuredView.classList.add('fade-in-visible');
                    }, 20);
                }
            });
        });
    }

    // ─── PROJECTS.HTML: SEARCH & CATEGORY FILTERING ───────────────────────────
    var projectsList = document.querySelector('.projects-page-list');
    if (projectsList) {
        var searchInput = document.getElementById('project-search');
        var filterPills = document.querySelectorAll('.filter-pill');
        var projectItems = document.querySelectorAll('.projects-page-list .project');

        var currentCategory = 'all';
        var searchQuery = '';

        // Listen for keyboard shortcut "/" to focus search
        document.addEventListener('keydown', function (e) {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });

        // Setup category pill filtering
        filterPills.forEach(function (pill) {
            pill.addEventListener('click', function () {
                filterPills.forEach(function (p) { p.classList.remove('active'); });
                pill.classList.add('active');
                currentCategory = pill.getAttribute('data-category');
                applyFilterAndSearch();
            });
        });

        // Setup instant dynamic search
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                searchQuery = searchInput.value.toLowerCase().trim();
                applyFilterAndSearch();
            });
        }

        function applyFilterAndSearch() {
            var visibleCount = 0;

            projectItems.forEach(function (project) {
                var category = project.getAttribute('data-category') || '';
                var tags = project.getAttribute('data-tags') || '';
                var title = (project.querySelector('h3 a') || project.querySelector('h3')).textContent.toLowerCase();
                var desc = (project.querySelector('p') || { textContent: '' }).textContent.toLowerCase();

                // Match category
                var matchesCategory = (currentCategory === 'all' || category === currentCategory);

                // Match search query (fuzzily across title, description, and tags)
                var matchesSearch = !searchQuery || 
                    title.indexOf(searchQuery) !== -1 || 
                    desc.indexOf(searchQuery) !== -1 || 
                    tags.toLowerCase().indexOf(searchQuery) !== -1;

                if (matchesCategory && matchesSearch) {
                    project.style.display = 'block';
                    project.classList.add('fade-in-visible');
                    visibleCount++;
                } else {
                    project.style.display = 'none';
                    project.classList.remove('fade-in-visible');
                }
            });

            // Handle 'No projects found' messaging
            var noResultsMsg = document.getElementById('no-projects-found');
            if (visibleCount === 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'no-projects-found';
                    noResultsMsg.style.padding = '48px 24px';
                    noResultsMsg.style.textAlign = 'center';
                    noResultsMsg.style.color = 'var(--text-muted)';
                    noResultsMsg.style.fontSize = '14px';
                    noResultsMsg.innerHTML = '🔍 No matching projects found. Try searching another term!';
                    projectsList.parentNode.appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.parentNode.removeChild(noResultsMsg);
            }
        }
    }
});
