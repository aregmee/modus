function Accordion() {

    this._init = function() {

        var acc = document.getElementsByClassName("accordion-title");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = this._acc_function;
        }
    };

    this._acc_function = function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    };

    this._init();
}

function Tab() {

    this._init = function() {

        var tabs = document.getElementsByClassName('tab');
        var i;

        for (i = 0; i < tabs.length; i++) {

            tabs[i].getElementsByTagName('a')[0].onclick = this._tab_function;
        }
    };

    this._tab_function = function(e) {

        e.preventDefault();
        var tabContents = this.parentElement.parentElement.getElementsByClassName('tab');
        var tabContent = this.nextElementSibling;
        tabContent.style.opacity = 1;
        this.className = 'active';

        for (var j = 0; j < tabContents.length; j++) {

            if (this.parentElement === tabContents[j])
                continue;
            tabContents[j].getElementsByClassName('tab-content')[0].style.opacity = 0;
            tabContents[j].getElementsByTagName('a')[0].className = '';
        }
    };

    this._init();
}

function Slider(sliderName) {

    var _this;
    this._init = function() {

        _this = this;
        this.sliderName = sliderName;
        this.currentSliderNo = 0;
        var buttons = document.getElementsByClassName(this.sliderName + '-slider-wrapper')[0]
            .getElementsByClassName('button-holder')[0]
            .getElementsByClassName('slider-change');
        this.buttons = buttons;

        var nav_buttons = document.getElementsByClassName(this.sliderName + '-slider-wrapper')[0]
            .getElementsByClassName('slider-nav')[0]
            .getElementsByTagName('a');

        for (var j = 0; j < buttons.length; j++) {

            buttons[j].onclick = this._slide_function;
        }

        nav_buttons[0].onclick = this._prevFunction;
        nav_buttons[1].onclick = this._next_function;
        if (buttons.length > 0)
            buttons[0].click();
    };

    this._slide_function = function(e) {

        e.preventDefault();
        _this._stopMainSlide();
        _this._startMainSlide(1);
        _this.buttons[_this.currentSliderNo].style.content = '';
        var imageHolder = document.getElementsByClassName(_this.sliderName + '-slider-wrapper')[0]
            .getElementsByClassName('image-holder')[0];
        var sliderNoToGoTo = (parseInt(this.getAttribute('href').replaceAll(/[^\d.]/g, "")) - 1);
        imageHolder.style.left = '-' + (sliderNoToGoTo * 100) + '%';
        _this.currentSliderNo = sliderNoToGoTo;

        this.style.content = "url('images/current_slider.png')";
    };

    this._next_function = function(e) {

         e.preventDefault();
         _this._stopMainSlide();
        _this._startMainSlide(1);
        _this._goToNext();
    }

    this._goToNext = function(){

        _this.buttons[_this.currentSliderNo].style.content = '';
        var imageHolder = document.getElementsByClassName(_this.sliderName + '-slider-wrapper')[0].getElementsByClassName('image-holder')[0];
        var noOfImages = imageHolder.children.length;

        var currentLeft = parseInt(imageHolder.style.left.replaceAll(/[^\d.]/g, ""));

        if (!isNaN(currentLeft))
            if (currentLeft < (noOfImages - 1) * 100) {
                imageHolder.style.left = '-' + (currentLeft + 100) + '%';
                _this.currentSliderNo += 1;
            } else {
                imageHolder.style.left = '-0%';
                _this.currentSliderNo -= (noOfImages - 1);
            }
        else {
            imageHolder.style.left = '-' + 100 + '%';
            _this.currentSliderNo += 1;
        }
        _this.buttons[_this.currentSliderNo].style.content = "url('images/current_slider.png')";
    };

    this._prevFunction = function(e) {

        _this._stopMainSlide();
        _this._startMainSlide(1);
        e.preventDefault();
        _this.buttons[_this.currentSliderNo].style.content = '';
        var imageHolder = document.getElementsByClassName(_this.sliderName + '-slider-wrapper')[0]
            .getElementsByClassName('image-holder')[0];
        var noOfImages = imageHolder.children.length;
        var currentLeft = parseInt(imageHolder.style.left.replaceAll(/[^\d.]/g, ""));
        if (currentLeft > 0) {
            imageHolder.style.left = '-' + (currentLeft - 100) + '%';
            _this.currentSliderNo -= 1;
        } else {
            imageHolder.style.left = '-' + (noOfImages - 1) * 100 + '%';
            _this.currentSliderNo += (noOfImages - 1);
        }
        _this.buttons[_this.currentSliderNo].style.content = "url('images/current_slider.png')";
    };

    this._startMainSlide = function(offset){

        this.mainSlidingInterval = setInterval(this._goToNext, 3000 + (offset * 1000));
    };

    this._stopMainSlide = function(){

        if (_this.mainSlidingInterval != false) {
            clearInterval(_this.mainSlidingInterval);
            _this.mainSlidingInterval = false;
        }
    };

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    this._init();
}

function Search() {

    var _this;
    this._init = function() {

        _this = this;
        this.searchButton = document.getElementsByClassName('search-button')[0];
        this.searchButton.onclick = this._toggleSearchBox;

        this.searchBox = document.getElementsByClassName('search-box-container')[0];
        document.onclick = this._closeSearchBox;
    };

    this._toggleSearchBox = function(e) {

        e.preventDefault();
        e.stopPropagation();

        if (_this.searchBox.style.opacity === undefined || _this.searchBox.style.opacity == 0) {
            _this.searchBox.style.opacity = 1;
            _this.searchButton.className = 'search-button active';
        } else {
            _this.searchBox.style.opacity = 0;
            _this.searchButton.className = 'search-button';
        }
    };

    this._closeSearchBox = function(e) {

        if (_this.searchBox.style.opacity == 1) {

            if (e.target.parentElement !== _this.searchBox.getElementsByClassName('search-box')[0]) {
                _this.searchBox.style.opacity = 0;
                _this.searchButton.className = 'search-button';
            }
        }
    };

    this._init();
}

function Hamburger(){

    this._init = function() {

        var acc = document.getElementsByClassName("menu-open")[0];
        acc.onclick = this._acc_function;
    };

    this._acc_function = function() {
        this.classList.toggle("active");
        var panel = this.parentElement.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            this.style.content = 'url(images/menu-toggle.png)';
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            this.style.content = 'url(images/menu-close.png)';
        }
    };

    this._init();
}

new Accordion();
new Tab();
new Slider('project');
new Slider('page');
new Slider('sidebar');
new Search();
new Hamburger();