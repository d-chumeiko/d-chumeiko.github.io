const currentDomain = document.domain

if (currentDomain === 'localhost' || currentDomain === '192.168.0.104' || currentDomain === '127.0.0.1' || currentDomain === 'covid-online.kl.com.ua') {

  $.ajax({
    url: 'https://covid19-server.chrismichael.now.sh/api/v1/AllReports',
    success: function (data) {
      const commonData = data.reports[0].table[0][0];
      const byCountriesData = data.reports[0].table[0];

      showCommonStatistic(commonData);

      showTableRows(commonData, byCountriesData, 'world');
      showTableRows(commonData, byCountriesData, 'europe');
      showTableRows(commonData, byCountriesData, 'asia');
      showTableRows(commonData, byCountriesData, 'north-america');
      showTableRows(commonData, byCountriesData, 'south-america');
      showTableRows(commonData, byCountriesData, 'africa');
      showTableRows(commonData, byCountriesData, 'australia-oceania');
    }
  });

}

  function showTableRows(common, data, id) {
    const table = document.querySelector(`#${id}`);
    let out = createTableThead();

    for (let i = 1, len = data.length; i < len; i++) {
      let el = data[i];

      if (id === 'world' && el.Country !== 'Total:') out += createTableRow(el);

      if (id === 'europe' && el.Continent === 'Europe') out += createTableRow(el);

      if (id === 'asia' && el.Continent === 'Asia') out += createTableRow(el);

      if (id === 'north-america' && el.Continent === 'North America') out += createTableRow(el);

      if (id === 'south-america' && el.Continent === 'South America') out += createTableRow(el);

      if (id === 'africa' && el.Continent === 'Africa') out += createTableRow(el);

      if (id === 'australia-oceania' && el.Continent === 'Australia/Oceania') out += createTableRow(el);

    }

    table.innerHTML = out;
    const tBody = table.querySelector('tbody');

    id === 'world' ? tBody.insertAdjacentHTML('afterbegin', showTotalTableRow(table, common, 'world')) : tBody.insertAdjacentHTML('afterbegin', showTotalTableRow(table, common));
    setupTable(id);
    showPercentageRatio(table)
  }

  function showPercentageRatio(table) {
    const parent = table.closest('.statistic-table').querySelector('.percentage-ratio');
    const tableTotalInfo = table.querySelector('tbody').firstElementChild;

    parent.innerHTML = createPercentageRatio(tableTotalInfo);
  }

  function createPercentageRatio(key) {
    const tableTotalCases = key.querySelector('.table__total-cases').textContent;
    const tableTotalDeaths = key.querySelector('.table__total-deaths').textContent;
    const tableTotalRecovered = key.querySelector('.table__total-recovered').textContent;

    let recovered = Math.round(100 * tableTotalRecovered.split(',').join('') / tableTotalCases.split(',').join(''));
    let deaths = Math.round(100 * tableTotalDeaths.split(',').join('') / tableTotalCases.split(',').join(''));

    return `
      <p>Процент выздоровевших</p>
      <div class="progress">
        <div id="progress-recovered" class="progress-bar" role="progressbar" style="width: ${recovered}%;"
          aria-valuenow="${recovered}" aria-valuemin="0" aria-valuemax="100">${recovered}%</div>
      </div>
      <p>Процент летальных исходов</p>
      <div class="progress">
        <div id="progress-deceased" class="progress-bar bg-danger" role="progressbar" style="width: ${deaths}%;"
          aria-valuenow="${deaths}" aria-valuemin="0" aria-valuemax="100">${deaths}%</div>
      </div>
      <div class="animated-scroll__wrapper"><img class="animated-scroll" src="./img/swipe-table.gif"/></div>
      
    `
  }

  function showTotalTableRow(table, data, id) {
    const cases = table.querySelectorAll('.country-cases');
    const todayCases = table.querySelectorAll('.country-today-cases');
    const deaths = table.querySelectorAll('.country-deaths');
    const todayDeaths = table.querySelectorAll('.country-today-deaths');
    const recovered = table.querySelectorAll('.country-recovered');

    return `
    <tr class="table__total-data-row">
      <td>Всего</td>
      <td class="table__total-cases confirmed-custom-clr">
      ${id === 'world' ? data.TotalCases : calculateTotalTableValues(cases)}</td>
      <td class="table__total-cases--today confirmed-custom-clr">${id === 'world' ?  data.NewCases : calculateTotalTableValues(todayCases)}</td>
      <td class="table__total-deaths deceased-custom-clr">${id === 'world' ? data.TotalDeaths : calculateTotalTableValues(deaths)}</td>
      <td class="table__total-deaths--today deceased-custom-clr">${id === 'world' ? data.NewDeaths : calculateTotalTableValues(todayDeaths)}</td>
      <td class="table__total-recovered recovered-custom-clr">${ id === 'world' ? data.TotalRecovered : calculateTotalTableValues(recovered)}</td>
      </tr>
    `
  }

  function calculateTotalTableValues(i) {
    const arr = [];
    let sum = 0;
    i.forEach(el => {
      let item = Number(el.innerHTML.split(',').join(''));
      if (item) sum += item;
    })
    let s = sum.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
    arr.push(s)
    return arr;
  }

  function createTableRow(key) {
    return `
      <tr>
        <td>${key.Country in rusCountries? rusCountries[key.Country] : key.Country}</td>
        <td class="country-cases confirmed-custom-clr"">${key.TotalCases}</td>
        <td class="country-today-cases confirmed-custom-clr"">${key.NewCases}</td>
        <td class="country-deaths deceased-custom-clr">${key.TotalDeaths}</td>
        <td class="country-today-deaths deceased-custom-clr">${key.NewDeaths}</td>
        <td class="country-recovered recovered-custom-clr">${key.TotalRecovered}</td>
      </tr>
    `
  }

  function createTableThead() {
    return `
    <thead>
      <tr>
        <th>Страна</th>
        <th class="confirmed-custom-clr">Подтверждено</th>
        <th class="confirmed-custom-clr">сегодня</th>
        <th class="deceased-custom-clr">Скончалось</th>
        <th class="deceased-custom-clr">сегодня</th>
        <th class="recovered-custom-clr">Выздоровело</th>
      </tr>
    </thead>
    <tbody>
    `
  }

  function createCommonStatistic(key) {
    return `
      <div class="aside-statistic__block aside-statistic__confirmed">
        <h3>${key.TotalCases}</h3>
        <span>Подтверждено</span>
        <h3>${key.NewCases}</h3>
        <span>Сегодня</span>
      </div>
      <div class="aside-statistic__block aside-statistic__recovered">
        <h3>${key.TotalRecovered}</h3>
        <span>Выздоровело</span>
      </div>
      <div class="aside-statistic__block aside-statistic__deceased">
        <h3>${key.TotalDeaths}</h3>
        <span>Летальные исходы</span>
        <h3>${key.NewDeaths}</h3>
        <span>Сегодня</span>
      </div>
      <span class="aside-statistic__just-updated">Обновлено несколько секунд назад
      </span>
    `
  }

  function showCommonStatistic(common) {
    document.querySelector('.aside-statistic__values').innerHTML = createCommonStatistic(common);
  }

  function setupTable(id) {
    $(`#${id}`).DataTable({
      "scrollY": "400px",
      "scrollX": true,
      "scrollCollapse": true,
      "paging": false,
      "info": false,
      "order": [
        [1, "desc"]
      ],
      "mobile-l.scrollY": "200px"
    });
  }

  $(function () {
    $('a[href^="#"]').on('click', function (event) {
      event.preventDefault();

      var sc = $(this).attr("href"),
        dn = $(sc).offset().top;

      $('html, body').animate({
        scrollTop: dn
      }, 1000);

    });
  });

  (function () {
    var forms = document.getElementsByClassName('needs-validation');

    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit',
        function (event) {
          event.preventDefault();

          if (form.checkValidity() === false) {
            event.stopPropagation();
            event.preventDefault();
          }

          form.classList.add('was-validated');

          if (form.checkValidity() === true) {
            $.ajax({
              type: "POST",
              url: "telegram.php",
              data: $(this).serialize()
            }).done(function () {
              $('.js-overlay-thank-you').fadeIn();
              $(this).find('input').val('');
              form.classList.remove('was-validated');
              $('#form').trigger('reset');
            });
          }


        });
    });

  })();

  // Закрыть попап «спасибо»
  $('.js-close-thank-you').click(function () { // по клику на крестик
    $('.js-overlay-thank-you').fadeOut();
  });

  $(document).mouseup(function (e) { // по клику вне попапа
    var popup = $('.popup');
    if (e.target != popup[0] && popup.has(e.target).length === 0) {
      $('.js-overlay-thank-you').fadeOut();
    }
  });

  const btn = $('#button-to-top');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });
