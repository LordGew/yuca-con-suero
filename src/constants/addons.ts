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
        image: "https://static.wixstatic.com/media/5dd8a0_8c5b7a3a15014ad599ca7a0d6d6dfa35~mv2.jpg",
        CardTitle: "Launcher",
        titleHref: "https://www.mediafire.com/file/vrjxkd7hugh2x7x/Entropiux_Launcher.rar/file",
        btnHref: "https://www.mediafire.com/file/vrjxkd7hugh2x7x/Entropiux_Launcher.rar/file",
        CardDescription: "Accede a tu cuenta de juego y descarga el cliente de juego desde aquí.",
        Button: "Descargar"
    }
];
