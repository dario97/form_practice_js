export default class Form_Events {
    constructor() {
      this.initPrevNextButtons();
      this.initSelect();
      this.initListenInputChangeEvent();
    }
  
    initPrevNextButtons() {
      let $prevButton = $(".js-previous");
      let $nextButton = $(".js-next");
  
      $prevButton.click(this.previousAction.bind(this));
      $nextButton.click(this.nextAction.bind(this));
    }
  
    initListenInputChangeEvent() {
      this.enabledDisabledFinishButton();
      window.addEventListener(
        "input",
        this.enabledDisabledFinishButton.bind(this)
      );
      // $(":input").change(this.enabledDisabledFinishButton.bind(this));
    }
  
    initSelect() {
      let $select = $("#childGroupSelectUnder18");
      let $childreData = $(".childrenData");
  
      if (!$select[0].value) {
        $childreData.addClass("d-none");
      }
  
      $select.change(this.changeChildren.bind(this));
    }
  
    initSendFormEvent(callback) {
      let string = "2ewae";
  
      let $sendForm = $(".js-sendForm");
      $sendForm.click(callback);
    }
  
    goToStep(step, direction = "next") {
      // 2) Simplifica esta función para que sean menos líneas.
      let currentStep = step.replace(/^step\-/, "");
      let goToStep = ".step-";
  
      switch (currentStep) {
        case "1":
          goToStep += "2";
          this.progressBar(50);
          break;
  
        case "2":
          if ("prev" === direction) {
            goToStep += "1";
            this.progressBar(25);
          } else {
            goToStep += "3";
            this.progressBar(75);
          }
          break;
        case "3":
          goToStep += "2";
          this.progressBar(50);
          break;
        default:
          break;
      }
      return goToStep;
    }
  
    enabledDisabledFinishButton() {
      let $finish = $(".js-finish");
      let $form = $(".form")[0];
  
      if ($form.checkValidity() === false) {
        $finish.prop("disabled", true);
      } else {
        $finish.prop("disabled", false);
      }
    }
  
    hideStep(evt) {
      let $current = $(evt.currentTarget);
      let $formStep = $current.parents(".form-step");
  
      $formStep.addClass("d-none");
  
      return $formStep;
    }
  
    previousAction(evt) {
      let $formStep = this.hideStep(evt);
  
      let $prevStep = $(this.goToStep($formStep[0].classList[1], "prev"));
      $prevStep.removeClass("d-none");
    }
  
    nextAction(evt) {
      // 3) ¿Se puede evitar repetir mismas líneas que en previousAction? DONE
      let $formStep = this.hideStep(evt);
      let $nextStep = $(this.goToStep($formStep[0].classList[1]));
      $nextStep.removeClass("d-none");
    }
  
    changeChildren(evt) {
      let $childreData = $(".childrenData");
      let $current = evt.currentTarget;
  
      if ($current.value) {
        $childreData.removeClass("d-none");
      } else {
        $childreData.addClass("d-none");
      }
  
      this.setChildrenForm($current.value);
    }
  
    setChildrenForm(childrenNumber) {
      var childrendForms = [];
      for (let index = 0; index < childrenNumber; index++) {
        var childNumber = index + 1;
        childrendForms.push(
          $(`
        <div class="col-md-1 mb-3">
        <label>Child</label>
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect${childNumber}">#${childNumber}</label>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="childName${childNumber}">First name</label>
        <input type="text" class="form-control" name="inputChildName${childNumber}" id="childName${childNumber}" placeholder="First name" value="Mark Jr." required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="childLastName${childNumber}">Last name</label>
        <input type="text" class="form-control" name="inputChildLastName${childNumber}" id="childLastName${childNumber}" placeholder="Last name" value="Otto" required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <label for="childBirthdate${childNumber}">Birthdate</label>
        <input type="text" class="form-control" name="inputChildBirthDate${childNumber}" id="childBirthdate${childNumber}" placeholder="mm/dd/yyyy" value="" required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
        `)
        );
      }
      $(".childrenData").html(childrendForms);
    }
  
    progressBar(percent) {
      // 1) Escribir aqui como sería la lógica para incrementar la barra de porcentaje. DONE
      let $progressBar = $(".progress-bar");
  
      $progressBar.css("width", percent + "%").html(percent + "%");
    }
  }
  