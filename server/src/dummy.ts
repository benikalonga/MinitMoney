import { nanoid } from "nanoid";
import { Beneficiary } from "./types";

export const rates: Record<string, number> = {
  USD_ZAR: 18.22,
  ZAR_USD: 0.055,
  ZAR_CDF: 164.75,
  CDF_ZAR: 0.0061,
};

export const beneficiaries: Beneficiary[] = [
  { id: nanoid(), name: "Jonathan Kalonga", method: "Mpesa" },
  { id: nanoid(), name: "Yaya Kalonga", method: "Capitec" },
  { id: nanoid(), name: "Daniel Kalonga", method: "Nedbank" },
];
