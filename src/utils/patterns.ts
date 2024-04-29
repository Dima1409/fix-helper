const namePattern =
  /^[a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,10}( [a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,12})?$/;
const passwordPattern = /(?!\s)^[^ ]{6,14}$/;
const codePassPattern = /^(?!.*\s)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d-]{6,20}$/;
const steeringRackPattern = /^[a-zA-Z]{2}\d{3}$/;
const rackKitPattern = /^[a-zA-Z]{2}\d{3}[kK][iI][tT]$/;
const rackMorePattern = /^[a-zA-Z]{2}\d{3}[sS][pP][eE][cC]$/;
const artPattern = /^.{3,25}$/;
const quantityPattern = /^[a-zA-Z0-9-]{1,3}$/;
const commentPattern = /^.{8,90}$/;
const applicationPattern = /^.{8,2000}$/;
const oemPattern = /^.{8,1400}$/;
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
