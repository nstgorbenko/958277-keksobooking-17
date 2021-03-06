'use strict';
(function () {
  var NO_GUESTS_HOUSE = '100';
  var RoomGuestsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  /**
   * Добавляет HTML-элементам атрибут disabled
   * @param {NodeList} elements - набор HTML-элементов
   */
  var makeDisabled = function (elements) {
    elements.forEach(function (newElement) {
      newElement.disabled = true;
    });
  };

  /**
   * Удаляет у HTML-элементов атрибут disabled
   * @param {NodeList} elements - набор HTML-элементов
   */
  var makeActive = function (elements) {
    elements.forEach(function (newElement) {
      newElement.disabled = false;
    });
  };

  /**
   * Устанавливает значение атрибутов min и placeholder для поля 'Цена за ночь, руб' в соответствии с выбранным типом жилья
   */
  var onHouseTypeChange = function () {
    price.min = window.util.HouseTypeMap[houseType.value].minPrice;
    price.placeholder = window.util.HouseTypeMap[houseType.value].minPrice;
  };

  /**
   * Синхронизирует значения полей 'Время заезда' и 'Время выезда'
   * @param {Object} evt - объект события 'change'
   */
  var onInOutTimeChange = function (evt) {
    if (evt.target === timeIn) {
      timeOut.selectedIndex = timeIn.selectedIndex;
    } else {
      timeIn.selectedIndex = timeOut.selectedIndex;
    }
  };

  /**
   * Проверяет соотвествие полей 'Количество комнат' и 'Количество мест'
   */
  var onRoomsGuestsChange = function () {
    var isCapacityEnough = RoomGuestsMap[roomNumber.value].some(function (elem) {
      return elem === Number(capacity.value);
    });
    var message = '';

    if (!isCapacityEnough) {
      message = roomNumber.value === NO_GUESTS_HOUSE ? 'Допустимое значение - не для гостей' : 'Допустимое количество гостей - не более ' + Math.max.apply(Math, RoomGuestsMap[roomNumber.value]) + ', но больше 0';
    }
    capacity.setCustomValidity(message);
  };

  var address = document.querySelector('[name = "address"]');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('input, select, textarea');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFields = mapFilters.querySelectorAll('input, select');
  var houseType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  address.value = window.util.MAIN_PIN_START_ADDRESS;
  makeDisabled(adFormFields);
  makeDisabled(mapFiltersFields);

  window.form = {
    address: address,
    adForm: adForm,
    adFormFields: adFormFields,
    mapFilters: mapFilters,
    mapFiltersFields: mapFiltersFields,
    houseType: houseType,
    timeIn: timeIn,
    timeOut: timeOut,
    roomNumber: roomNumber,
    capacity: capacity,

    makeActive: makeActive,
    makeDisabled: makeDisabled,
    onHouseTypeChange: onHouseTypeChange,
    onInOutTimeChange: onInOutTimeChange,
    onRoomsGuestsChange: onRoomsGuestsChange
  };
})();
