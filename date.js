var dateAssitant = (function()
{
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

    function formatDate (d)  // функция по формированию вида даты дд.мм.гг
    {
        d = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
        return d.join('.').replace(/\b(\d)\b/g, '0$1');
    }
    function correctDay(d)
    {
        return (d == 0) ? 6 : d - 1;
    }
    function dateAss()
    {
        return dateAss;
    }
    dateAss.getPreviousDay = function()
    {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return formatDate(date);
    };

    dateAss.getDayName = function(num)
    {
        var temp = num;
        while(num >= 10)
        {
            num = num % 10;
        }
        while(temp >= 100)
        {
            temp = temp % 10;
        }
        if (num > 0 && num < 5)
        {
            if (temp > 10 && temp < 15)
            {
                return 'дней';
            }
            if (num == 1) return 'день';
            return 'дня';
        }
        return 'дней';
    };

    dateAss.getDay = function(num)
    {
        return days[num];
    };

    dateAss.getDays = function()
    {
        return days;
    };

    dateAss.getMonth = function(year, month)
    {
        var _date = new Date(year, month, 1);
        var _month = [];
        while (_date.getMonth() == month)
        {
            var day = _date.getDate();
            _month[day] = correctDay(_date.getDay());
            _date.setDate(day + 1);
        }
        return _month;
    };
    dateAss.getMonthName = function(month)
    {
        return months[month];
    };

    dateAss.getCurrentMonth = function()
    {
        var today = new Date();
        return dateAss.getMonth(today.getFullYear(), today.getMonth());
    };
    dateAss.getFormatedDate = function(y, m, d)
    {
        return formatDate(new Date(y, m, d));
    };

    dateAss.checkWithAfterToday = function (year, month, day)
    {
        var today = new Date();
        var _y = today.getFullYear(), _m = today.getMonth(), _d = today.getDate();
        if (_y < year)
            return true;
        if (_m < month && _y == year)
            return true;
        if (_d < day && _m == month && _y == year)
            return true;
        return false;
    };
    dateAss.compareDates = function (date_less, date_more)
    {
        if (date_less.y < date_more.y)
            return true;
        if (date_less.m < date_more.m && date_less.y == date_more.y)
            return true;
        if (date_less.d < date_more.d && date_less.m == date_more.m && date_less.y == date_more.y)
            return true;
        return false;
    };
    dateAss.getPreviousMonthDays = function() //returnFirstAndLastDays
    {
        var last = new Date(); // сегодня
        last.setDate(1); // первое число
        last.setHours(-1);
        var first = new Date(last.getFullYear(), last.getMonth(), 1);
        return {first:first, last:last};
    };
    dateAss.getCurrentMonthDays = function() //returnFirstAndLastDays
    {
        var lastDay = new Date();
        var firstDay = new Date(lastDay.getFullYear(), lastDay.getMonth(), 1);
        return {first:firstDay, last: lastDay};
    };
    dateAss.getPreviousWeekDays = function() //
    {
        var before_week = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) // 60 * 60 * 24 * 7 * 1000 - время недели в миллисекундах
        , day = before_week.getDay()
        , diff_to_Monday = before_week.getDate() - day + (day === 0 ? -6 : 1)
        , last_monday = new Date(before_week.setDate(diff_to_Monday))
        , last_sunday = new Date(before_week.setDate(diff_to_Monday + 6));
        return {first:last_monday, last:last_sunday};
    };
    dateAss.getCurrentWeekDays = function()
    {
        var curr = new Date;
        var first = curr.getDate() - curr.getDay() + 1;
        var last = first + curr.getDay() - 1;

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));
        return {first:firstday, last: lastday};
    };

    dateAss.getMonthDays = function(year, month)
    {
        var today = new Date();
        if (today.getMonth() == month && year == today.getFullYear())
        {
            return dateAss.getCurrentMonthDays();
        }
        var firstDay = new Date(year, month, 1);
        if (month == 11)
        {
            month = 0;
            year = year + 1;
        }
        else
        {
            month ++;
        }
        var lastDay = new Date(year, month, 0);
        return {first:firstDay, last: lastDay};

    };
    dateAss.getYesterdayDays = function()
    {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return {first:date, last:date};
    };

    return dateAss;
})();
