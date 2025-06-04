/*
  addonsAvailable: Lista de objetos que representan addons disponibles para mostrar en tarjetas.

  Cada objeto debe tener las siguientes propiedades:
  - image: URL de la imagen representativa del addon.
  - CardTitle: Título que se mostrará en la tarjeta.
  - titleHref: Enlace al que redirige el título.
  - btnHref: Enlace que usará el botón.
  - CardDescription: Descripción corta del addon.
  - Button: Texto que se mostrará en el botón de acción.

  Si tienes dudas sobre cómo agregar o modificar addons,
  visita la wiki: https://github.com/ManuChitiva/wow-libre-web/wiki/Agregar-m%C3%A1s-addons-para-descargar
*/
export const addonsAvailable = [
    {
        image: "https://c.wallhere.com/photos/9c/e8/World_of_Warcraft_World_of_Warcraft_The_War_Within_Warcraft_Blizzard_Entertainment-2285864.jpg!s1",
        CardTitle: "EntropiuX Launcher",
        titleHref: "https://www.entropiux.com/news/17",
        btnHref: "https://www.entropiux.com/news/17",
        CardDescription: "Nosotros lo hacemos simple, sigue nuestra guía aquí",
        Button: "Guia de Instalación",
    }
];
