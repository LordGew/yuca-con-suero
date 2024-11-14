import { BASE_URL } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { CountryModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

/**
 * Obtiene la lista de países disponibles mediante una llamada a la API.
 * - Genera un `transactionId` único para identificar la solicitud.
 * - Realiza una solicitud `GET` al endpoint `/api/resources/country` para obtener los países.
 * - Si la respuesta es exitosa (status 200), devuelve los datos de países obtenidos de la API.
 * - En caso de error o si la respuesta no es exitosa, retorna una lista de opciones por defecto.
 *
 * @returns {Promise<CountryModel[]>} Lista de países disponibles o valores predeterminados en caso de error.
 */

const defaultCountryOptions: CountryModel[] = [
  { value: "Otro", label: "Otro", language: "es" },
  { value: "Others", label: "Others", language: "en" },
];

export const getAvailableCountries = async (): Promise<CountryModel[]> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(`${BASE_URL}/api/resources/country`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
      },
    });

    const responseData: GenericResponseDto<CountryModel[]> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    }
    return defaultCountryOptions;
  } catch (error: any) {
    return defaultCountryOptions;
  }
};
