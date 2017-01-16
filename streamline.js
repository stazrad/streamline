

$(document).scroll(function(event) {
    var scroll = $(window).scrollTop();
    if(scroll > 200) {
        $('.toTheTop').css({bottom:'8%'});
    } else {
        $('.toTheTop').css({bottom:'-80px'});
    };
});

$('.toTheTopArrow').click(function() {
    $('.toTheTop').css({bottom:'-80px'});
    $('#userInput').val('');
    $('#userInput').focus();
    $('.toTheTop').css({bottom:'-80px'});
});

//search toggle
var movieSearch = true;
$('.slider').click(function() {
    if(movieSearch === true) {
        movieSearch = false;
    } else {
        movieSearch = true;
    };
    if($('#userInput').val() != '') {
        runSearch();
    };
});
$('.slider-before').click(function() {
    if(movieSearch === true) {
        movieSearch = false;
    } else {
        movieSearch = true;
    };
    if($('#userInput').val() != '') {
        runSearch();
    };
});
$('.onoffswitch-label').click(function() {
    if(movieSearch === true) {
        movieSearch = false;
    } else {
        movieSearch = true;
    };
    if($('#userInput').val() != '') {
        runSearch();
    };
});


//remove hover effects on .slider:before click
$('.slider').on('click', function() {
    $(this).addClass('no-hover');
});

// //input placeholder text change on initial window size & resize
// if($(window).width() <= 600) {
//     document.getElementById('userInput').setAttribute('placeholder', 'type title + tap logo ^')
//     document.getElementById('userInput').setAttribute('onblur', 'this.placeholder = "type title + tap logo ^"');
// };
// $(window).resize(function() {
//     if($(window).width() <= 600) {
//         document.getElementById('userInput').setAttribute('placeholder', 'type title + tap logo ^');
//         document.getElementById('userInput').setAttribute('onblur', 'this.placeholder = "type title + tap logo ^"');
//     } else {
//         document.getElementById('userInput').setAttribute('placeholder', 'type title + press enter');
//         document.getElementById('userInput').setAttribute('onblur', 'this.placeholder = "type title + press enter"');
//     };
// });

Array.prototype.push();
String.prototype.replace();

var data;
var resultsArray = [];
var loadingResults = false;

var baseAPI = 'http://api-public.guidebox.com/v1.43/';
var region = 'US/';
var key = 'rK3Jy0kB3CZM9FTSduDgHNZ74UHh3dxA/';
var movieTitle = 'search/movie/title/';
var showTitle = 'search/title/'
var fuzzySearch = 'fuzzy/';
var exactSearch = 'exact/';

var imgSourcePath = 'http://www.jakewebbsite.com/streamline/';


var runSearch = function() {
    loadingResults = true;
    //movieSearch = false;
    $('#userInput').blur();
    loadResults();
    resizeHeader();
    submitSearch();
};

$('#userInput').keypress(function(enter) {
    if(enter.which == 13) {
        if($('#userInput').val() != '') {
            runSearch();
        };
    };
});

// $('.mobileLogo').click(function() {
//     loadingResults = true;
//     loadResults();
//     resizeHeader();
//     submitSearch();
// });

var resizeHeader = function() {
    $('#header').css('padding-top','4%');
    $('.resize').addClass('resize-shrink');
    $('.toTheTop').css('bottom','-80px');
    $('.tagline').css('display','none');
};

var submitSearch = function() {
    $('#searchResultsContainer').empty();
    $('.counter').empty();
    var tripleEncode = function(input) {
        var userInput = '';
        for(var i = 0; i < input.length; i++) {
            if (input[i] === ' ') {
                userInput += input[i].replace(' ', '%252520');
            } else {
                userInput += input[i];
            };
        };
        return userInput;
    };

    var resultID = null;
    var userInput = document.getElementById('userInput').value;
    var userInputEncoded = tripleEncode(userInput) + '/';

    var guideBoxAPIExact = baseAPI + region + key + movieTitle + userInputEncoded + exactSearch;
    var movieGuideBoxAPIFuzzy = baseAPI + region + key + movieTitle + userInputEncoded + fuzzySearch;
    var showsGuideBoxAPIFuzzy = baseAPI + region + key + showTitle + userInputEncoded + fuzzySearch;

    if(movieSearch === true) {
        var getMovieDataFuzzy = $.getJSON(movieGuideBoxAPIFuzzy, function(data) {
            var result = data.results;

            if(result.length === 0){
                $('.counter').append('<em>' + result.length + ' results...check your spelling, maybe?</em>');
            }else if(result.length === 1){
                $('.counter').append('<em>' + result.length + ' result!</em>');
            }else if(result.length < 50){
                $('.counter').append('<em>' + result.length + ' results:</em>');
            }else{
                $('.counter').append('<em>' + result.length + '+ results...</em> (try a more specific search)');
            };

            for(var i = 0; i < result.length; i++) {
                resultsArray = [];
                result[i].netflix = false;
                result[i].huluPlus = false;
                result[i].amazonPrime = false;
                result[i].hboNow = false;
                result[i].starzPlay = false;
                result[i].showtime = false;
                result[i].noStreams = true;
                resultsArray[i] = result[i];
                var imdb = 'http://www.imdb.com/title/' + result[i].imdb;
                $('#searchResultsContainer').append('<div class="result" id="result' + i + '">' + '<div class="resultHeader" id="resultHeader' + i + '">' + '<em>' + result[i].title + '</em>, ' + result[i].release_year + '<br/>' + '<a title="To IMBd" target="_blank" href="' + imdb + '">' + '<img class="movieTitle" src="' + result[i].poster_120x171 + '">' + '</a>' + '</div><div class="resultSources" id="resultSources' + i + '"></div></div><br>');

                resultID = result[i].id;
                getMovieSources(resultID, i, result);
            };
        });
    } else {
        var getShowDataFuzzy = $.getJSON(showsGuideBoxAPIFuzzy, function(data) {
            var result = data.results;

            if(result.length === 0){
                $('.counter').append('<em>' + result.length + ' results...check your spelling, maybe?</em>');
            }else if(result.length === 1){
                $('.counter').append('<em>' + result.length + ' result!</em>');
            }else if(result.length < 50){
                $('.counter').append('<em>' + result.length + ' results:</em>');
            }else{
                $('.counter').append('<em>' + result.length + '+ results...</em> (try a more specific search)');
            };

            for(var i = 0; i < result.length; i++) {
                resultsArray = [];
                result[i].netflix = false;
                result[i].huluPlus = false;
                result[i].amazonPrime = false;
                result[i].hboNow = false;
                result[i].starzPlay = false;
                result[i].showtime = false;
                result[i].noStreams = true;
                resultsArray[i] = result[i];
                var imdb = 'http://www.imdb.com/title/' + result[i].imdb_id;
                $('#searchResultsContainer').append('<div class="result" id="result' + i + '">' + '<div class="resultHeader" id="resultHeader' + i + '">' + '<em>' + result[i].title + '</em>' + '<br/>' + '<a title="To IMBd" target="_blank" href="' + imdb + '">' + '<img src="' + result[i].artwork_208x117 + '">' + '</a>' + '</div><div class="resultSources" id="resultSources' + i + '"></div></div><br>');

                resultID = result[i].id;
                getShowSources(resultID, i, result);

            };
        });
    };
};

var getMovieSources = function(resultID, i, result) {
    var resultAPI = baseAPI + region + key + 'movie/' + resultID;
    var sourceDivId = '#resultSources' + i;
    var getSource = $.getJSON(resultAPI, function(dataAlt) {


        var sourcesSubWeb = dataAlt.subscription_web_sources;
        for(var j = 0; j < sourcesSubWeb.length; j++) {
            if(sourcesSubWeb.length === 0) {
                result[i].noStreams = true;
            } else {
                if(sourcesSubWeb[j].source === 'netflix') {
                    result[i].netflix = true;
                    result[i].netflixURL = sourcesSubWeb[j].link;
                };
                if(sourcesSubWeb[j].source === 'amazon_prime') {
                    result[i].amazonPrime = true;
                    result[i].amazonPrimeURL = sourcesSubWeb[j].link;
                };
                if(sourcesSubWeb[j].source === 'hulu_plus') {
                    result[i].huluPlus = true;
                    result[i].huluPlusURL = sourcesSubWeb[j].link;
                };
                if(sourcesSubWeb[j].source === 'starz_subscription') {
                    result[i].starzPlay = true;
                    result[i].starzPlayURL = sourcesSubWeb[j].link;
                };
                if(sourcesSubWeb[j].source === 'hbo_now') {
                    result[i].hboNow = true;
                    result[i].hboNowURL = sourcesSubWeb[j].link;
                };
                if(sourcesSubWeb[j].source === 'showtime_subscription') {
                    result[i].showtime = true;
                    result[i].showtimeURL = sourcesSubWeb[j].link;
                };
            };
        };


        var sourcesTV = dataAlt.tv_everywhere_web_sources;
        for(var j = 0; j < sourcesTV.length; j++) {
            var id = '#resultSources' + i;
            if(sourcesTV[j].source === 'starz_tveverywhere') {
                result[i].starzPlay = true;
                result[i].starzPlayURL = sourcesTV[j].link;
            };
        };


        var sourcesPurchaseWeb = dataAlt.purchase_web_sources;
        for(var j = 0; j < sourcesPurchaseWeb.length; j++) {
            if(sourcesPurchaseWeb[j].source === 'itunes') {
                result[i].purchaseiTunes = sourcesPurchaseWeb[j];
            };
        };

        function StreamResult(name, image, url) {
            this.name = name;
            this.image = '<img class="streamLogo" src="' + image + '"/>';
            this.url = url;
        };

        var resultNetflix = new StreamResult('Netflix', 'images/streaming_services/logo_netflix.png');
        var resultHulu = new StreamResult('Hulu Plus', 'images/streaming_services/logo_hulu.png');
        var resultAmazon = new StreamResult('Amazon Prime', 'images/streaming_services/logo_amazon.png');
        var resultHBO = new StreamResult('HBO Go', 'images/streaming_services/logo_hbo.png');
        var resultStarz = new StreamResult('Starz Play', 'images/streaming_services/logo_starz.png');
        var resultShowtime = new StreamResult('Showtime', 'images/streaming_services/logo_showtime.png');

        var displaySource = function(source, url) {
            $(sourceDivId).append('<a target="_blank" title="Stream now!" href="' + url + '">' + source.image + '</a>');
        };

        var returnSources = function(res) {

            if(res.netflix === true){
                res.noStreams = false;
                displaySource(resultNetflix, res.netflixURL);
            };
            if(res.huluPlus === true){
                res.noStreams = false;
                displaySource(resultHulu, res.huluPlusURL);
            };
            if(res.amazonPrime === true){
                res.noStreams = false;
                displaySource(resultAmazon, res.amazonPrimeURL);
            };
            if(res.hboNow === true){
                res.noStreams = false;
                displaySource(resultHBO, res.hboNowURL);
            };
            if(res.starzPlay === true){
                res.noStreams = false;
                displaySource(resultStarz, res.starzPlayURL);
            };
            if(res.showtime === true){
                res.noStreams = false;
                displaySource(resultShowtime, res.showtimeURL);
            };
            if(res.noStreams === true){
                $(sourceDivId).html('Sorry! This title is not (legally) streaming anywhere right now...');
            };
        };
        returnSources(result[i]);
    });
    loadingResults = false;
    loadResults();
};

var getShowSources = function(resultID, i, result) {
    console.log(resultID);
    var resultAPI = baseAPI + region + key + 'show/' + resultID + '/available_content';
    var sourceDivId = '#resultSources' + i;
    var getSource = $.getJSON(resultAPI, function(dataAlt) {
        var sourcesSubWeb = dataAlt.results.web.episodes.all_sources;
        for(var j = 0; j < sourcesSubWeb.length; j++) {
            if(sourcesSubWeb.length === 0) {
                result[i].noStreams = true;
            } else {
                if(sourcesSubWeb[j].source === 'netflix') {
                    result[i].netflix = true;
                    result[i].netflixURL = 'https://www.netflix.com';
                };
                if(sourcesSubWeb[j].source === 'amazon_prime') {
                    result[i].amazonPrime = true;
                    result[i].amazonPrimeURL = 'https://www.amazon.com/Amazon-Video/b?ie=UTF8&node=2858778011';
                };
                if(sourcesSubWeb[j].source === 'hulu_plus') {
                    result[i].huluPlus = true;
                    result[i].huluPlusURL = 'http://www.hulu.com';
                };
                if(sourcesSubWeb[j].source === 'starz_amazon_prime') {
                    result[i].starzPlay = true;
                    result[i].starzPlayURL = 'https://www.starz.com';
                };
                if(sourcesSubWeb[j].source === 'hbo') {
                    result[i].hboNow = true;
                    result[i].hboNowURL = 'http://play.hbogo.com';
                };
                if(sourcesSubWeb[j].source === 'showtime_subscription') {
                    result[i].showtime = true;
                    result[i].showtimeURL = 'http://www.sho.com/';
                };
            };
        };

        function StreamResult(name, image, url) {
            this.name = name;
            this.image = '<img class="streamLogo" src="' + image + '"/>';
            this.url = url;
        };

        var resultNetflix = new StreamResult('Netflix', 'images/streaming_services/logo_netflix.png');
        var resultHulu = new StreamResult('Hulu Plus', 'images/streaming_services/logo_hulu.png');
        var resultAmazon = new StreamResult('Amazon Prime', 'images/streaming_services/logo_amazon.png');
        var resultHBO = new StreamResult('HBO Go', 'images/streaming_services/logo_hbo.png');
        var resultStarz = new StreamResult('Starz Play', 'images/streaming_services/logo_starz.png');
        var resultShowtime = new StreamResult('Showtime', 'images/streaming_services/logo_showtime.png');

        var displaySource = function(source, url) {
            $(sourceDivId).append(source.image);
            console.log(url);
        };

        var returnSourcesShows = function(res) {

            if(res.netflix === true){
                res.noStreams = false;
                displaySource(resultNetflix, res.netflixURL);
            };
            if(res.huluPlus === true){
                res.noStreams = false;
                displaySource(resultHulu, res.huluPlusURL);
            };
            if(res.amazonPrime === true){
                res.noStreams = false;
                displaySource(resultAmazon, res.amazonPrimeURL);
            };
            if(res.hboNow === true){
                res.noStreams = false;
                displaySource(resultHBO, res.hboNowURL);
            };
            if(res.starzPlay === true){
                res.noStreams = false;
                displaySource(resultStarz, res.starzPlayURL);
            };
            if(res.showtime === true){
                res.noStreams = false;
                displaySource(resultShowtime, res.showtimeURL);
            };
            if(res.noStreams === true){
                $(sourceDivId).prepend('Sorry! This series is not (legally) streaming anywhere right now...');
            };
        };
        returnSourcesShows(result[i]);
    });
    loadingResults = false;
    loadResults();
};

var loadResults = function() {
    if(loadingResults === true) {
        $('.active').attr('src', imgSourcePath + 'images/logo_load.gif')
    } else {
        if(movieSearch === true) {
            $('.active').attr('src', imgSourcePath +  'images/streamline_logo_blue.png');
        } else {
            $('.active').attr('src', imgSourcePath +  'images/streamline_logo_red.png');
        };
    };
};

//Replacement for load gif
// var loadResults = function() {
//     var loadImageCache = [
//         'streamline/images/streamline_logo_1.png',
//         'streamline/images/streamline_logo_2.png',
//         'streamline/images/streamline_logo_3.png',
//         'streamline/images/streamline_logo.png',
//     ];
//     for(var i = 0; i < loadImageCache.length; i++) {
//         // if(loadImageCache === Array) {
//             $('#streamlineLogo').attr('src', loadImageCache[i]);
//             setTimeout(function(){console.log(loadImageCache[i])}, 3000);
//         // } else {
//         //     $('#streamlineLogo').attr('src', loadImageCache[3]);
//         // };
//     };
// };
