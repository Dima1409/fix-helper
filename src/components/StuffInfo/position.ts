export const stuffPosition = (posStuff: string) => {
    let elem;
    switch (posStuff) {
        case 'CRE':
            elem = "Сальник силовий гідроциліндра";
            break;
        case 'DIS':
            elem = "Сальник розподільника";
            break;
        case 'PIS':
            elem = "Сальник поршня редуктора"
            break;
        case 'SCA':
            elem = "Сальник корпусу редуктора";
            break;
        case 'POM':
            elem = "Сальник насосу ГПК"
            break;
        default:
            elem = ''
    }
    return elem;
}