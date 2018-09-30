const shuffleGrid = function(){
  console.log('Shuffling Tracks...')
  let ul = document.querySelector('.tracks');
  for (var i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[Math.random() * i | 0]);
  }
}
document.addEventListener('DOMContentLoaded', function () {
    // shuffleGrid();
})
