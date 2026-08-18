document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');

  if (!searchForm) return;

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    // Show loading UI
    resultsContainer.innerHTML = `
      <div class="text-center my-4">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Searching AI research papers...</p>
      </div>
    `;

    try {
      // Replace URL with your actual backend endpoint when ready
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        resultsContainer.innerHTML = `<div class="alert alert-warning">No papers found matching "${query}".</div>`;
        return;
      }

      // Render Paper Cards
      resultsContainer.innerHTML = data.results.map(paper => `
        <div class="card mb-3 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">${paper.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Authors: ${paper.authors || 'Unknown'}</h6>
            <p class="card-text">${paper.abstract || 'No abstract available.'}</p>
            <a href="${paper.url || '#'}" target="_blank" class="btn btn-sm btn-outline-primary">Read Paper</a>
          </div>
        </div>
      `).join('');

    } catch (error) {
      resultsContainer.innerHTML = `
        <div class="alert alert-danger">
          Failed to fetch results. Make sure your local backend server is running.
        </div>
      `;
    }
  });
});