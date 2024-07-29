"use strict";

const buttonBasla = document.querySelector(".bala-wrapper");
const buttonAnaSayfa = document.querySelector(".ana-sayfa");
const buttonHakkimizda = document.querySelector(".hakkmzda");
const buttonBizeUlasin = document.querySelector(".bize-ulan");

buttonBasla.addEventListener("click", function () {
  window.location.href = "login";
});

// sayfa eklenince aktive edilecek
// buttonAnaSayfa.addEventListener("click", function () {});

buttonHakkimizda.addEventListener("click", function () {
  window.location.href = "aboutUs";
});

// sayfa eklenince aktive edilecek
// buttonBizeUlasin.addEventListener("click", function () {});

buttonBizeUlasin.addEventListener("click", function () {
  window.location.href = "contact";
});