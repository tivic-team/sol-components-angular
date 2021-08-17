import { maskTypes } from "./maskTypes";

const CPF = "000.000.000-00";
const CNPJ = "00.000.000/0000-00";
const CPF_CNPJ = "000.000.000-00||00.000.000/0000-00";
const PHONE = "(00) 0000-0000";
const CELLPHONE = "(00) 00000-0000";
const LICENSEPLATE = "SSS0A00";
const CEP = "00000-000";
const UNMASKED = "unmasked";
 
export default function getMaskFormat(maskFormat: string){
    let mask = '';

    switch (maskFormat){

        case maskTypes.CPF:
            mask = CPF;
            break;

        case maskTypes.CNPJ:
            mask = CNPJ;
            break;

        case maskTypes.CPF_CNPJ:
            mask = CPF_CNPJ;
            break;
        
        case maskTypes.PHONENUMBER:
            mask = PHONE;
            break;
        
         case maskTypes.CELLPHONENUMBER:
            mask = CELLPHONE;
            break;

        case maskTypes.LICENSEPALTE:
            mask = LICENSEPLATE;
            break;

        case maskTypes.CEP:
            mask = CEP;
            break;

        default:
            mask = UNMASKED;
    }
    return mask;
}