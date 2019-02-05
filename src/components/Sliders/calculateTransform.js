export default function calculateTransform(el, index) {
  const { numberOfThumpImage, sizeOfTranslate_x } = this.state;
  const thumbnailWrapper = document
    .querySelector('.thumbnail-wrapper')
    .getBoundingClientRect();
  const thumbnailSlideList = document.querySelectorAll('.thumbnail-slide');
  const ElEMENT = el.target ? el.target.parentNode : el;
  const thumbnailSlide = ElEMENT.getBoundingClientRect();

  const positionDetected = thumbnailSlide.x;
  const GETSIZE = thumbnailSlide.width + 8;
  const firstPointClick = thumbnailWrapper.left;
  const secondPoinClick =
    thumbnailSlide.width * numberOfThumpImage +
    8 * numberOfThumpImage +
    thumbnailWrapper.left;

  thumbnailSlideList.forEach((element, i) => {
    element.classList.remove('thumbnail-slide-active');
  });
  ElEMENT.classList.add('thumbnail-slide-active');

  if (Math.round(positionDetected) === Math.round(secondPoinClick)) {
    this.setState({
      numberOfThumpImage: numberOfThumpImage + 1,
      sizeOfTranslate_x: sizeOfTranslate_x - GETSIZE
    });
    return {
      sizeOfTranslate_x,
      numberOfThumpImage
    };
  }
  if (index === 0) {
    this.setState({
      sizeOfTranslate_x: 0
    });
    return {
      sizeOfTranslate_x
    };
  }
  if (
    Math.round(firstPointClick) ===
    Math.round(thumbnailSlide.x + sizeOfTranslate_x)
  ) {
    this.setState({
      sizeOfTranslate_x: sizeOfTranslate_x + GETSIZE,
      numberOfThumpImage: numberOfThumpImage - 1
    });
    return { numberOfThumpImage, sizeOfTranslate_x };
  }
}
