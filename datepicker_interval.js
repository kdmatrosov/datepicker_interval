window.onload = function () {

    var Pickers = new DomAssitant().gt(null, "datepicker-interval");
    var datePickers = [];
    for (var i = 0, len = Pickers.length; i < len; i++) {
        (function() {
            var da = new DomAssitant();
            var new_datepicker = da.ce('div').addClass('di-picker');
            new_datepicker
                .on('click', function (e) {

                    if (!e.target.hasAttribute('panel') && !e.target.parentNode.hasAttribute('panel') &&
                        !e.target.parentNode.hasAttribute('data')
                    && !e.target.classList.contains('di-picker__day')) {
                        console.log(e);
                        d_panel.currentElement.classList.toggle('dspl-none');
                    }
                });

            var d_input_start = initElem(new_datepicker, 'input').addClass('di-picker__value').attr("id", Pickers[0].getAttribute("id")+'_start')
                .attr('type', 'text').attr('placeholder', 'дд.мм.гг')
                //.attr('value', '02.08.2015')
                .on('blur', function (e) {
                    //d_panel.addClass('dspl-none');
                })
                .on('click', function (e) {

                    showMonth();
                });
            var d_dash = initElem(new_datepicker, 'div', '\u2014').addClass('di-dash');
            var d_input_end = initElem(new_datepicker, 'input').addClass('di-picker__value').attr("id", Pickers[0].getAttribute("id")+'_end')
                .attr('type', 'text').attr('placeholder', 'дд.мм.гг')
                //.attr('value', '02.08.2015')
                .on('blur', function (e) {
                    //d_panel.addClass('dspl-none');

                })
                .on('click', function (e) {
                    showMonth();
                });
            var d_panel = initElem(new_datepicker, 'div').addClass('di-panel').addClass('dspl-none').attr('panel', '')
                .on('mouseenter', function (e) {
                })
                .on('mouseleave', function (e) {
                });

            var p_header = initElem(d_panel, 'div').addClass('diP-header').attr('panel', '');
            var p_header__prev = initElem(p_header, 'div', '&#8249;').addClass('diP-header__prev').on('click', function()
            {
                var self = d_input_end.getCE();
                var temp_year = self.y, temp_month = self.m;
                temp_year = (temp_month == 0) ? (--temp_year) : temp_year;
                temp_month = (temp_month == 0) ? 11 : (--temp_month);
                showMonth([temp_year, temp_month]);
            });
            var p_header__name = initElem(p_header, 'div').addClass('diP-header__name');
            var p_header__next = initElem(p_header, 'div', '&#8250;').addClass('diP-header__next').on('click', function()
            {
                var self = d_input_end.getCE();
                var temp_year = self.y, temp_month = self.m;
                temp_year = (temp_month == 11) ? (++temp_year) : temp_year;
                temp_month = (temp_month == 11) ? 0 : (++temp_month);
                showMonth([temp_year, temp_month]);
            });

            function showMonth(dt) // dt = [year, month]
            {
                var di_start = d_input_start.getCE();
                var di_end   = d_input_end.getCE();

                var dt__check = dt == null || dt == undefined || dt.length == 0;
                if (d_panel.hasClass('dspl-none') || !dt__check) {


                    var parentNode = di_start.parentNode;
                    var data = d_input_start.getDocumentElementsWithAttribute('data', '', parentNode)[0];
                    p_data__1.racfn();
                    p_data__2.racfn();
                    var y, m, d;
                    var today = new Date(),
                        ty = today.getFullYear(),
                        tm = today.getMonth(),
                        td = today.getDate();
                    var checkInputDate = function(date)
                    {
                        var d = date.value.split('.');
                        date.date = {
                            y: +d[2],
                            m: --d[1],
                            d: +d[0]
                        };
                        date.value = dateAssitant.getFormatedDate(date.date.y, date.date.m, date.date.d);
                        return date;
                    };
                    var getSelectedDates = function(inputs)
                    {
                        var m = inputs.m, y = inputs.y;
                        return [
                            (di_start.date    != undefined && y == di_start.date.y    && m == di_start.date.m)    ? +di_start.date.d   : 0,
                            (di_end.date      != undefined && y == di_end.date.y      && m == di_end.date.m)      ? +di_end.date.d     : 0];
                    };
                    if (dt__check) {
                        if (di_start.value == '' && di_end.value == '') {
                            y = ty;
                            m = tm;
                        }
                        else {
                            di_start    = checkInputDate(di_start);
                            di_end      = checkInputDate(di_end);
                            y = di_end.date.y;
                            m = di_end.date.m;
                        }
                    }
                    else
                    {
                        y = dt[0];
                        m = dt[1];
                    }
                    var inputs = [di_start, di_end], input__index = (di_start.index == undefined) ? 0 : +di_start.index;
                    inputs[1].y = y;
                    inputs[1].m = m;
                    inputs[0].y = m > 0 ? y : y - 1;
                    inputs[0].m = m > 0 ? m - 1: 11 ;

                    var curr_day = (inputs[0].y == ty && inputs[0].m == tm) ? td : 0;
                    var selected = getSelectedDates(inputs[0]);


                    var month = dateAssitant.getMonth(inputs[0].y, inputs[0].m);
                    p_header__name.text(dateAssitant.getMonthName(m) + ' ' + y);
                    var days = dateAssitant.getDays();
                    var week = initElem(p_data__1, 'div').addClass('di-picker__week');
                    var i = 0, len = days.length;
                    do {
                        initElem(week, 'div', days[i++]).addClass('di-picker__day_name');
                    } while (i < len);
                    i = 1;

                    len = month.length;
                    week = null;
                    var first__line = false;
                    do {
                        if (week == null || month[i] == 0) {
                            if (week == null) {
                                first__line = true;
                            }
                            week = initElem(p_data__1, 'div').addClass('di-picker__week');
                            if (first__line) {
                                first__line = false;
                                for (var j = 0; j < month[i]; j++) {
                                    initElem(week, 'div').addClass('di-picker__day_name').addClass('-empty');
                                }
                            }
                        }
                        var day = initElem(week, 'div', i).addClass('di-picker__day').on('click', function () {
                            var input = inputs[input__index];
                            input__index = (input__index + 1) % 2;
                            input.d = this.innerText || this.innerHTML;
                            input.value = dateAssitant.getFormatedDate(inputs[0].y, inputs[0].m, input.d);
                            input.date = {
                                y: inputs[0].y,
                                m: inputs[0].m,
                                d: input.d
                            };
                            if (inputs[input__index].value == '')
                            {
                                inputs[input__index].value = input.value;
                                inputs[input__index].date = input.date;
                            }
                            if (inputs[1].value != ''  && inputs[0].value != '') {
                                if (dateAssitant.compareDates(inputs[1].date, inputs[0].date)) {
                                    var temp = inputs[1].value;
                                    inputs[1].value = inputs[0].value;
                                    inputs[0].value = temp;
                                    temp = inputs[1].date;
                                    inputs[1].date = inputs[0].date;
                                    inputs[0].date = temp;
                                    input__index = 0;
                                }
                            }
                            di_start.index = input__index;
                            showMonth([inputs[1].y, inputs[1].m]);
                        });
                        if (curr_day == i)
                        {
                            day.addClass('-today');
                        }
                        if (~selected.indexOf(i))
                        {
                            day.addClass('-selected');
                        }
                        var this_day =
                        {
                            d: i,
                            m: inputs[0].m,
                            y: inputs[0].y
                        };

                        if (inputs[0].date != undefined && inputs[1].date != undefined) {
                            if (dateAssitant.compareDates(inputs[0].date, this_day)&&dateAssitant.compareDates(this_day,inputs[1].date))
                            {
                                day.addClass('-interval');
                            }
                        }
                        if (dateAssitant.checkWithAfterToday(inputs[0].y, inputs[0].m, i))
                        {
                            day.addClass('-future');
                        }
                        i++;
                    } while (i < len);
                    month = dateAssitant.getMonth(inputs[1].y, inputs[1].m);
                    week = initElem(p_data__2, 'div').addClass('di-picker__week');
                    i = 0; len = days.length;
                    do {
                        initElem(week, 'div', days[i++]).addClass('di-picker__day_name');
                    } while (i < len);
                    i = 1;
                    curr_day = (inputs[1].y == ty && inputs[1].m == tm) ? td : 0;
                    selected = getSelectedDates(inputs[1]);
                    len = month.length;
                    week = null;
                    first__line = false;
                    do {
                        if (week == null || month[i] == 0) {
                            if (week == null) {
                                first__line = true;
                            }
                            week = initElem(p_data__2, 'div').addClass('di-picker__week');
                            if (first__line) {
                                first__line = false;
                                for (var j = 0; j < month[i]; j++) {
                                    initElem(week, 'div').addClass('di-picker__day_name').addClass('-empty');
                                }
                            }
                        }
                        var day = initElem(week, 'div', i).addClass('di-picker__day').on('click', function () {
                            var input = inputs[input__index];
                            input__index = (input__index + 1) % 2;
                            input.d = this.innerText || this.innerHTML;

                            input.value = dateAssitant.getFormatedDate(inputs[1].y, inputs[1].m, input.d);
                            input.date = {
                                y: inputs[1].y,
                                m: inputs[1].m,
                                d: input.d
                            };
                            if (inputs[input__index].value == '')
                            {
                                inputs[input__index].value = input.value;
                                inputs[input__index].date = input.date;
                            }
                            if (inputs[1].value != ''  && inputs[0].value != '') {
                                if (dateAssitant.compareDates(inputs[1].date, inputs[0].date)) {
                                    var temp = inputs[1].value;
                                    inputs[1].value = inputs[0].value;
                                    inputs[0].value = temp;
                                    temp = inputs[1].date;
                                    inputs[1].date = inputs[0].date;
                                    inputs[0].date = temp;
                                    input__index = 0;
                                }
                            }
                            di_start.index = input__index;
                            showMonth([inputs[1].y, inputs[1].m]);
                        });
                        if (curr_day == i)
                        {
                            day.addClass('-today');
                        }
                        if (~selected.indexOf(i))
                        {
                            day.addClass('-selected');
                        }
                        var this_day =
                        {
                            d: i,
                            m: inputs[1].m,
                            y: inputs[1].y
                        };

                        if (inputs[0].date != undefined && inputs[1].date != undefined) {
                            if (dateAssitant.compareDates(inputs[0].date, this_day)&&dateAssitant.compareDates(this_day,inputs[1].date))
                            {
                                day.addClass('-interval');
                            }
                        }
                        if (dateAssitant.checkWithAfterToday(inputs[1].y, inputs[1].m, i))
                        {
                            day.addClass('-future');
                        }
                        i++;
                    } while (i < len);
                }
            }

            var p_data__1 = initElem(d_panel, 'div').addClass('di-panel__data').attr('data', '');
            var p_data__2 = initElem(d_panel, 'div').addClass('di-panel__data').attr('data', '');
            new_datepicker.replace(Pickers[0]);
            datePickers.push(new_datepicker.getCE());
        })();
    }
    function initElem(da, type, content)
    {
        var elem = da.ac(type, content);
        return new DomAssitant().init(elem);
    }
};