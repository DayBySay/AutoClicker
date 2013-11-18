var casper = require('casper').create();

var captureUrl;
var viewport = {width : 1280, height : 1280}

//引数の取得
if (casper.cli.args.length < 1) {
      casper
              .echo("Usage: set args[0] capture url")
                  .exit(1)
                    ;
} else {
      captureUrl = casper.cli.args[0];
}
 
casper.start(captureUrl, function(casper) {
    this.then(function() {
    console.log(this);
        this.viewport(viewport.width, viewport.height);
    });
    this.thenOpen(captureUrl, function() {
        this.wait(3000);
    });
    this.capture(getTodayString() + ".png", {
        top: 0,
        left: 0,
        width: viewport.width,
        height: viewport.height
    });
});
casper.run();


function getTodayString()
{
    today = new Date();
    var dateString = ""+today.getFullYear() + (today.getMonth() + 1) + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds();
    return dateString;
}
