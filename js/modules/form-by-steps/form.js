import FormEvents from "./form_events.js";
import FormValidation from "./form_validation.js";

export default class Form {
  constructor() {
    this.formEvents = new FormEvents();
    this.formValidation = new FormValidation();
    this.initSendFormAction();
  }

  initSendFormAction() {
    this.formEvents.initSendFormEvent(this.sendForm.bind(this));
  }

  sendForm() {
    // Escribir aquí el código para enviar todos los datos del formulario.
    // enviar a https://reqres.in/api/users (Esta web sirve para realizar pruebas REST API, por lo tanto NO ENVIAR DATOS REALES)
    // la API retorna un JSON con el id del usuario creado y la info guardada.
    // Para mas info ver en https://reqres.ins

    console.log("Sending form data...");
    $.ajax({
      url: "https://reqres.in/api/users",
      type: "POST",
      dataType: "json",
      data: $(".form").serialize(),
      success: function (response) {
        console.log(response);
        window.alert("Datos enviados con éxito.");
      },
      error: function (response) {
        window.alert("Hubo un error al enviar los datos.");
      },
    });
  }
}
