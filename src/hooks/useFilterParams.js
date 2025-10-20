import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function useFilterParams(initialFilters) {
  const location = useLocation();
  const defaultParams = initialFilters || location?.state?.linkParams || undefined;
  const [params, setParams] = useState(defaultParams);

  return [params, setParams];
}