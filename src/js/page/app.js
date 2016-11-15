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
            //this.initPricer();
            Workopolis.AccessibilityEnhancer.init();
            //console.log('hello page');
        },

        initPricer: function(){
          //alert('hello');
            // elements
            var numberJobs = document.querySelector('.pricer-count');
            var SJPrice = document.querySelector('.js-pricer-total');
            var singelSave = document.querySelector('.js-pricer-single-save');
            var unlimitedSave = document.querySelector('.js-unlimited-save');
            var recoText = document.querySelector('.pricer-reco-text');
            var toutPrice = document.querySelector('.pricer-tout-price');
            var productReco = document.querySelector('.price-reco-val');



            //Reco data
            var pricerReco = [
                {
                    id: 1,
                    text: 'If you know you only need to post a single job in the next 12 months then our Single Job Posting product may be right for you.',
                    prod: 'Single Job Posting'
                },
                {
                    id: 2,
                    text: 'If you only post two jobs in the next year you\'re still better off with the Unlimited Subscription which includes over $500 in additional savings.',
                    prod: 'Unlimited Subscription'
                 },
                {
                    id: 3,
                    text: 'The best deal is the Unlimited Subscription. Whether you post 3 or 300 jobs you will save money.',
                    prod: 'Unlimited Subscription'
                },
                {
                    id: 4,
                    text: 'Yes, it really is a good deal. If you still need convincing please call one of our representative at 416-967-1111',
                    prod: 'Unlimited Subscription'
                }
            ]

            //user input - number of postings
            var number = numberJobs.value;

            //pricing values
            var SJPCost = "595";
            var tax = ".15";
            var subCost = "1200.00";

            numberJobs.addEventListener("input", function(e) {
                number = numberJobs.value;

                var total = number * SJPCost;
                var taxed = total * tax;
                var displayPrice = total;

                document.querySelector('.js-pricer-reco').classList.add('is-active');

                SJPrice.textContent = '$' + displayPrice;

                var saving = subCost - displayPrice;
                console.log(saving);

                //Math-o-matic 5000
                if(saving > 0){
                    var saveNum = subCost - displayPrice;
                    singelSave.textContent = '$' + saveNum;
                    unlimitedSave.textContent = "--";
                }
                else{
                    singelSave.textContent = '--';
                    unlimitedSave.textContent = '$' + Math.abs(saving);
                }

                //Price Reco Thing

                if( number == 1){
                    console.log('1 posting');
                    recoText.textContent = pricerReco[0].text;
                    toutPrice.textContent = '$' + total;
                    productReco.textContent = pricerReco[0].prod;
                }
                else if ( number == 2 ) {
                    console.log('2 postings');
                    recoText.textContent = pricerReco[1].text;
                    toutPrice.textContent = '$' + Math.abs(saving);
                    productReco.textContent = pricerReco[1].prod;
                }

                else if ( number >= 3 && number <= 20){
                    console.log('between 3 and 20');
                    recoText.textContent = pricerReco[2].text;
                    toutPrice.textContent = '$' + Math.abs(saving);
                    productReco.textContent = pricerReco[2].prod;
                }
                else{
                    console.log('more than 20');
                    recoText.textContent = pricerReco[3].text;
                    toutPrice.textContent = '$' + Math.abs(saving);
                    productReco.textContent = pricerReco[3].prod;
                }
            }, false);


        },

        initLocamativeTitle: function(){
            var location = [
                'in Ontario',
                'in Alberta',
                'in Nova Scotia',
                'in Quebec',
                'in British Colombia',
                'in Saskatchewan',
                'in Manitoba',
                'in Newfoundland',
                'in New Brunswick',
                'in Prince Edward Island',
                'in Nunavat',
                'in Yukon',
                'in Northwest Territories',
                'in Canada'
            ];


            var maxLoops = 10;
            var counter = 0;

            (function next() {
                if (counter++ > maxLoops) return;

                    setTimeout(function() {
                        var rando = location[Math.floor(Math.random() * location.length)];
                        var locaChange = document.querySelector('.locamotive');
                        locaChange.textContent = rando;
                    next();
                }, 300);


            }) ();
        },

        initCanada: function(){
            setTimeout(function() {
                var locaChange = document.querySelector('.locamotive');
                locaChange.textContent = 'Anywhere in Canada';
            },3700);

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
