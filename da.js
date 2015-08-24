/*created by Ivan Kamenkov and Kirill Matrosov*/
function DomAssitant (){

    function _DomAssitant(  ) {
        return this;
    }
    _DomAssitant =
    {
        currentElement: null,
        child: [],
        constructor: _DomAssitant,
        init: function(elem)
        {
            _DomAssitant.currentElement = elem;
            return this;
        },
        gi: function (id) {
            _DomAssitant.currentElement = document.getElementById(id);
            return this;
        },

        ce: function (t) {
            _DomAssitant.currentElement = document.createElement(t);
            return this;
        },
        getCE: function()
        {
            return this.currentElement;
        },
        ct: function (t) {
            _DomAssitant.currentElement = document.createTextNode(t);
            return this;
        },
        gt: function (element, t) {
            element = element || document;
            return element.getElementsByTagName(t);
        },
        ac: function (child, content) { //appendChildToNode

            child = document.createElement(child);
            if (content)
                child.innerHTML = content;
            this.currentElement.appendChild(child);
            return child;
        },
        racfn: function () { //removeAllChildrenFromNode

            while (this.currentElement.firstChild) {
                this.currentElement.removeChild(this.currentElement.firstChild);
            }
        },
        children: function () {

            var elem = this.currentElement.childNodes[0];
        },
        insertAfter: function (element) {
            this.currentElement.parentNode.insertBefore(element, this.nextSibling);
            return this;
        },
        getDocumentElementsWithAttribute: function (attributeName) {
            var attributeValue = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
            var element = arguments.length <= 2 || arguments[2] === undefined ? this.currentElement : arguments[2];
            return element.querySelectorAll("[" + attributeName + "=\"" + attributeValue + "\"]");
        },
        addClass: function (className) {
            this.currentElement.classList.add(className);
            return this;
        },
        hasClass: function (className) {
            return (" " + this.currentElement.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1;
        },
        removeClass: function (className) {
            this.currentElement.classList.remove(className);
            return this;
        },
        attr: function (attributeName, attributeContent) {
            this.currentElement.setAttribute(attributeName, attributeContent);
            return this;
        },
        replace: function (targetElement) {
            targetElement.parentNode.replaceChild(this.currentElement, targetElement);
            return this;
        },
        on: function (eventType, eventFunction) {
            this.currentElement["on" + eventType] = eventFunction;
            return this;
        },
        off: function (eventType) {

            this.currentElement["on" + eventType] = null;
            return this;
        },
        css: function (rule, value) {
            this.currentElement.style[rule] = "" + value;
            return this;
        },
        text: function(text)
        {
            if (text)
                this.currentElement.innerHTML = text;
            return this;
        }
    };
    return _DomAssitant;
}