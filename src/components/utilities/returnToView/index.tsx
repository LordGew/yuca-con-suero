import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ReturnToView = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/accounts");
  }, []);

  return <div></div>;
};

export default ReturnToView;
