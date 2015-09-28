window.onload = function () {

    var Pickers = new DomAssitant().gt(null, "datepicker-interval");
    var datePickers = [];
    for (var i = 0, len = Pickers.length; i < len; i++) {
        (function() {
            var da = new DomAssitant();
            var new_datepicker = da.ce('div').addClass('di-picker');
            new_datepicker
                .on('click', function (e) {
                    if (d_input_start.currentElement.index == 1)
                    {
                        d_input_end.currentElement.focus();
                    }
                    else
                    {
                        d_input_start.currentElement.focus();
                    }
                })
                .on('mouseenter', function (e) {
                    d_input_start.on('blur', function () {
                    });
                    d_input_end.on('blur', function () {
                    });

                })
                .on('mouseleave', function (e) {
                    d_input_start.on('blur', function () {
                        d_panel.addClass('dspl-none');
                        di_icon__dp.removeClass('-active');
                    });
                    d_input_end.on('blur', function () {
                        d_panel.addClass('dspl-none');
                        di_icon__dp.removeClass('-active');
                    });
                });

            var di_icon = initElem(new_datepicker, 'div').addClass('di-icon');
            var di_icon__dp = initElem(di_icon, 'div').addClass('di-icon__datepicker').on('click', function()
            {
                d_panel.currentElement.classList.toggle('dspl-none');
                this.classList.toggle('-active');
                d_input_start.currentElement.index = 0;
                showMonth();
            });
            var d_input_start = initElem(new_datepicker, 'input').addClass('di-picker__value').attr("id", Pickers[0].getAttribute("id")+'_start')
                .attr('type', 'text').attr('placeholder', 'дд.мм.гг')
                .attr('readonly', 'readonly')
                .on('blur', function (e) {
                })
                .on('click', function (e) {
                    d_panel.removeClass('dspl-none');
                    di_icon__dp.addClass('-active');
                    d_input_start.currentElement.index = 0;
                    showMonth();
                });
            var d_dash = initElem(new_datepicker, 'div', '\u2014').addClass('di-dash');
            var d_input_end = initElem(new_datepicker, 'input').addClass('di-picker__value').attr("id", Pickers[0].getAttribute("id")+'_end')
                .attr('type', 'text').attr('placeholder', 'дд.мм.гг')
                .attr('readonly', 'readonly')
                .on('blur', function (e) {
                    //d_panel.addClass('dspl-none');

                })
                .on('click', function (e) {
                    d_panel.removeClass('dspl-none');
                    di_icon__dp.addClass('-active');
                    d_input_start.currentElement.index = 1;
                    showMonth();
                });
            var d_panel = initElem(new_datepicker, 'div').addClass('di-panel').addClass('dspl-none').attr('panel', '').on('click', function()
            {

            });

            initElem(d_panel, 'div').addClass('di-triangle');
            var p_functions = initElem(d_panel, 'div').addClass('diP-functions');

            function setDateForInput(input, date)
            {
                input.currentElement.date =
                {
                    y: date.getFullYear(),
                    m: date.getMonth(),
                    d: date.getDate()
                };
                input.currentElement.value = dateAssitant.getFormatedDate(input.currentElement.date.y, input.currentElement.date.m, input.currentElement.date.d);
            }
            function callSetDateForInput(month__days)
            {
                setDateForInput(d_input_start, month__days.first);
                setDateForInput(d_input_end, month__days.last);
                d_panel.addClass('dspl-none');
                di_icon__dp.removeClass('-active');
            }
            var p_functions__previous_month = initElem(p_functions, 'div', 'Прошлый месяц').addClass('diP-functions__action').on('click', function()
            {
                callSetDateForInput(dateAssitant.getPreviousMonthDays());
            });
            var p_functions__current_month = initElem(p_functions, 'div', 'Этот месяц').addClass('diP-functions__action').on('click', function()
            {
                callSetDateForInput(dateAssitant.getCurrentMonthDays());
            });
            var p_functions__previous_week = initElem(p_functions, 'div', 'Прошлая неделя').addClass('diP-functions__action').on('click', function()
            {
                callSetDateForInput(dateAssitant.getPreviousWeekDays());
            });
            var p_functions__current_week = initElem(p_functions, 'div', 'Эта неделя').addClass('diP-functions__action').on('click', function()
            {
                callSetDateForInput(dateAssitant.getCurrentWeekDays());
            });
            var p_functions__yesterday = initElem(p_functions, 'div', 'Вчера').addClass('diP-functions__action').on('click', function()
            {
                callSetDateForInput(dateAssitant.getYesterdayDays());
            });
            var p_header = initElem(d_panel, 'div').addClass('diP-header').attr('panel', '');
            var p_header__prev = initElem(p_header, 'div', '&#8249;').addClass('diP-header__prev').on('click', function()
            {
                var self = d_input_end.getCE();
                var temp_year = self.y, temp_month = self.m;
                temp_year = (temp_month < 2) ? (--temp_year) : temp_year;
                temp_month = (temp_month < 2) ? 11 : (temp_month - 2);
                showMonth([temp_year, temp_month]);
            });
            var p_header__name = [
                initElem(p_header, 'div').addClass('diP-header__name').addClass('-previousMonth'),
                initElem(p_header, 'div').addClass('diP-header__name').addClass('-currentMonth')
            ];
            var p_header__next = initElem(p_header, 'div', '&#8250;').addClass('diP-header__next').on('click', function()
            {
                var self = d_input_end.getCE();
                var temp_year = self.y, temp_month = self.m;
                temp_year = (temp_month > 9) ? (++temp_year) : temp_year;
                temp_month = (temp_month > 9) ? 0 : (temp_month + 2);
                showMonth([temp_year, temp_month]);
            });

            function showMonth(dt) // dt = [year, month]
            {
                var di_start = d_input_start.getCE();
                var di_end   = d_input_end.getCE();

                var dt__check = dt == null || dt == undefined || dt.length == 0;
                if (!d_panel.hasClass('dspl-none') || !dt__check) {


                    var parentNode = di_start.parentNode;
                    var data = d_input_start.getDocumentElementsWithAttribute('data', '', parentNode)[0];
                    var y, m, d;
                    var today = new Date(),
                        ty = today.getFullYear(),
                        tm = today.getMonth(),
                        td = today.getDate();
                    var checkInputDate = function(date)
                    {
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

                    var days = dateAssitant.getDays();

                    for (var input_i = 0; input_i < 2; input_i++) // go throw inputs
                    {
                        (function(input_i) {
                            p_data[input_i].racfn(); // clear filed for days
                            p_header__name[input_i].racfn(); // clear filed for header
                            var curr_day = (inputs[input_i].y == ty && inputs[input_i].m == tm) ? td : 0;
                            var selected = getSelectedDates(inputs[input_i]);
                            var month = dateAssitant.getMonth(inputs[input_i].y, inputs[input_i].m);
                            var ph__name = initElem(p_header__name[input_i], 'span', dateAssitant.getMonthName(inputs[input_i].m) + ' ' + inputs[input_i].y).addClass('diP-header__text');
                            var week = initElem(p_data[input_i], 'div').addClass('di-picker__week');
                            if (!dateAssitant.checkWithAfterToday(inputs[input_i].y, inputs[input_i].m, 1))
                            {
                                ph__name.on('click', function() {
                                    callSetDateForInput(dateAssitant.getMonthDays(inputs[input_i].y, inputs[input_i].m));
                                }).addClass('-allow');
                            }
                            else
                            {
                                ph__name.on('click', function() {
                                }).removeClass('-allow');
                                week.addClass('-notallow');
                            }

                            var i = 0, len = days.length;
                            do {
                                initElem(week, 'div', days[i++]).addClass('di-picker__day_name'); // week days
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
                                    week = initElem(p_data[input_i], 'div').addClass('di-picker__week');
                                    if (first__line) {
                                        first__line = false;
                                        for (var j = 0; j < month[i]; j++) {
                                            initElem(week, 'div').addClass('di-picker__day_name').addClass('-empty'); // add empty cells for 1st week in month
                                        }
                                    }
                                }
                                var day = initElem(week, 'div', i).addClass('di-picker__day').on('click', function () { // init day

                                    if (this.classList.contains('-future')) return false;
                                    if (this.classList.contains('-block')) return false;
                                    var input = inputs[input__index]; // current input to get value

                                    input.d = this.innerText || this.innerHTML; // cross  brower
                                    input.value = dateAssitant.getFormatedDate(inputs[input_i].y, inputs[input_i].m, input.d); // set value
                                    input.date = {
                                        y: inputs[input_i].y,
                                        m: inputs[input_i].m,
                                        d: +input.d
                                    };
                                    if (input__index == 0 || inputs[input__index].value == '') { // if second input is empty
                                        inputs[input__index].value = input.value;
                                        inputs[input__index].date = input.date;
                                    }
                                    input__index = (input__index + 1) % 2;
                                    if (inputs[1].value != '' && inputs[0].value != '') {
                                        if (dateAssitant.compareDates(inputs[1].date, inputs[0].date)) { // if second input is less than first
                                            inputs[1].value = inputs[0].value;
                                            inputs[1].date = inputs[0].date;
                                        }
                                    }
                                    di_start.index = input__index; // remember the next input to change value
                                    showMonth([inputs[1].y, inputs[1].m]); // redraw
                                });
                                if (curr_day == i) {
                                    day.addClass('-today');
                                }
                                if (input__index == 1)
                                {
                                    var t_date ={
                                        d: i,
                                        m: inputs[input_i].m,
                                        y: inputs[input_i].y
                                    };


                                    if (dateAssitant.compareDates(t_date, inputs[0].date)) {
                                        day.addClass('-block');
                                    }
                                }
                                if (~selected.indexOf(i)) {
                                    day.addClass('-selected');
                                }
                                var this_day =
                                {
                                    d: i,
                                    m: inputs[input_i].m,
                                    y: inputs[input_i].y
                                };

                                if (inputs[0].date != undefined && inputs[1].date != undefined) {
                                    if (dateAssitant.compareDates(inputs[0].date, this_day) && dateAssitant.compareDates(this_day, inputs[1].date)) {
                                        day.addClass('-interval');
                                    }
                                }
                                if (dateAssitant.checkWithAfterToday(inputs[input_i].y, inputs[input_i].m, i)) {
                                    day.addClass('-future');
                                }
                                i++;
                            } while (i < len);
                        })(input_i);
                    }
                }
            }

            var p_data = [];
            p_data.push(initElem(d_panel, 'div').addClass('di-panel__data').attr('data', ''));
            initElem(d_panel, 'div').addClass('di-panel__separator');
            p_data.push(initElem(d_panel, 'div').addClass('di-panel__data').attr('data', ''));


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