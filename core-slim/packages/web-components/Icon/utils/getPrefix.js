export default (weight) => {
  switch(weight) {
    case 'regular': case 'normal': case 'far': return 'far';
    case 'solid': case 'fas': return 'fas';
    case 'brand': case 'fab': return 'fab';
    case 'duotone': case 'fad': return 'fad';
    default: return 'fal';
  }
};
