let pagina = 1;

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

function iniciarApp() {
  mostrarServicios();

  //reslta el div actual segun el tab al cual se seleccionada
  mostrarSeccion();

  // oculta o muestra una seccion segun el tab se presiona
  cambiarSeccion();
}

function mostrarSeccion() {
  const seccionActual = document.querySelector(`#paso-${pagina}`);
  seccionActual.classList.add("mostrar-seccion");

  //reslta el tab actual

  const tab = document.querySelector(`[data-paso="${pagina}"]`);
  tab.classList.add("actual");
}

function cambiarSeccion() {
  const enlaces = document.querySelectorAll(".tabs button");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      pagina = parseInt(e.target.dataset.paso);
      console.log(pagina);

      // Eliminar mostrar-seccion de la sección anterior
      document
        .querySelector(".mostrar-seccion")
        .classList.remove("mostrar-seccion");

      //agrega mostrar-seccion donde dimos click
      const seccion = document.querySelector(`#paso-${pagina}`);
      seccion.classList.add("mostrar-seccion");

      //eliminar la clase actual en el tab anterior
      document.querySelector(".tabs .actual").classList.remove("actual");

      //agregar la clase actual en el tab actual
      const tabActual = document
        .querySelector(`[data-paso="${pagina}"]`)
        .classList.add("actual");
    });
  });
}

async function mostrarServicios() {
  try {
    const resultado = await fetch("./servicios.json");
    const db = await resultado.json();

    const { servicios } = db;

    //Generar HTML

    servicios.forEach((servicio) => {
      const { id, nombre, precio } = servicio;

      //DOM Scripting
      //Generar Nombre del serivicio.
      const nombreServicio = document.createElement("P");
      nombreServicio.textContent = nombre;
      nombreServicio.classList.add("nombre-servicio");

      //Generar Precio del servicio
      const precioServicio = document.createElement("P");
      precioServicio.textContent = `$ ${precio}`;
      precioServicio.classList.add("precio-servicio");

      //generar div contenedor
      const servicioDiv = document.createElement("DIV");
      servicioDiv.classList.add("servicio");
      servicioDiv.dataset.idServicio = id;

      //selecciona un servicio para la cita.

      servicioDiv.onclick = seleccionarServicio;

      //inyectar precio y nombre al div servicio
      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);

      //inyectarlo en el HTML
      document.querySelector("#servicios").appendChild(servicioDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

function seleccionarServicio(e) {
  //forzar que el elemento al cual le damos click es el DIV
  let elemento;
  if (e.target.tagName === "P") {
    elemento = e.target.parentElement;
  } else {
    elemento = e.target;
  }

  if (elemento.classList.contains("seleccionado")) {
    elemento.classList.remove("seleccionado");
  } else {
    elemento.classList.add("seleccionado");
  }
}
