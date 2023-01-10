const navItem = document.querySelectorAll(".nav-item"),
  gridItem = document.querySelectorAll(".grid-item"),
  inputEl = document.querySelectorAll("input[type='text']"),
  checkBox = document.querySelectorAll(".check"),
  service = document.querySelectorAll(".service"),
  alertPara = document.querySelectorAll(".alert"),
  slider = document.getElementById("slider"),
  nineDollars = document.getElementById("nine-dollars"),
  twelveDollars = document.getElementById("twelve-dollars"),
  fifteenDollars = document.getElementById("fifteen-dollars"),
  monthly = document.getElementById("monthly"),
  yearly = document.getElementById("yearly"),
  free = document.querySelectorAll(".free"),
  exitPageOneBtn = document.getElementById("page-two"),
  exitPageTwoBtn = document.getElementById("page-three"),
  exitPageThreeBtn = document.getElementById("page-four"),
  backToPageOne = document.getElementById("back-one"),
  backToPageTwo = document.getElementById("back-two"),
  backToPageThree = document.getElementById("back-three"),
  r = document.querySelector(":root"),
  rs = getComputedStyle(r),
  darkBlue = rs.getPropertyValue("--color-primary-mb"),
  lightBlue = rs.getPropertyValue("--color-neutral-ma"),
  grey = rs.getPropertyValue("--color-neutral-cg"),
  addOnsRates = document.querySelectorAll(".rate"),
  typeOfPlan = document.querySelector(".plan-type"),
  planDesc = document.querySelector(".desc"),
  planRate = document.querySelector(".plan-rate"),
  serviceTitle = document.querySelectorAll(".middle"),
  serviceRate = document.querySelectorAll(".rate"),
  selectedService = document.querySelectorAll(".service-selected"),
  selectedRate = document.querySelectorAll(".per-month"),
  total = document.querySelector(".total"),
  pageFiveBtn = document.getElementById("page-five"),
  month = document.getElementById("month"),
  year = document.getElementById("year"),
  totalPerMonth = document.getElementById("per-month"),
  refreshForm = document.getElementById("refresh"),
  changeSelection = document.getElementById("change"),
  monthlyParagraph = document.createElement("p"),
  yearlyParagraph = document.createElement("p");

let rates = [9, 12, 15];
let addonsRate = [1, 2, 2];
let sum;

//EVENT LISTENERS

// navItem.forEach((item) => {
//   item.addEventListener("click", function changeBackgroundColor() {
//     let current = document.querySelector(".active");
//     current.className = current.className.replace(" active", "");
//     this.firstElementChild.className += " active";
//   });
// });

gridItem.forEach((item) => {
  item.addEventListener("click", function changeBgAndBorder() {
    let current = document.querySelector(".active-div");
    if (current === null) {
      item.classList.add("active-div");
      typeOfPlan.textContent = item.children[1].children[0].textContent;
    } else if (item === current) {
      return;
    } else {
      current.classList.remove("active-div");
      item.classList.add("active-div");
      typeOfPlan.textContent = item.children[1].children[0].textContent;
    }
    planRate.textContent = item.children[1].children[1].textContent;
    exitPageTwoBtn.setAttribute("href", "#step-three");
    pageFiveBtn.setAttribute("href", "#step-five");
    monthlyYearlyToggle();
  });
});

exitPageOneBtn.addEventListener("click", goToPageTwo);
exitPageTwoBtn.addEventListener("click", goToPageThree);
exitPageThreeBtn.addEventListener("click", goToPageFour);
backToPageOne.addEventListener("click", goToPageOne);
backToPageTwo.addEventListener("click", goToPrevPage);
changeSelection.addEventListener("click", goToPrevPage);
backToPageThree.addEventListener("click", goToThirdPage);
slider.addEventListener("click", monthlyYearlyToggle);
refreshForm.addEventListener("click", reloadPage);

inputEl.forEach((input) => {
  input.addEventListener("input", addAttribute);
  input.addEventListener("focusout", changeBorderColor);
  input.addEventListener("focus", defaultBorderColor);
});

checkBox.forEach((box, index) => {
  box.addEventListener("click", function changeOutline() {
    box.checked
      ? `${
          (service[index].classList.add("active-div"),
          (service[index].style.borderColor = darkBlue),
          (selectedService[index].textContent =
            serviceTitle[index].firstElementChild.textContent),
          (selectedRate[index].textContent = serviceRate[index].textContent))
        }`
      : `${
          (service[index].classList.remove("active-div"),
          (service[index].style.borderColor = grey),
          (selectedService[index].textContent = ""),
          (selectedRate[index].textContent = ""))
        }`;
    calculateSum();
  });
});

//FUNCTION DECLARATIONS

function calculateSum() {
  let ratesArr = [];
  selectedRate.forEach((rate) => {
    if (rate.textContent === "") {
      return;
    } else {
      ratesArr.push(parseInt(rate.textContent.match(/(\d+)/)[0], 10));
    }
  });
  sum =
    parseInt(planRate.textContent.match(/(\d+)/)[0], 10) +
    ratesArr.reduce((a, b) => a + b, 0);

  sum > 30
    ? (total.children[1].textContent = `$${sum}/yr`)
    : (total.children[1].textContent = `$${sum}/mo`);
}

function insertValue() {
  checkBox.forEach((box, index) => {
    box.checked
      ? `${(selectedRate[index].textContent = serviceRate[index].textContent)}`
      : `${(selectedRate[index].textContent = "")}`;
  });
}

function goToPageTwo() {
  inputEl.forEach((input, index) => {
    if (input.value === "") {
      input.style.borderColor = "red";
      alertPara[index].style.display = "block";
    } else if (exitPageOneBtn.getAttribute("href") !== null) {
      let current = document.querySelector(".active");
      current.className = current.className.replace(" active", "");
      navItem[1].firstElementChild.className += " active";
    }
  });
}

function goToPageThree() {
  if (exitPageTwoBtn.getAttribute("href") === "#step-three") {
    let current = document.querySelector(".active");
    current.className = current.className.replace(" active", "");
    navItem[2].firstElementChild.className += " active";
  }
}

function goToPageFour() {
  let current = document.querySelector(".active");
  current.className = current.className.replace(" active", "");
  navItem[3].firstElementChild.className += " active";
}

function goToPageOne() {
  let current = document.querySelector(".active");
  current.className = current.className.replace(" active", "");
  navItem[0].firstElementChild.className += " active";
}

function goToPrevPage() {
  let current = document.querySelector(".active");
  current.className = current.className.replace(" active", "");
  navItem[1].firstElementChild.className += " active";
}

function goToThirdPage() {
  let current = document.querySelector(".active");
  current.className = current.className.replace(" active", "");
  navItem[2].firstElementChild.className += " active";
}

function changeBorderColor(e) {
  e.target.style.borderColor = grey;
}

function defaultBorderColor(e) {
  e.target.style.borderColor = darkBlue;
  e.target.previousElementSibling.children[1].style.display = "none";
}

function addAttribute() {
  if (
    inputEl[0].value !== "" &&
    inputEl[1].value !== "" &&
    inputEl[2].value !== ""
  ) {
    exitPageOneBtn.setAttribute("href", "#step-two");
  } else {
    exitPageOneBtn.removeAttribute("href");
  }
}

function reloadPage() {
  window.location.reload();
}

function monthlyYearlyToggle() {
  slider.checked
    ? `${
        ((nineDollars.textContent = `$${rates[0] * 10}/yr`),
        (twelveDollars.textContent = `$${rates[1] * 10}/yr`),
        (fifteenDollars.textContent = `$${rates[2] * 10}/yr`),
        (addOnsRates[0].textContent = `+$${addonsRate[0] * 10}/yr`),
        (addOnsRates[1].textContent = `+$${addonsRate[1] * 10}/yr`),
        (addOnsRates[2].textContent = `+$${addonsRate[1] * 10}/yr`),
        (totalPerMonth.textContent = "Total per year"),
        writeYearly(),
        free.forEach((paragraph) => {
          paragraph.style.display = "block";
        }),
        (yearly.style.color = darkBlue),
        (monthly.style.color = grey))
      } `
    : `${
        ((nineDollars.textContent = `$${rates[0]}/mo`),
        (twelveDollars.textContent = `$${rates[1]}/mo`),
        (fifteenDollars.textContent = `$${rates[2]}/mo`),
        (addOnsRates[0].textContent = `+$${addonsRate[0]}/mo`),
        (addOnsRates[1].textContent = `+$${addonsRate[1]}/mo`),
        (addOnsRates[2].textContent = `+$${addonsRate[1]}/mo`),
        (totalPerMonth.textContent = "Total per month"),
        writeMonthly(),
        free.forEach((paragraph) => {
          paragraph.style.display = "none";
        }),
        (yearly.style.color = grey),
        (monthly.style.color = darkBlue))
      }`;
  gridItem.forEach((item) => {
    if (item.classList.contains("active-div")) {
      planRate.textContent = item.children[1].children[1].textContent;
    }
  });
  insertValue();
  if (sum === undefined) {
    return;
  } else {
    calculateSum();
  }
}

monthlyParagraph.textContent = "(Monthly)";
yearlyParagraph.textContent = "(Yearly)";

function writeMonthly() {
  for (let i = 0; i < planDesc.children.length; i++) {
    if (planDesc.children[i] === yearlyParagraph) {
      planDesc.removeChild(yearlyParagraph);
    }
    planDesc.appendChild(monthlyParagraph);
  }
}

function writeYearly() {
  for (let i = 0; i < planDesc.children.length; i++) {
    if (planDesc.children[i] === monthlyParagraph) {
      planDesc.removeChild(monthlyParagraph);
    }
    planDesc.appendChild(yearlyParagraph);
  }
}
