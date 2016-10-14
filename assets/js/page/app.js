/*********************************************************************************
 Name: Employer Nav
 Dependencies:
 Description:JS for the new Employer Nav.
**********************************************************************************/

var Workopolis = Workopolis || {};


(function (Workopolis, $) {
    'use strict';

    $(document).ready(function () {
        Workopolis.EmployerStatic.init();
    });

    var EmployerStatic = {


        /******************* FUNCTION DEFINITIONS *********************/
        init: function () {

            //this.initAccountSubMenu();
            //this.initHelpMenu();
            this.initHeaderTitle();
            this.initLanguageToggle();
            Workopolis.AccessibilityEnhancer.init();

        },

        initHeaderTitle: function () {
            var title = $('.header-page-title').val();
            $('.employer-header-title').html(title);
        },

        initLanguageToggle: function () {
            $("#lang-switch-container").html($("#lang-switch-link").val());
            $("#lang-switch-container a").addClass("eha-support-nav-item-link");
        },

        observeFontLoading: function () {
            //font observer for gotham and whitney
            var observer = new FontFaceObserver('Gotham A, Gotham B, Whitney SSm A, Whitney SSm B');

            function createCookie(name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                }
                else var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            }

            //checking for the fonts download status
            observer.check(null, 5000).then(function () {
                if (document.cookie.indexOf("fonts-loaded") < 0) {
                    console.log('All of your fonts are ready');
                    document.documentElement.className += " fonts-loaded";
                    //set the cookie to expire in two weeks
                    createCookie("fonts-loaded", "true", "14");
                }
            }, function () {
                console.log('Slow network, no webfonts');  
            });
        }

    };

    Workopolis.EmployerStatic = EmployerStatic;

}(Workopolis || {}, jQuery));

// Load fonts right away, before DOM ready
Workopolis.EmployerStatic.observeFontLoading();
