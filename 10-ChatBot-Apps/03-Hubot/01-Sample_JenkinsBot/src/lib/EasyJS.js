//====================================================================================================
// Description：Easy Collection
//====================================================================================================

/**
 * Description：Array Extend
 **/
module.exports = (function () {

    //#region Static Method

    /**
     * Array Empty
     * @returns {Array}
     */
    Array.empty = function () {
        return [];
    };

    //#endregion Static Method


    //#region Basic Method

    /**
     * Array Is Empty
     * @returns {bool}
     */
    Array.prototype.isEmpty = function () {
        return (this.length === 0);
    };

    /**
     * Array Length
     * @returns {index}
     */
    Array.prototype.count = function () {
        return this._list.length;
    };

    /**
     * Array Length
     * @returns {index}
     */
    Array.prototype.size = function () {
        return this._list.length;
    };

    //#endregion Basic Method


    //#region Extend Item CRUD

    /**
     * Get First Item
     * @returns {object}
     */
    Array.prototype.getFirst = function () {
        if (this.length > 0) {
            return this[0];
        }
        return null;
    };

    /**
     * Get Last
     * @returns {object}
     */
    Array.prototype.getLast = function () {
        var length = this.length;

        if (length > 0) {
            return this[length - 1];
        }
        return null;
    };

    /**
     * Get
     * @param {int} index
     */
    Array.prototype.get = function (index) {
        this._checkIndex(index);
        var array = this;
        return array[index];
    };

    /**
     * Set
     * @param {int} index
     * @param {object} item
     */
    Array.prototype.set = function (index, item) {
        this._checkIndex(index);
        var array = this;
        return array[index];
    };

    /**
     * Add
     * @param {object} item
     */
    Array.prototype.add = function (item) {
        if (!Array.isArray(item)) {
            this.push(item);
        }
    };

    /**
     * Add Range
     * @param {Array} array
     */
    Array.prototype.addRange = function (array) {
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                this.add(array[i]);
            }
        }
    };

    /**
     * Add All
     * @param {object..} item
     */
    Array.prototype.addAll = function () {
        this.addRange(arguments);
    };

    /**
     * Remove
     * @param {int} index
     * @param {object} item
     */
    Array.prototype.insert = function (index, item) {
        this._checkIndex(index);
        if (!Array.isArray(item)) {
            this.splice(index, 0, item);
        }
    };

    /**
     * Remove Range
     * @param {int} index
     * @param {Array} array
     */
    Array.prototype.insertRange = function (index, array) {
        this._checkIndex(index);
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                this.insert(index + i, array[i]);
            }
        }
    };

    /**
     * Replace
     * @param {int} index
     * @param {object} item
     */
    Array.prototype.replace = function (index, item) {
        this._checkIndex(index);
        if (!Array.isArray(item)) {
            this.splice(index, 1, item);
        }
    };

    /**
     * Replace Range
     * @param {int} index
     * @param {Array} array
     */
    Array.prototype.replaceRange = function (index, array) {
        this._checkIndex(index);
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                this.replace(index + i, array[i]);
            }
        }
    };

    /**
     * Remove Range
     * @param {int} index
     * @param {int} length
     */
    Array.prototype.remove = function (index, length) {
        this._checkIndex(index);

        if (arguments == 2 && !isNaN(length)) {
            this.splice(index, length);
        }
        else {
            this.splice(index, 1);
        }
    };

    /**
     * Clear Array
     */
    Array.prototype.clear = function () {
        this.length = 0;
    };

    //#endregion Extend Item CRUD


    //#region Search, Sort, And Compare

    /**
     * Array Index
     * @param {object} item
     * @param {int} startIndex
     * @returns {Array}
     */
    Array.prototype.indexesOf = function (item, startIndex) {
        var length = this.length;
        var indexes = Array.empty();
        var currentIndex = startIndex || 0;

        while (currentIndex < length) {
            var searchIndex = this.indexOf(item, currentIndex);

            if (searchIndex == -1) {
                break;
            }
            indexes.add(searchIndex);
            currentIndex = searchIndex + 1;
        }
        return indexes;
    };

    /**
     * Array Last Index
     * @param {object} item
     * @param {int} )
     * @returns {Array}
     */
    Array.prototype.lastIndexesOf = function (item, endIndex) {
        var length = this.length;
        var indexes = Array.empty();
        var currentIndex = endIndex || length - 1;

        while (currentIndex >= 0) {
            var searchIndex = this.lastIndexOf(item, currentIndex);

            if (searchIndex == -1) {
                break;
            }
            indexes.add(searchIndex);
            currentIndex = searchIndex - 1;
        }
        return indexes;
    };

    /**
     * Is Contains
     * @param {type} item
     * @returns {type}
     */
    Array.prototype.isContains = function (item) {
        var result = this.indexesOf(item, 0);
        return !result.isEmpty();
    };

    /**
     * Sort Reverse
     * @param {Function} callback (Optional)
     */
    Array.prototype.reverseSort = function (callback) {
        this.sort(callback);
        this.reverse();
    };

    /**
     * Equals
     * @param {Array} array
     * @returns {bool}
     */
    Array.prototype.equals = function (array) {
        if (!Array.isArray(array)) return false;
        if (this.length !== array.length) return false;
        if (this === array) return true;

        for (var i = 0; i < this.length && i < array.length; ++i) {
            if (this[i] !== array[i])    return false;
        }
        return true;
    };

    //#endregion Search, Sort, And Compare


    //#region Type Convert

    /**
     * From Json
     * @param {Json} json
     * @returns {Array}
     */
    Array.fromJson = function (json) {
        var array = JSON.parse(json);

        if (!Array.isArray(array)) {
            console.error("json parse error!");
        }
        return array;
    };

    /**
     * To Json String
     * @returns {string}
     */
    Array.prototype.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    };

    //#endregion Type Convert


    //#region Private Method

    /**
     * Check Index
     * @private
     * @param {int} index
     */
    Array.prototype._checkIndex = function (index) {
        if (isNaN(index)) console.error("index is not Number");
        if (index >= this.length) console.error("Array index out of bound");
    };

    //#endregion Private Method

}());


/**
 * Description：List
 **/
exports.List = (function () {

    /**
     * @constructor
     * @returns {List}
     */
    function List() {
        var list = Object.create(Array.prototype);
        list = (Array.apply(list, arguments) || list);
        List.injectClassMethods(list);
        return (list);
    }

    /**
     *
     * @param {List} list
     * @returns {List}
     */
    List.injectClassMethods = function (list) {
        for (var method in List.prototype) {
            if (List.prototype.hasOwnProperty(method)) {
                list[method] = List.prototype[method];
            }
        }
        return list;
    };

    /**
     * From Array
     * @param {type} array
     * @returns {type}
     */
    List.fromArray = function (array) {
        var list = List.apply(null, array);
        return list;
    };

    /**
     * From Json
     * @param {string} json
     * @returns {List}
     */
    List.fromJson = function (json) {
        var list = List.apply(null, Array.fromJson(json));
        return list;
    };

    /**
     * Find All
     * @param {Object} item
     * @param {int} startIndex
     * @returns {List}
     */
    List.prototype.findAll = function (item, startIndex) {
        var indexes = this.indexesOf(item, startIndex);

        var list = new List();
        for (var i = 0; i < indexes.length; i++) {
            var item = this[indexes[i]];
            list.add(item);
        }

        return list;
    };

    /**
     * Clone List
     * @returns {List}
     */
    List.prototype.clone = function () {
        var list = new List();
        list.addRange(this);
        return list;
    };

    /**
     * To Array
     * @returns {Array}
     */
    List.prototype.toArray = function () {
        var array = new Array();
        array.addRange(this);
        return array;
    };

    return List;
})();

/**
 * Description：Stack
 **/
exports.Stack = (function () {

    /**
     * @constructor
     * @param {Array} array
     */
    function Stack(array) {
        this._stack = Array.empty();

        if (arguments.length == 1 && Array.isArray(array)) {
            this._stack = array;
        }
        else if (arguments.length > 0) {
            this._stack.addAll(arguments);
        }
    }

    //#region Static Method

    /**
     * Array Empty
     * @returns {Array}
     */
    Stack.empty = function () {
        return new Stack();
    };

    //#endregion Static Method


    //#region Basic Method

    /**
     * Stack Is Empty
     * @returns {bool}
     */
    Stack.prototype.isEmpty = function () {
        return (this._stack.length === 0);
    };

    /**
     * Array Length
     * @returns {index}
     */
    Stack.prototype.count = function () {
        return this._stack.length;
    };

    /**
     * Array Length
     * @returns {index}
     */
    Stack.prototype.size = function () {
        return this._stack.length;
    };

    //#endregion Basic Method


    //#region Item CRUD

    /**
     * Peek Item
     * @returns {object}
     */
    Stack.prototype.peek = function () {
        var item = this._stack.getLast();
        return item;
    };

    /**
     * Push Item
     * @param {object} item
     */
    Stack.prototype.push = function (item) {
        this._stack.push(item);
    };

    /**
     * Pop Item
     * @returns {object}
     */
    Stack.prototype.pop = function () {
        var item = this.peek();
        this._stack.pop();
        return item;
    };

    /**
     * Clear Stack
     */
    Stack.prototype.clear = function () {
        this._stack.clear();
    };

    /**
     * Clone
     * @returns {Stack}
     */
    Stack.prototype.clone = function () {
        var stack = new Stack(this._stack);
        return stack;
    };

    //#endregion Item CRUD


    //#region Type Convert

    /**
     * From Json
     * @param {Json} json
     * @returns {Array}
     */
    Stack.fromJson = function (json) {
        var array = JSON.parse(json);
        return new Stack(array);
    };

    /**
     * From Array
     * @param {Array} array
     * @returns {Stack}
     */
    Stack.fromArray = function (array) {
        var stack = new Stack(array);
        return stack;
    };

    /**
     * To Json String
     * @returns {string}
     */
    Stack.prototype.toJson = function () {
        var json = JSON.stringify(this._stack);
        return json;
    };

    /**
     * To Array
     * @returns {Array}
     */
    Stack.prototype.toArray = function () {
        return this._stack;
    };

    /**
     * To String
     * @returns {string}
     */
    Stack.prototype.toString = function () {
        return this._stack.toString();
    };

    //#endregion Type Convert

    return Stack;
})();


/**
 * @class {Dictionary} JavaScript Dictionary
 */
exports.Dictionary = (function () {
    /**
     *
     * @constructor
     * @property {object} _dictionary
     * @property {boolean} _isAutoSort
     * @property {boolean} _isDescOrder
     * @param {object} options (Optional) {isAutoSort: bool, isDescOrder: bool}
     */
    function Dictionary(options) {
        this._dictionary = {};
        this._isAutoSort = false;
        this._isDescOrder = false;

        if (options != null) {
            this._isAutoSort = options.isAutoSort || this._isAutoSort;
            this._isDescOrder = options.isDescOrder || this._isDescOrder;
        }
    }

    /**
     * Add
     * @param {string} key
     * @param {object} value
     */
    Dictionary.prototype.add = function (key, value) {
        if (key == null || key.trim().length === 0) {
            throw "Key isn't String";
        }

        this._dictionary[key.toString()] = value;

        if (this._isAutoSort) {
            this.sort();
        }
    };

    /**
     * Add More
     * @param {object[]} objectList (key-value Pair Array)
     */
    Dictionary.prototype.addMore = function (objectList) {
        for (var i = 0; i < objectList.length; i++) {
            this.add(objectList[i].key, objectList[i].value);
        }
    };

    /**
     * Add Dictionary
     * @param {Dictionary} dictionary
     */
    Dictionary.prototype.addDictionary = function (dictionary) {
        var keys = dictionary.keys();

        for (var i = 0; i < keys.length; i++) {
            this.add(keys[i], dictionary.get(keys[i]));
        }
    };

    /**
     * Get Value
     * @param {string} key
     * @returns {Object}
     */
    Dictionary.prototype.get = function (key) {
        if (key == null || key.trim().length === 0) {
            throw "Key isn't String";
        }

        if (!this.isContainsKey(key)) {
            throw "Nothing";
        }

        return this._dictionary[key];
    };

    /**
     * Remove
     * @param {string} key
     */
    Dictionary.prototype.remove = function (key) {
        if (this.isContainsKey(key)) {
            delete this._dictionary[key];
        }
    };

    /**
     * Remove All
     */
    Dictionary.prototype.removeAll = function () {
        this._dictionary = {};
    };

    /**
     * Is Contains Key
     * @param {string} key
     * @returns {bool}
     */
    Dictionary.prototype.isContainsKey = function (key) {
        var keys = this.keys();

        var index = keys.indexOf(key);

        if (index === -1) {
            return false;
        }

        return true;
    };

    /**
     * Is Contains Value
     * @param {object} value
     * @returns {bool}
     */
    Dictionary.prototype.isContainsValue = function (value) {
        var keys = this.keys();

        for (var i = 0; i < keys.length; i++) {
            if (this._dictionary[keys[i]] === value) {
                return true;
            }
        }

        return false;
    };

    /**
     * Each
     * @param {function} func
     */
    Dictionary.prototype.each = function (func) {
        $.each(this._dictionary, func);
    };

    /**
     * Get Keys
     * @returns {string[]}
     */
    Dictionary.prototype.keys = function () {
        var keys = Object.keys(this._dictionary);

        return keys;
    };

    /**
     * Dictionary Value To Array
     * @returns {object[]}
     */
    Dictionary.prototype.values = function () {
        var keys = this.keys();
        var array = [];

        for (var i = 0; i < keys.length; i++) {
            array.push(this._dictionary[keys[i]]);
        }
        return array;
    };

    /**
     * Dictionary To Json String
     * @returns {string}
     */
    Dictionary.prototype.toJson = function () {
        var json = JSON.stringify(this._dictionary);
        return json;
    };

    /**
     * Add From Json
     * @param {string} json
     */
    Dictionary.prototype.fromJson = function (json) {
        this._dictionary = JSON.parse(json);
    };

    /**
     * Clone Dictionary
     * @returns {Dictionary}
     */
    Dictionary.prototype.clone = function () {
        var newDictionary = new Dictionary();
        newDictionary.addMore(this);

        return newDictionary;
    };

    /**
     * Sort Dictionary Key
     * @param {bool} json (Optional)
     */
    Dictionary.prototype.sort = function (isDescOrder) {
        this._isDescOrder = isDescOrder || this._isDescOrder;

        var keys = this.keys();

        keys.sort();

        if (this._isDescOrder) keys.reverse();

        var sortedDictionary = {};

        for (i = 0; i < keys.length; i++) {
            sortedDictionary[keys[i]] = this._dictionary[keys[i]];
        }

        this._dictionary = sortedDictionary;
    }

    return Dictionary;
})();


//====================================================================================================
// Description：Easy DateTime
//====================================================================================================

/**
 * Description：Date Extend
 **/
module.exports = (function () {

    //#region Static

    Date.cultureInfo = {
        dayOfWeekShortName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayOfWeekLongName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthShortName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthLongName: ["January", "February", "March", "April", "May", "July", "August", "September", "October", "November", "December"],
        amName: "AM",
        pmName: "PM"
    }

    /**
     * Set Culture Info
     * @param {object} setting
     */
    Date.setCultureInfo = function (setting) {
        Date.cultureInfo = setting;
    }

    /**
     * Set Day Of Week Name (Short)
     * @param {Array} dayOfWeekShortName
     */
    Date.setDayOfWeekShortName = function (dayOfWeekShortName) {
        Date.cultureInfo["dayOfWeekShortName"] = dayOfWeekShortName;
    }

    /**
     * Set Day Of Week Name (Long)
     * @param {Array} dayOfWeekLongName
     */
    Date.setDayOfWeekLongName = function (dayOfWeekLongName) {
        Date.cultureInfo["dayOfWeekLongName"] = dayOfWeekLongName;
    }

    /**
     * Set Month Name (Short)
     * @param {Array} dayOfWeekLongName
     */
    Date.setMonthShortName = function (monthShortName) {
        Date.cultureInfo["monthShortName"] = monthShortName;
    }

    /**
     * Set Month Name (Long)
     * @param {Array} dayOfWeekLongName
     */
    Date.setMonthLongName = function (monthLongName) {
        Date.cultureInfo["monthLongName"] = monthLongName;
    }

    /**
     * Set AM Name And PM Name
     * @param {String} amName
     * @param {String} pmName
     */
    Date.setAmAndPmName = function (amName, pmName) {
        Date.cultureInfo["amName"] = amName;
        Date.cultureInfo["pmName"] = pmName;
    }

    /**
     * Get Now Date
     * @returns {Date}
     */
    Date.now = function () {
        return new Date();
    };

    /**
     * Get Today Date
     * @returns {Date}
     */
    Date.today = function () {
        return Date.now().clearTime();
    }

    //#endregion Static


    //#region Basic GET/SET

    /**
     * Set Date Time
     * @param {Object} date
     * @returns {Date}
     */
    Date.prototype.set = function (date) {
        if (date == null) return this;

        if (!isNaN(date.year)) {
            this.year(date.year);
        }
        if (!isNaN(date.month)) {
            this.month(date.month);
        }
        if (!isNaN(date.day)) {
            this.day(date.day);
        }
        if (!isNaN(date.hours)) {
            this.hours(date.hours);
        }
        if (!isNaN(date.minutes)) {
            this.minutes(date.minutes);
        }
        if (!isNaN(date.seconds)) {
            this.seconds(date.seconds);
        }
        if (!isNaN(date.milliseconds)) {
            this.milliseconds(date.milliseconds);
        }
        return this;
    };

    /**
     * SET date
     * @param {int} year
     * @param {int} month
     * @param {int} day
     * @returns {Date}
     */
    Date.prototype.date = function (year, month, day) {
        this.year(year);
        this.month(month);
        this.day(day);
        return this;
    };

    /**
     * SET date
     * @param {int} rocYear
     * @param {int} month
     * @param {int} day
     * @returns {Date}
     */
    Date.prototype.rocDate = function (rocYear, month, day) {
        this.rocYear(year);
        this.month(month);
        this.day(day);
        return this;
    };

    /**
     * SET time
     * @param {int} hours
     * @param {int} minutes
     * @param {int} seconds
     * @param {int} milliseconds
     * @returns {Date}
     */
    Date.prototype.time = function (hours, minutes, seconds, milliseconds) {
        this.hours(hours);
        this.minutes(minutes);
        this.seconds(seconds);
        this.milliseconds(milliseconds);
        return this;
    };

    /**
     * SET datetime
     * @param {int} year
     * @param {int} month
     * @param {int} day
     * @param {int} hours
     * @param {int} minutes
     * @param {int} seconds
     * @param {int} milliseconds
     * @returns {Date}
     */
    Date.prototype.datetime = function (year, month, day, hours, minutes, seconds, milliseconds) {
        this.date(year, month, day);
        this.time(hours, minutes, seconds, milliseconds);
        return this;
    }

    /**
     * SET datetime
     * @param {int} rocYear
     * @param {int} month
     * @param {int} day
     * @param {int} hours
     * @param {int} minutes
     * @param {int} seconds
     * @param {int} milliseconds
     * @returns {Date}
     */
    Date.prototype.rocDatetime = function (rocYear, month, day, hours, minutes, seconds, milliseconds) {
        this.rocDate(rocYear, month, day);
        this.time(hours, minutes, seconds, milliseconds);
        return this;
    };

    /**
     * GET/SET year
     * @param {int} year
     * @returns {int}
     */
    Date.prototype.year = function (year) {
        if (!isNaN(year)) {
            this.setFullYear(year);
        }
        return this.getFullYear();
    };

    /**
     * GET/SET ROC year
     * @param {int} year
     * @returns {int}
     */
    Date.prototype.rocYear = function (year) {
        if (!isNaN(year)) {
            this.setFullYear(year + 1911);
        }
        return this.getFullYear() - 1911;
    };

    /**
     * GET/SET month
     * @param {int} month
     * @returns {int}
     */
    Date.prototype.month = function (month) {
        if (!isNaN(month)) {
            this.setMonth(month);
        }
        return this.getMonth();
    };

    /**
     * GET/SET date
     * @param {int} date
     * @returns {int}
     */
    Date.prototype.day = function (day) {
        if (!isNaN(day)) {
            this.setDate(day);
        }
        return this.getDate();
    };

    /**
     * GET day
     * @returns {int}
     */
    Date.prototype.dayOfWeek = function () {
        return this.getDay();
    };

    /**
     * GET/SET hours
     * @param {int} hours
     * @returns {int}
     */
    Date.prototype.hours = function (hours) {
        if (!isNaN(hours)) {
            this.setHours(hours);
        }
        return this.getHours();
    };

    /**
     * GET/SET minutes
     * @param {int} minutes
     * @returns {int}
     */
    Date.prototype.minutes = function (minutes) {
        if (!isNaN(minutes)) {
            this.setMinutes(minutes);
        }
        return this.getMinutes();
    };

    /**
     * GET/SET seconds
     * @param {int} seconds
     * @returns {int}
     */
    Date.prototype.seconds = function (seconds) {
        if (!isNaN(seconds)) {
            this.setSeconds(seconds);
        }
        return this.getSeconds();
    };

    /**
     * GET/SET milliseconds
     * @param {int} milliseconds
     * @returns {int}
     */
    Date.prototype.milliseconds = function (milliseconds) {
        if (!isNaN(milliseconds)) {
            this.setMilliseconds(milliseconds);
        }
        return this.getMilliseconds();
    };

    /**
     * Get Month Name (Short)
     * @param {int} month
     * @returns {String}
     */
    Date.prototype.getMonthShortName = function (month) {
        var monthValue = month || this.month();

        if (monthValue <= 0 || monthValue > 12) {
            return monthValue;
        }

        var monthName = Date.cultureInfo.monthShortName[monthValue - 1] || monthValue;
        return monthName;
    };

    /**
     * Get Month Name (Long)
     * @param {int} month
     * @param {boolean} isShort
     * @returns {String}
     */
    Date.prototype.getMonthLongName = function (month) {
        var monthValue = month || this.month();

        if (monthValue <= 0 || monthValue > 12) {
            return monthValue;
        }

        var monthName = Date.cultureInfo.monthLongName[monthValue - 1] || monthValue;
        return monthName;
    };

    /**
     * Get Day of Week Name (Short)
     * @param {int} month
     * @returns {String}
     */
    Date.prototype.getDayOfWeekShortName = function (day) {
        var dayOfWeek = day || this.dayOfWeek();

        if (dayOfWeek < 0 || dayOfWeek > 7) {
            return dayOfWeek;
        }

        var dayOfWeekName = Date.cultureInfo.dayOfWeekShortName[dayOfWeek] || dayOfWeek;
        return dayOfWeekName;
    };

    /**
     * Get Day of Week (Long)
     * @param {int} month
     * @returns {String}
     */
    Date.prototype.getDayOfWeekLongName = function (day) {
        var dayOfWeek = day || this.dayOfWeek();

        if (dayOfWeek < 0 || dayOfWeek > 7) {
            return dayOfWeek;
        }

        var dayOfWeekName = Date.cultureInfo.dayOfWeekLongName[dayOfWeek] || dayOfWeek;
        return dayOfWeekName;
    };

    /**
     * Get AM Name or PM Name
     * @param {int} hours
     * @returns {String}
     */
    Date.prototype.getAmPmName = function (hours) {
        var hoursValue = hours || this.hours();

        if (hoursValue < 0 || hoursValue >= 24) {
            return "";
        }

        if (hoursValue >= 12) {
            return Date.cultureInfo.pmName;
        }
        else {
            return Date.cultureInfo.amName;
        }

    };

    /**
     * Covert 12 Hour System To 24 Hour System
     * @param {int} hours
     * @param {boolean} isPM
     * @returns {int}
     */
    Date.prototype.to24HourSystem = function (hours, isPM) {
        var newHours = hours || this.hours();

        if (isPM && newHours > 0) {
            newHours += 12;
        }
        return newHours;
    };

    /**
     * Covert 24 Hour System To 12 Hour System
     * @param {int} hours
     * @returns {int}
     */
    Date.prototype.to12HourSystem = function (hours) {
        var newHours = hours || this.hours();

        if (newHours > 12) {
            newHours -= 12;
        }

        return newHours;
    };

    /**
     * AD Year To ROC Year
     * @param {int} year
     * @returns {iny}
     */
    Date.prototype.toRocYear = function (year) {
        var newYear = year || this.year();

        return year - 1911
    };

    /**
     * ROC Year To AD Year
     * @param {int} year
     * @returns {iny}
     */
    Date.prototype.toADYear = function (rocYear) {
        return rocYear + 1911;
    };

    //#endregion Basic GET/SET


    //#region Basic Operator

    /**
     * Clear Time
     * @returns {Date}
     */
    Date.prototype.clearTime = function () {
        this.time(0, 0, 0, 0);
        return this;
    };

    //#endregion Basic Operator


    //#region Extend Operator

    /**
     * Parse DateTimeString
     * @param {string} dateTimeString
     * @returns {Date}
     */
    Date.prototype.parseDateTimeString = function (dateTimeString) {
        var date = new Date(Date.parse(dateTimeString));
        var dateTime = new Date(date.year(), date.month(), date.day(),
            date.hours(), date.minutes(), date.seconds(),
            date.milliseconds());
        this.setTime(dateTime.getTime());
        return this;
    };

    /**
     * Parse DateString
     * @param {string} dateString
     * @returns {Date}
     */
    Date.prototype.parseDateString = function (dateString) {
        var date = new Date(Date.parse(dateString));
        var dateTime = (new Date(date.year(), date.month(), date.day())).clearTime();
        this.setTime(dateTime.getTime());
        return this;
    };

    /**
     * Parse Time
     * @param {string} timeString
     * @returns {Date}
     */
    Date.prototype.parseTimeString = function (timeString) {
        var dateTimeString = (new Date().toFormatString("YYYY-MM-DD")) + " " + timeString;
        var date = new Date(Date.parse(dateTimeString));
        var dateTime = new Date(date.year(), date.month(), date.day(),
            date.hours(), date.minutes(), date.seconds(),
            date.milliseconds());
        this.setTime(dateTime.getTime());
        return this;
    };

    /**
     * To Format String
     * @param {String} format
     * @returns {String}
     */
    Date.prototype.toFormatString = function (format) {
        var dateTimeString = format || "YYYY-MM-DD HH:mm:ss.fff";
        var self = this;

        /**
         * PreFix Integer
         * @param {String} text
         * @param {int} number
         * @returns {String}
         */
        var prefixInteger = function (text, length) {
            return (Array(length).join('0') + text).slice(-length);
        }

        return dateTimeString.replace(/YY?Y?Y?|MM?M?M?|DD?D?D?|HH?|hh?|mm?|ss?|ff?f?/g, function (format) {
            switch (format) {
                case "YYYY":    return prefixInteger(self.year(), format.length);
                case "YYY":     return prefixInteger(self.year(), format.length);
                case "YY":      return prefixInteger(self.year(), format.length);
                case "Y":       return self.year();
                case "MMMM":    return self.getMonthLongName(self.month() + 1);
                case "MMM":     return self.getMonthShortName(self.month() + 1);
                case "MM":      return prefixInteger(self.month() + 1, format.length);
                case "M":       return self.month() + 1;
                case "DDDD":    return self.getDayOfWeekLongName(self.dayOfWeek());
                case "DDD":     return self.getDayOfWeekShortName(self.dayOfWeek());
                case "DD":      return prefixInteger(self.day(), format.length);
                case "D":       return self.day();
                case "HH":      return prefixInteger(self.hours(), format.length);
                case "H":       return self.hours();
                case "hh":      return self.getAmPmName(self.hours()) + " " + prefixInteger(self.to12HourSystem(self.hours()), format.length);
                case "h":       return self.getAmPmName(self.hours()) + " " + self.to12HourSystem(self.hours());
                case "mm":      return prefixInteger(self.minutes(), format.length);
                case "m":       return self.minutes();
                case "ss":      return prefixInteger(self.seconds(), format.length);
                case "s":       return self.seconds();
                case "fff":     return prefixInteger(self.milliseconds(), format.length);
                case "ff":      return prefixInteger(self.milliseconds(), format.length);
                case "f":       return self.milliseconds();
            }
        });
    };

    /**
     * To Format String
     * @param {String} format
     * @returns {String}
     */
    Date.prototype.toROCFormatString = function (format) {
        var dateTimeString = this.toFormatString(format || "民國y年M月D日 H時m分s秒");
        var self = this;

        /**
         * PreFix Integer
         * @param {String} text
         * @param {int} number
         * @returns {String}
         */
        var prefixInteger = function (text, length) {
            return (Array(length).join('0') + text).slice(-length);
        }

        /**
         * Parse ROC Year
         * @param {int} year
         * @param {int} number
         *  @returns {String}
         */
        var parseROCYear = function (year, number) {
            var rocYear = self.toRocYear(year);

            if (rocYear > 0) {
                if (number === 1) {
                    return rocYear;
                }
                else {
                    return prefixInteger(rocYear, number);
                }
            }
            else {
                if (number === 1) {
                    return "前" + ((rocYear - 1) * -1);
                }
                else {
                    return "前" + prefixInteger(((rocYear - 1) * -1), number);
                }
            }
        }

        return dateTimeString.replace(/yy?y?/g, function (format) {
            switch (format) {
                case "yyy": return parseROCYear(self.year(), format.length);
                case "yy": return parseROCYear(self.year(), format.length);
                case "y": return parseROCYear(self.year(), format.length);
            }
        });
    };

    //#endregion Extend Operator


    //#region Date Calculator

    /**
     * Add Date Duration
     * @param {Object} dateDuration
     * @returns {Date}
     */
    Date.prototype.add = function (dateDuration) {
        if (dateDuration == null) return this;

        if (!isNaN(dateDuration.years)) {
            this.addYear(dateDuration.years);
        }
        if (!isNaN(dateDuration.months)) {
            this.addMonth(dateDuration.months);
        }
        if (!isNaN(dateDuration.days)) {
            this.addDay(dateDuration.days);
        }
        if (!isNaN(dateDuration.hours)) {
            this.addHours(dateDuration.hours);
        }
        if (!isNaN(dateDuration.minutes)) {
            this.addMinutes(dateDuration.minutes);
        }
        if (!isNaN(dateDuration.seconds)) {
            this.addSeconds(dateDuration.seconds);
        }
        if (!isNaN(dateDuration.milliseconds)) {
            this.addMilliseconds(dateDuration.milliseconds);
        }
        return this;
    };

    /**
     * Year Calculator
     * @param {int} year
     * @returns {Date}
     */
    Date.prototype.addYear = function (year) {
        this.year(this.year() + year);
        return this;
    };

    /**
     * Month Calculator
     * @param {int} month
     * @returns {Date}
     */
    Date.prototype.addMonth = function (month) {
        this.month(this.month() + month);
        return this;
    };

    /**
     * Date Calculator
     * @param {int} date
     * @returns {Date}
     */
    Date.prototype.addDay = function (day) {
        this.day(this.day() + day);
        return this;
    };

    /**
     * Hours Calculator
     * @param {int} hours
     * @returns {Date}
     */
    Date.prototype.addHours = function (hours) {
        this.hours(this.hours() + hours);
        return this;
    };

    /**
     * Minutes Calculator
     * @param {int} minutes
     * @returns {Date}
     */
    Date.prototype.addMinutes = function (minutes) {
        this.minutes(this.minutes() + minutes);
        return this;
    };

    /**
     * Seconds Calculator
     * @param {int} seconds
     * @returns {Date}
     */
    Date.prototype.addSeconds = function (seconds) {
        this.seconds(this.seconds() + seconds);
        return this;
    };

    /**
     * Milliseconds Calculator
     * @param {int} milliseconds
     * @returns {Date}
     */
    Date.prototype.addMilliseconds = function (milliseconds) {
        this.milliseconds(this.milliseconds() + milliseconds);
        return this;
    };

    /**
     * Year+1
     * @returns {Date}
     */
    Date.prototype.nextYear = function () {
        return this.addYear(1);
    };

    /**
     * Year-1
     * @returns {Date}
     */
    Date.prototype.lastYear = function () {
        return this.addYear(-1);
    };

    /**
     * Month+1
     * @returns {Date}
     */
    Date.prototype.nextMonth = function () {
        return this.addMonth(1);
    };

    /**
     * Month-1
     * @returns {Date}
     */
    Date.prototype.lastMonth = function () {
        return this.addMonth(-1);
    };

    Date.prototype.nextWeek = function () {
        return this.addMonth(7);
    };

    Date.prototype.lastWeek = function () {
        return this.addMonth(-7);
    };

    /**
     * Day+1
     * @returns {Date}
     */
    Date.prototype.nextDay = function () {
        return this.addDay(1);
    };

    /**
     * Date-1
     * @returns {Date}
     */
    Date.prototype.lastDay = function () {
        return this.addDay(-1);
    };

    /**
     * Hours+1
     * @returns {Date}
     */
    Date.prototype.nextHours = function () {
        return this.addHours(1);
    };

    /**
     * Hours-1
     * @returns {Date}
     */
    Date.prototype.lastHours = function () {
        return this.addHours(-1);
    };

    /**
     * Minutes+1
     * @returns {Date}
     */
    Date.prototype.nextMinutes = function () {
        return this.addMinutes(1);
    };

    /**
     * Minutes-1
     * @returns {Date}
     */
    Date.prototype.lastMinutes = function () {
        return this.addMinutes(-1);
    };

    /**
     * Seconds+1
     * @returns {Date}
     */
    Date.prototype.nextSeconds = function () {
        return this.addSeconds(1);
    };

    /**
     * Seconds-1
     * @returns {Date}
     */
    Date.prototype.lastSeconds = function () {
        return this.addSeconds(-1);
    };

    /**
     * 毫秒數+1
     * @returns {Date}
     */
    Date.prototype.nextMilliseconds = function () {
        return this.addMilliseconds(1);
    };

    /**
     * 毫秒數-1
     * @returns {Date}
     */
    Date.prototype.lastMilliseconds = function () {
        return this.addMilliseconds(-1);
    };

    /**
     * Next Sunday
     * @returns {Date}
     */
    Date.prototype.nextSunday = function () {
        return this.nextDayOfWeek(0);
    };

    /**
     * Last Sunday
     * @returns {Date}
     */
    Date.prototype.lastSunday = function () {
        return this.lastDayOfWeek(0);
    };

    /**
     * Next Monday
     * @returns {Date}
     */
    Date.prototype.nextMonday = function () {
        return this.nextDayOfWeek(1);
    };

    /**
     * Last Monday
     * @returns {Date}
     */
    Date.prototype.lastMonday = function () {
        return this.lastDayOfWeek(1);
    };

    /**
     * Next Tuesday
     * @returns {Date}
     */
    Date.prototype.nextTuesday = function () {
        return this.nextDayOfWeek(2);
    };

    /**
     * Last Tuesday
     * @returns {Date}
     */
    Date.prototype.lastTuesday = function () {
        return this.lastDayOfWeek(2);
    };

    /**
     * Next Sunday
     * @returns {Date}
     */
    Date.prototype.nextWednesday = function () {
        return this.nextDayOfWeek(3);
    };

    /**
     * Last Sunday
     * @returns {Date}
     */
    Date.prototype.lastWednesday = function () {
        return this.lastDayOfWeek(3);
    };

    /**
     * Next Thursday
     * @returns {Date}
     */
    Date.prototype.nextThursday = function () {
        return this.nextDayOfWeek(4);
    };

    /**
     * Last Thursday
     * @returns {Date}
     */
    Date.prototype.lastThursday = function () {
        return this.lastDayOfWeek(4);
    };

    /**
     * Next Friday
     * @returns {Date}
     */
    Date.prototype.nextFriday = function () {
        return this.nextDayOfWeek(5);
    };

    /**
     * Last Friday
     * @returns {Date}
     */
    Date.prototype.lastFriday = function () {
        return this.lastDayOfWeek(5);
    };

    /**
     * Next Saturday
     * @returns {Date}
     */
    Date.prototype.nextSaturday = function () {
        return this.nextDayOfWeek(6);
    };

    /**
     * Last Saturday
     * @returns {Date}
     */
    Date.prototype.lastSaturday = function () {
        return this.lastDayOfWeek(6);
    };

    /**
     * Next Day Of Week
     * @param {int} dayofWeek
     * @returns {Date}
     */
    Date.prototype.nextDayOfWeek = function (dayofWeek) {
        var today = this.dayOfWeek();

        var duaration = 7 + (dayofWeek - today);
        duaration = (duaration % 7 == 0) ? duaration : duaration % 7;
        this.addDay(duaration);
        return this;
    };

    /**
     * Last Day Of Week
     * @param {int} dayofWeek
     * @returns {Date}
     */
    Date.prototype.lastDayOfWeek = function (dayofWeek) {
        var today = this.dayOfWeek();

        var duaration = -7 - (today - dayofWeek);
        duaration = (duaration % 7 == 0) ? duaration : duaration % 7;
        this.addDay(duaration);
        return this;
    };

    //#endregion Date Calculator


    //#region Compare

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isDayOfWeek = function (dayOffWeek) {
        return (this.dayOfWeek == dayOffWeek);
    };

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isSunday = function () {
        return this.isDayOfWeek(0);
    };

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isMonday = function () {
        return this.isDayOfWeek(1);
    };

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isTuesday = function () {
        return this.isDayOfWeek(2);
    };

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isWednesday = function () {
        return this.isDayOfWeek(3);
    };

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isThursday = function () {
        return this.isDayOfWeek(4);
    };

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isFriday = function () {
        return this.isDayOfWeek(5);
    };

    /**
     * Compare
     * @returns {boolean}
     */
    Date.prototype.isSaturday = function () {
        return this.isDayOfWeek(6);
    };

    //#endregion Compare
}());


/**
 * @class {Dictionary} JavaScript Date CultureInfo
 **/
exports.DateCultureInfo = (function () {
    function DateCultureInfo() {
    }

    DateCultureInfo.en_US = function () {
        return {
            dayOfWeekShortName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayOfWeekLongName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            monthShortName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            monthLongName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            amName: "AM",
            pmName: "PM"
        };
    };

    DateCultureInfo.zh_TW = function () {
        return {
            dayOfWeekShortName: ["日", "一", "二", "三", "四", "五", "六"],
            dayOfWeekLongName: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            monthShortName: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            monthLongName: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            amName: "上午",
            pmName: "下午"
        };
    };

    return DateCultureInfo;
})();


/**
 * @class {Dictionary} JavaScript Date Period
 **/
exports.DatePeriod = (function () {

    //#region Constructor

    function DatePeriod() {
    }

    /**
     * Get Instance
     * @returns {DatePeriod}
     */
    DatePeriod.getInstance = function () {
        return new DatePeriod();
    }

    //#endregion Constructor


    //#region Private Method

    /**
     * Get StartDate And EndDate
     * @param {Date} startDate
     * @param {Date} endDate
     * @returns {Object}
     */
    DatePeriod.prototype._getDatePeriod = function (startDate, endDate) {
        var datePeriod = {
            start: startDate,
            end: endDate
        }
        return datePeriod;
    };


    //#endregion Private Method


    //#region Public Method

    /**
     * Get Year Period
     * @param {Date} date
     * @returns {Object}
     */
    DatePeriod.prototype.getYearPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), 0, 0).nextDay();
        startDate.clearTime();

        // End Date
        var endDate = new Date(startDate);
        console.log(startDate.toFormatString());
        console.log(endDate.toFormatString());
        endDate.nextYear().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Month Period
     * @param {Date} date
     * @returns {Object}
     */
    DatePeriod.prototype.getMonthPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), 0).nextDay();
        startDate.clearTime();

        // End Date
        var endDate = new Date(startDate);
        endDate.nextMonth().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Week Period
     * @param {Date} date
     * @param {boolean} isMondayFirst
     * @returns {Object}
     */
    DatePeriod.prototype.getWeekPeriod = function (date, isMondayFirst) {
        // Monday First
        var dayOfWeek = date.dayOfWeek();
        if (isMondayFirst !== undefined && isMondayFirst === true) {
            dayOfWeek--;
            if (dayOfWeek < 0) {
                dayOfWeek = 6;
            }
        }

        // Start Date
        var startDate = new Date(date);
        startDate.addDay(-dayOfWeek);
        startDate.clearTime();

        // End Date
        var endDate = new Date(date);
        endDate.clearTime();
        endDate.addDay(7 - dayOfWeek).lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Day Period
     * @param {Date} date
     * @returns {Object}
     */
    DatePeriod.prototype.getDayPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.clearTime();

        // End Date
        var endDate = new Date(startDate);
        endDate.nextDay().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Hour Period
     * @param {Date} date
     * @returns {Object}
     */
    DatePeriod.prototype.getHourPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.time(date.hours(), 0, 0, 0);

        // End Date
        var endDate = new Date(startDate);
        endDate.nextHours().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Minute Period
     * @param {Date} date
     * @returns {Object}
     */
    DatePeriod.prototype.getMinutePeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.time(date.hours(), date.minutes(), 0, 0);

        // End Date
        var endDate = new Date(startDate);
        endDate.nextMinutes().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };

    /**
     * Get Second Period
     * @param {Date} date
     * @returns {Object}
     */
    DatePeriod.prototype.getSecondPeriod = function (date) {
        // Start Date
        var startDate = new Date(date);
        startDate.date(date.year(), date.month(), date.day());
        startDate.time(date.hours(), date.minutes(), date.seconds(), 0);

        // End Date
        var endDate = new Date(startDate);
        endDate.nextSeconds().lastMilliseconds();

        return this._getDatePeriod(startDate, endDate);
    };


    //#endregion Public Method


    return DatePeriod ;
})();


/**
 * @class {Dictionary} JavaScript Date Duration
 **/
exports.DateDuration = (function () {

    //#region Constructor

    function DateDuration() {
    }

    DateDuration.getInstance = function () {
        return new DateDuration();
    }

    //#endregion Constructor


    //#region Public Method

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationSeconds = function (fromDate, toDate) {
        var diffMilliseconds = toDate - fromDate;
        return Number((diffMilliseconds / 1000).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationMintues = function (fromDate, toDate) {
        var diffSeconds = this.durationSeconds(fromDate, toDate);
        return Number((diffSeconds / 60).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationHours = function (fromDate, toDate) {
        var diffMintues = this.durationMintues(fromDate, toDate);
        return Number((diffMintues / 60).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationDays = function (fromDate, toDate) {
        var diffHours = this.durationHours(fromDate, toDate);
        return Number((diffHours / 24).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationWeeks = function () {
        var diffDays = this.durationDays(fromDate, toDate);
        return Number((diffDays / 7).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationMonths = function (fromDate, toDate) {
        var diffDays = this.durationDays(fromDate, toDate);
        return Number((diffDays / 30).toFixed(1));
    };

    /**
     * @param {Date} fromDate
     * @param {Date} toDate
     * @returns {double}
     */
    DateDuration.prototype.durationYears = function (fromDate, toDate) {
        var diffDays = this.durationDays(fromDate, toDate);
        return Number((diffDays / 365).toFixed(1));
    };

    //#endregion Public Method

    return DateDuration;
})();


//====================================================================================================
// Description：Easy String
//====================================================================================================

/**
 * Description：String Extend
 **/
module.exports = (function () {
    /**
     * String Format (C#)
     * @returns {string}
     */
    String.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    };

    /**
     * String Format (Java、C++、PHP)
     * @returns {string}
     */
    String.sprintf = function () {
        var args = arguments;
        var text = args[0];
        var index = 1;
        return text.replace(/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g, function (exp, p0, p1, p2, p3, p4) {
            if (exp == '%%') return '%';
            if (index >= args.length) return exp;
            var exp = p2 ? parseInt(p2.substr(1)) : undefined;
            var base = p3 ? parseInt(p3.substr(1)) : undefined;
            var val;
            switch (p4) {
                case 's': val = args[index++]; break;
                case 'c': val = args[index++][0]; break;
                case 'f': val = parseFloat(args[index++]).toFixed(exp); break;
                case 'p': val = parseFloat(args[index++]).toPrecision(exp); break;
                case 'e': val = parseFloat(args[index++]).toExponential(exp); break;
                case 'x': val = parseInt(args[index++]).toString(base ? base : 16); break;
                case 'd': val = parseFloat(parseInt(args[index++], base ? base : 10).toPrecision(exp)).toFixed(0); break;
            }
            val = typeof (val) == 'object' ? JSON.stringify(val) : val.toString(base);
            var sz = parseInt(p1); /* padding size */
            var ch = p1 && p1[0] == '0' ? '0' : ' '; /* isnull? */
            while (val.length < sz) val = p0 !== undefined ? val + ch : ch + val; /* isminus? */
            return val;
        });
    };

    /**
     * String Empty
     * @returns {string}
     */
    String.empty = function () {
        return "";
    };

    /**
     * String Is Empty
     * @returns {bool}
     */
    String.prototype.isEmpty = function () {
        return (this === undefined || this.length === 0);
    };

    /**
     * String Is Null
     * @returns {boolean}
     */
    String.prototype.isNull = function () {
        return this === undefined;
    };

    /**
     * Strgin Equals
     * @param {String} text
     */
    String.prototype.equals = function (text) {
        return (this === text);
    };

    /**
     * Strgin Equals Ignore Case
     * @param {String} text
     */
    String.prototype.equalsIgnoreCase = function (text) {
        return (this.toUpperCase() === text.toUpperCase());
    };

    /**
     * Trim String
     * @param {String} trimStr
     * @returns {String}
     */
    String.prototype.trim = function(trimStr) {
        return this.trimStart(trimStr).trimEnd(trimStr);
    };

    /**
     * Trim String (Start)
     * @param {String} trimStr
     * @returns {String}
     */
    String.prototype.trimStart = function(trimStr) {
        var newtempStr = (trimStr) ? trimStr : " ";
        var tempStr = this;

        while(true) {
            if(tempStr.substr(0, newtempStr.length) != newtempStr) {
                break;
            }
            tempStr = tempStr.substr(newtempStr.length);
        }

        return tempStr;
    };

    /**
     * Trim String (End)
     * @param {String} trimStr
     * @returns {String}
     */
    String.prototype.trimEnd = function(trimStr){
        var newtempStr = (trimStr) ? trimStr : " ";
        var tempStr = this;

        while(true) {
            if (tempStr.substr(tempStr.length - newtempStr.length, newtempStr.length) != newtempStr) {
                break;
            }
            tempStr = tempStr.substr(0, tempStr.length-newtempStr.length);
        }
        return tempStr;
    };
}());


exports.Timing = (function () {
    function Timing() {
        this._timeoutTimer = undefined;
        this._intervalTimer = undefined;
    }

    /**
     * Sleep
     * @param {int} milliseconds
     */
    Timing.sleep = function (milliseconds) {
        var time = new Date().getTime();
        while(new Date().getTime() - time < milliseconds);
    };

    /**
     * Start Delayed
     * @param {function} callback
     * @param {int} milliseconds
     */
    Timing.prototype.startDelayed = function (callback, milliseconds) {
        this._timeoutTimer = window.setTimeout(callback, milliseconds);
    };

    /**
     * Stop Delayed
     */
    Timing.prototype.stopDelayed = function () {
        if(this._timeoutTimer != undefined) {
            window.clearTimeout(this._timeoutTimer);
            this._timeoutTimer = undefined;
        }
    };

    /**
     * Start Timer
     * @param {function} callback
     * @param {int} milliseconds
     */
    Timing.prototype.startTimer = function (callback, milliseconds) {
        this._intervalTimer = window.setInterval(callback, milliseconds);
    };

    /**
     * Stop Timer
     */
    Timing.prototype.stopTimer = function () {
        if(this._intervalTimer != undefined) {
            window.clearInterval(this._intervalTimer);
            this._intervalTimer = undefined;
        }
    };

    return Timing;
})();


//====================================================================================================
// Description：Uri Manager
//====================================================================================================

/**
 *
 * @class {UrlManager}
 */
exports.UriManager = (function () {

    /**
     * @constructor
     */
    function UriManager() {
    }

    /**
     * Get URL Parameter Parser
     * @param {string} URL (Optional)
     * @returns {Dictionary}
     */
    UriManager.parseGetUrl = function (url) {
        var getUrl = url || window.location.search;
        var dictionary = new Dictionary();
        if (getUrl.indexOf("?") != -1) {
            var search = getUrl.split("?");
            var parameter = search[1].split("&");

            for (i = 0; i < parameter.length; i++) {
                var pairKeyValue = parameter[i].split("=");
                dictionary.add(pairKeyValue[0], pairKeyValue[1]);
            }
        }
        return dictionary;
    };

    /**
     *
     * @param {string} Text
     * @returns {string}
     */
    UriManager.encodeURI = function (text) {
        return encodeURI(text);
    };

    /**
     *
     * @param {string} Text
     * @returns {string}
     */
    UriManager.encodeURIComponent = function (text) {
        return encodeURIComponent(text);
    };

    /**
     *
     * @param {string} Text
     * @returns {string}
     */
    UriManager.encodeURISpecialChars = function (text) {
        var ajaxSpecialCharsRegEx = /[+&?=#;:,$@/]/gm;
        return text.replace(ajaxSpecialCharsRegEx, function (match) {
            var ajaxSpecialCharsPlaceHolders = {
                '+': '%2B',
                '&': '%26',
                '?': '%3F',
                '=': "%3D",
                '#': "%23",
                ';': "%3B",
                ':': "%3A",
                ',': "%2C",
                '$': "%24",
                '@': "%40",
                '/': "%2F"
            };
            return ajaxSpecialCharsPlaceHolders[match];
        });
    };

    /**
     *
     * @param {string} Text
     * @returns {string}
     */
    UriManager.decodeURI = function (text) {
        return decodeURI(text);
    };

    /**
     *
     * @param {string} Text
     * @returns {string}
     */
    UriManager.decodeURIComponent = function (text) {
        return decodeURIComponent(text);
    };

    return UriManager;
})();