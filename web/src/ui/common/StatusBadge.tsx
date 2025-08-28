import { Badge } from "@chakra-ui/react";
import { getStatusColor } from "../../utils";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="subtle"
      colorScheme={getStatusColor(status)}
      px={3}
      py={1}
      borderRadius="lg"
      fontWeight="medium"
    >
      {status}
    </Badge>
  );
};
export default StatusBadge;
