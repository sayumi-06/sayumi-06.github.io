const searchBox = document.querySelector('.search-box input[type="text"]');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', () => {
  const searchTerm = searchBox.value.trim();
  if (searchTerm !== '') {
    window.location.href = './search-results.html?query=' + searchTerm;
  }
});