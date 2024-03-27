// do something!
const makeElement = ($container) => {
  const starRatingContainer = document.createElement('div');
  starRatingContainer.className = 'star-rating-container';
  $container.appendChild(starRatingContainer);

  const { maxRating = 5 } = $container.dataset;
  if (maxRating === '0')
    throw new Error('data-max-rating 어트리뷰트 값은 1 이상이어야 합니다.');

  for (let idx = 0; idx < maxRating; idx++) {
    const starIcon = document.createElement('i');
    starIcon.className = 'bx bxs-star';
    starIcon.dataset.value = idx + 1;
    starRatingContainer.appendChild(starIcon);
  }
};

const updateStars = ($stars, hoveredStarIdx, selectedStarIdx) => {
  $stars.forEach(($star, i) => {
    if (i < hoveredStarIdx) {
      $star.classList.add('hovered');
    } else {
      $star.classList.remove('hovered');
    }

    if (i < selectedStarIdx) {
      $star.classList.add('selected');
    } else {
      $star.classList.remove('selected');
    }
  });
};

const StarRating = ($container) => {
  makeElement($container);

  let hoveredStarIdx = null;
  let selectedStarIdx = null;

  const $stars = [...$container.querySelectorAll('i')];

  $container.addEventListener('mouseover', ({ target }) => {
    if (!target.matches('i')) return;

    hoveredStarIdx = target.dataset.value;
    updateStars($stars, hoveredStarIdx, selectedStarIdx);
  });

  $container.addEventListener('mouseout', () => {
    hoveredStarIdx = null;
    updateStars($stars, hoveredStarIdx, selectedStarIdx);
  });

  $container.addEventListener('click', ({ target }) => {
    if (!target.matches('i')) return;
    const clickedIdx = target.dataset.value;

    if (selectedStarIdx === clickedIdx) selectedStarIdx = null;
    else selectedStarIdx = clickedIdx;
    updateStars($stars, hoveredStarIdx, selectedStarIdx);

    const ratingChangeEvent = new CustomEvent('rating-change', {
      detail: selectedStarIdx ?? 0,
    });
    $container.dispatchEvent(ratingChangeEvent);
  });
};

export default StarRating;
