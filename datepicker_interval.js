window.onload = function () {

    var Pickers = new DomAssitant().gt(null, "datepicker-interval");
    var datePickers = [];
    for (var i = 0, len = Pickers.length; i < len; i++) {
        (function() {
            var da = new DomAssitant();
            var new_datepicker = da.ce('div').addClass('di-picker');
            new_datepicker
                .on('click', function (e) {
                    if (!e.target.hasAttribute('panel') && !e.target.parentNode.hasAttribute('panel') && !e.target.parentNode.parentNode.hasAttribute('panel') &&
                        !e.target.parentNode.hasAttribute('data') && !e.target.parentNode.parentNode.hasAttribute('data')) {
                        d_panel.currentElement.classList.toggle('dspl-none');

                    }
                    d_input.currentElement.focus();
                });

            var d_input = initElem(new_datepicker, 'input').addClass('di-picker__value').attr("id", Pickers[0].getAttribute("id"))
                .attr('type', 'text').attr('placeholder', 'дд.мм.гг')
                //.attr('value', '02.08.2015')
                .on('blur', function (e) {
                    d_panel.addClass('dspl-none');

                })
                .on('click', function () {
                    showMonth(this);
                });
            var d_panel = initElem(new_datepicker, 'div').addClass('di-panel').addClass('dspl-none').attr('panel', '')
                .on('mouseenter', function (e) {
                    d_input.currentElement.onblur = function () {
                    };

                })
                .on('mouseleave', function (e) {
                    d_input.currentElement.onblur = function () {
                        d_panel.addClass('dspl-none');
                    };
                });

            function showMonth(self, dt) // dt = [year, month]
            {

                var dt__check = dt == null || dt == undefined || dt.length == 0;
                if (d_panel.hasClass('dspl-none') || !dt__check) {


                    var parentNode = self.parentNode;
                    var data = d_input.getDocumentElementsWithAttribute('data', '', parentNode)[0];
                    p_data.racfn();
                    var y, m, d;
                    var today = new Date(),
                    ty = today.getFullYear(),
                    tm = today.getMonth(),
                    td = today.getDate();
                    if (dt__check) {
                        if (self.value == '') {
                            y = ty;
                            m = tm;
                        }
                        else {
                            if (self.date == undefined)
                            {
                                var date = self.value.split('.');
                                self.date = {
                                    y: +date[2],
                                    m: --date[1],
                                    d: +date[0]
                                };
                                self.value = dateAssitant.getFormatedDate(self.date.y, self.date.m, self.date.d);
                            }
                            y = self.date.y;
                            m = self.date.m;
                        }
                    }
                    else
                    {
                        y = dt[0];
                        m = dt[1];
                    }
                    var month = dateAssitant.getMonth(y, m);
                    self.y = y;
                    self.m = m;
                    var curr_day = (y == ty && m == tm) ? td : 0;
                    var selected = (self.date != undefined && y == self.date.y && m == self.date.m) ? self.date.d : 0;

                    p_header__name.text(dateAssitant.getMonthName(m) + ' ' + y);
                    var days = dateAssitant.getDays();
                    var week = initElem(p_data, 'div').addClass('di-picker__week');
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
                            week = initElem(p_data, 'div').addClass('di-picker__week');
                            if (first__line) {
                                first__line = false;
                                for (var j = 0; j < month[i]; j++) {
                                    initElem(week, 'div').addClass('di-picker__day_name').addClass('-empty');
                                }
                            }
                        }
                        var day = initElem(week, 'div', i).addClass('di-picker__day').on('click', function () {
                            self.d = this.innerText || this.innerHTML;
                            self.value = dateAssitant.getFormatedDate(self.y, self.m, self.d);
                            self.date = {
                                y: self.y,
                                m: self.m,
                                d: self.d
                            };
                            d_panel.addClass('dspl-none');

                        });
                        if (curr_day == i)
                        {
                            day.addClass('-today');
                        }
                        if (selected == i)
                        {
                            day.addClass('-selected');
                        }
                        if (dateAssitant.checkWithAfterToday(y, m, i))
                        {
                            day.addClass('-future');
                        }
                        i++;
                    } while (i < len);
                }
            }

            var p_header = initElem(d_panel, 'div').addClass('diP-header');
            var p_header__prev = initElem(p_header, 'div', '&#8249;').addClass('diP-header__prev').on('click', function()
            {
                var self = d_input.getCE();
                var temp_year = self.y, temp_month = self.m;
                temp_year = (temp_month == 0) ? (--temp_year) : temp_year;
                temp_month = (temp_month == 0) ? 11 : (--temp_month);
                showMonth(self, [temp_year, temp_month]);
            });
            var p_header__name = initElem(p_header, 'div').addClass('diP-header__name');
            var p_header__next = initElem(p_header, 'div', '&#8250;').addClass('diP-header__next').on('click', function()
            {
                var self = d_input.getCE();
                var temp_year = self.y, temp_month = self.m;
                temp_year = (temp_month == 11) ? (++temp_year) : temp_year;
                temp_month = (temp_month == 11) ? 0 : (++temp_month);
                showMonth(self, [temp_year, temp_month]);
            });
            var p_data = initElem(d_panel, 'div').addClass('di-panel__data').attr('data', '');
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