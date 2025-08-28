import { colors } from "src/constants/colors";

export const getStatusIcon = (status: string) => {
  return status?.toLocaleLowerCase() === "success"
    ? "check"
    : status?.toLocaleLowerCase() === "pending"
    ? "refresh"
    : "close";
};
export const getStatusColor = (status: string) => {
  return status?.toLocaleLowerCase() === "success"
    ? colors.success
    : status?.toLocaleLowerCase() === "pending"
    ? colors.pending
    : colors.failed;
};
