// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var adapter = new LocalStorageAdapter();
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());

    adapter.initialize().done(function () {
        renderHomeView();
        console.log("Data adapter initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        if (navigator.notification) {
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // tittle
                    'OK'        // buttonName
                    );
            }
        }
        FastClick.attach(document.body);
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        adapter.findByName($('.search-key').val()).done(function (employees) {
            $('.employee-list').html(employeeLiTpl(employees));
        });
    }

    function renderHomeView() {
        $('body').html(homeTpl);
        $('.search-key').on('keyup', findByName);
    }

}());