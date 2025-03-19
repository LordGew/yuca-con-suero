import React, { useState, useEffect } from "react";
import CardSettings from "./card";
import { getConfigs } from "@/api/dashboard/settings";
import Swal from "sweetalert2";

type ServerSettings = {
  [key: string]: string;
};

const initialData: ServerSettings = {};

interface SettingsServerProps {
  token: string;
  serverId: number;
}

const SettingsServer: React.FC<SettingsServerProps> = ({ token, serverId }) => {
  const [filePath, setFilePath] = useState<string>(""); // Estado para la ruta del archivo
  const [formData, setFormData] = useState<ServerSettings>(initialData); // Datos del archivo
  const [isOpen, setIsOpen] = useState<boolean>(false); // Control del desplegable

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Efecto para actualizar la configuración cuando cambia la ruta del archivo
  useEffect(() => {
    const fetchConfig = async () => {
      if (isOpen && filePath) {
        try {
          const responseData = await getConfigs(filePath, serverId, token);
          setFormData(responseData);
        } catch (error) {
          console.error("Error al obtener configuración del archivo:", error);
        }
      }
    };

    fetchConfig();
  }, [filePath, isOpen, serverId, token]);

  const toggleConfig = () => {
    if (!filePath) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Por favor, ingresa la ruta del archivo antes de continuar.`,
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-xl p-8 bg-gradient-to-br text-white flex flex-col items-center space-y-6">
      {/* ✅ Sección Introductoria */}
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-400">
          Dashboard del Servidor
        </h1>
        <p className="text-lg text-gray-300 mt-3">
          Aquí puedes monitorear el estado de los servicios principales,
          administrar configuraciones y asegurarte de que todo funcione
          correctamente.
        </p>
      </div>

      {/* ✅ Contenedor de Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full max-w-7xl px-8 justify-center pt-10 pb-20">
        <CardSettings
          title="Servidor"
          value={1}
          percentage={100}
          color="border-blue-500"
          btnText="Reiniciar"
        />
        <CardSettings
          title="AuthServer"
          value={1}
          percentage={25}
          color="border-green-500"
          btnText="Reiniciar"
        />
        <CardSettings
          title="WorldServer"
          value={1}
          percentage={25}
          color="border-red-500"
          btnText="Reiniciar"
        />
      </div>

      {/* ✅ Campo para ingresar la ruta del archivo */}
      <div className="w-full max-w-7xl p-8 bg-gray-800 rounded-lg shadow-xl">
        <label className="block text-lg text-gray-300 mb-2">
          Ruta del archivo de configuración:
        </label>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
          placeholder="Ejemplo: C:\\ruta\\al\\archivo.conf"
        />
      </div>

      {/* ✅ Contenedor de Configuración */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-7xl max-h-[80vh] overflow-y-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Configuración del Servidor
        </h2>
        <p className="text-gray-300 text-center mb-6 text-2xl">
          Modifica la configuración del archivo seleccionado. Los cambios serán
          aplicados en tiempo real.
        </p>

        {/* Botón de despliegue */}
        <button
          type="button"
          onClick={toggleConfig}
          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-all flex justify-between items-center shadow-md"
        >
          <span className="font-semibold">Archivo de Configuración</span>
          <span className="transition-transform duration-300">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>

        {/* Campos de Configuración */}
        {isOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-gray-700 mt-3 rounded-lg shadow-lg transition-all">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="font-medium text-gray-300 mb-2 truncate">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
                />
              </div>
            ))}
          </div>
        )}

        {/* Botón de Guardado */}
        {isOpen && (
          <button
            type="button"
            className="w-full bg-green-500 text-white px-4 py-3 mt-4 rounded-xl hover:bg-green-600 transition-all font-semibold text-lg shadow-lg"
          >
            Guardar Configuración
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsServer;
