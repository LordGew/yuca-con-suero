"use client";
import SingleCard from "@/components/contributions/card";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { addonsAvailable } from "@/constants/addons";
import { wowClients } from "@/constants/wowClients";

import Link from "next/link";

const Contributions = () => {
  return (
    <div>
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>

      <div
        className="text-white mb-20 mt-14"
        style={{
          background: "linear-gradient(110deg, #8e44ad, #2980b9)",
        }}
      >
        <div className="contenedor mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-7">
                 ¿Por qué debo usar el cliente de Blizzard y no el de EntropiuX?
                 </h2>
                <p className="text-base sm:text-xl lg:text-2xl mb-4 break-words">
                 Nuestro servidor utiliza el cliente oficial de Blizzard, el cual no proveemos ya que ellos lo actualizan con frecuencia, lo cual podría afectar al servidor.
                </p>
              </div>
              <div className="mt-8 sm:mt-10">
                <Link
                target="_blank"
                  href="https://download.battle.net/en-us?product=bnetdesk"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold block text-center sm:inline-block"
                >
                  ¡Cliente Oficial!
                </Link>
                <p className="text-lg pt-4 text-center sm:text-left break-words">
                 Vas a necesitar crear una cuenta para descargar el cliente oficial de wow, no te preocupes, no tendrás que pagar nada.
                </p>
              </div>
            </div>
            {/* Ocultar imágenes en mobile y mostrarlas en sm+ */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4 lg:gap-8 items-center">
              <div className="relative h-[450px] w-full select-none">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_423a9b289cbb4211aeec71a2ca145926~mv2.webp"
                  alt="Decorations"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-[450px] w-full select-none">
                <img
                  src="https://static.wixstatic.com/media/5dd8a0_7541713497634f41807acf80546c561c~mv2.webp"
                  alt="AzerothCore"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    

      <section>
        <div className="contenedor pt-15 pb-20 space-y-32 lg:space-y-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Clientes &<span className="sm:block">Guias</span>
            </h1>
            <p className="text-white mx-auto max-w-xl sm:text-1xl/relaxed">
              ¡Domina Azeroth con el mejor contenido a tu alcance! 🚀🔥
            </p>
          </div>

          {wowClients.map((feature, index) => (
            <div
              key={index}
              className={`bg-gray-900 lg:grid lg:max-w-9xl lg:grid-cols-2 lg:gap-32 lg:px-16 ${
                feature.reverse ? "lg:grid-flow-col-dense lg:col-start-2" : ""
              }`}
            >
              <div className="max-w-2xl px-4 lg:max-w-none lg:py-24">
                <div>
                  <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-pink-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-10 w-10 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={feature.icon}
                      />
                    </svg>
                  </span>
                  <h2 className="text-4xl font-bold tracking-tight text-white mt-8">
                    {feature.title}
                  </h2>
                <p className="mt-6 text-xl text-gray-300">
                  {feature.description}{" "}
                  <a
                    href="https://www.entropiux.com/news/17"
                    className="text-pink-400 underline hover:text-pink-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {feature.sub_title}
                  </a>{" "}
                  {feature.description2}
                </p>
                  <div className="mt-8">
                    <a
                      target="_blank"
                      className="inline-flex rounded-lg bg-pink-600 px-6 py-2 text-lg font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                      href={feature.url}
                    >
                      {feature.btnText}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-10 sm:mt-20 lg:mt-0 flex justify-center">
                <img
                  className="max-w-full w-[90%] sm:w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 mx-auto m-10"
                  src={feature.image}
                  alt={feature.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contributions;
