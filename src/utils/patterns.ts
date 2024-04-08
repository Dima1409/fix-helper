const namePattern =
  /^[a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,10}( [a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,12})?$/;
const passwordPattern = /(?!\s)^[^ ]{6,14}$/;
const codePassPattern = /^(?!.*\s)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d-]{6,20}$/;

export { namePattern, passwordPattern, codePassPattern };
