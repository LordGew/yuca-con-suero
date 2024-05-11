import React from "react";

const Footer = () => {
  return (
    <div className="grid gap-4 justify-items-center py-6 bg-midnight sm:flex sm:justify-between sm:items-center">
      <div className="flex flex-col items-center text-center sm:ml-4">
        <p className="text-white mb-2 text-lg md:text-xl lg:text-2xl xl:text-2xl">
          Síguenos en nuestras redes sociales
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <img
              src="../img/footer/facebook.png"
              alt="FacebookIcon"
              className="w-8 h-8 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../img/footer/instagram.png"
              alt="InstagramIcon"
              className="w-8 h-8 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src="../img/footer/whatsapp.png"
              alt="WhatsAppIcon"
              className="w-8 h-8 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>
      </div>

      <p className="text-lg md:text-xl lg:text-1xl xl:text-1xl text-white sm:mt-0">
        Derechos reservados Sierra-code@ 2023
      </p>

      <div className="flex flex-col gap-2 text-center sm:mr-20 text-lg md:text-xl lg:text-2xl xl:text-2xl">
        <p className="text-white title-wow">Términos y condiciones</p>
        <p className="text-white title-wow">Política de privacidad</p>
      </div>
    </div>
  );
};

export default Footer;
