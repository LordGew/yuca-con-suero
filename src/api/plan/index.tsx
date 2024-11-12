import { BASE_URL_TRANSACTION } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { PlanModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getPlanAvailable = async (): Promise<PlanModel> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(`${BASE_URL_TRANSACTION}/api/plan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
      },
    });

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<PlanModel> = await response.json();
      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();

      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(`It was not possible the plan: ${error.message}`);
  }
};
