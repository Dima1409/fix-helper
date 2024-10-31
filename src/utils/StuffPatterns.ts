const nameP = /^F\d{5}[A-Z]?$/
const typeP = ["0", "0A", "0AM2", "0G", "0M", "0M2", "0M2A", "0MA", "0PM", "0PMA", "1", "1A", "1P", "1PA", "1PM", "1PM2", "1PMA", "2",
    "2A", "2P", "2PA", "3", "3A", "3PA", "4", "4A", "4M", "4PM", "4V1", "4V2", "6", "6PM", "6V1", "6V2", "6V2A", "6V2MA", "6V3",
    "7", "7V1", "7V1A", "7V1M", "7V1P", "7V1PM", "7V2", "7V2A", "7V2G", "7V2MA", "7V3", "7V3G", "8", "8A", "8G", "9", "9M",
    "10PM", "11PM", "11PM2X2", "12", "12P", "12V1G", "12V2", "12V2G", "12V3G", "13PMA", "15", "OM", "PM", "spec"];
const positionP = ["CRE", "DIS", "DIS CRE", "MEC", "PIS", "POM", "SCA"];
const diameterP = /^\d+(\.\d{1,2})?$/;
const heightP = diameterP;

export {
    nameP,
    typeP,
    positionP,
    diameterP,
    heightP
}