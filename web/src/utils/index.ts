import { colors } from "../constants/colors";

export const getStatusIcon = (status: string) => {
  return status?.toLocaleLowerCase() === "success"
    ? "check"
    : status?.toLocaleLowerCase() === "pending"
    ? "refresh"
    : "close";
};
export const getStatusColor = (status: string) => {
  return status?.toLocaleLowerCase() === "success"
    ? "green"
    : status?.toLocaleLowerCase() === "pending"
    ? "orange"
    : "red";
};
