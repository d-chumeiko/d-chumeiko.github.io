let offeringPopup = document.querySelector('.offering_popup');
let offeringPopupButton = document.querySelector('.offering_show-form-button');
let popupClose = document.querySelector('.popup-close');

offeringPopupButton.addEventListener('click', showPopup);
popupClose.addEventListener('click', closePopup);

function showPopup(event) {
  event.preventDefault();
  offeringPopup.classList.toggle('offering_popup--hidden');
}

function closePopup(event) {
  event.preventDefault();
  offeringPopup.classList.add('offering_popup--hidden');
}
