const namePattern =
  /^[a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,10}( [a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,12})?$/;
const passwordPattern = /(?!\s)^[^ ]{6,14}$/;
const codePassPattern = /^(?!.*\s)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d-]{6,20}$/;
const steeringRackPattern = /^[a-zA-Z]{2}\d{3}$/;
const rackKitPattern = /^[a-zA-Z]{2}\d{3}[kK][iI][tT]$/;
const rackMorePattern = /^[a-zA-Z]{2}\d{3}[sS][pP][eE][cC]$/;
const artPattern = /^[a-zA-Z0-9-]{3,20}$/;
const quantityPattern = /^[a-zA-Z0-9-]{1,2}$/;
const commentPattern = /^[a-zA-Z0-9-ґҐєЄіІїЇґҐєЄіІїЇ]{8,90}$/;
const applicationPattern = /^[a-zA-Z0-9\s\-,.\u0400-\u04FF]{8,400}$/;
const oemPattern = /^[a-zA-Z0-9\s\-,.\u0400-\u04FF]{8,800}$/;

export {
  namePattern,
  passwordPattern,
  codePassPattern,
  steeringRackPattern,
  rackKitPattern,
  rackMorePattern,
  artPattern,
  quantityPattern,
  commentPattern,
  applicationPattern,
  oemPattern,
};
