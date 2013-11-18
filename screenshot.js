var casper = require("casper").create();
 
var screenshotUrl = '',
    screenshotNow = new Date(),
    viewport = {
                    'name': 'desktop-standard',
                    width: 1280, 
                    height: 1024
                };
 
//引数の確認
if (casper.cli.args.length < 1) {
  casper
    .echo("Usage: $ casperjs screenshots.js http://example.com")
    .exit(1)
  ;
} else {
  screenshotUrl = casper.cli.args[0];
}
 
casper.start(screenshotUrl, function() {
  this.echo('Current location is ' + this.getCurrentUrl(), 'info');
  casper.viewport(viewport.width, viewport.height);
});
 
//ページが開いた後の処理
casper.thenOpen(screenshotUrl, function() {
  this.fill('form[action="/search"]', {q: 'casperjs'}, true);
});

//次の処理
casper.then(function(){
  this.echo('Screenshot for ' + viewport.name + ' (' + viewport.width + 'x' + viewport.height + ')', 'info');
  this.capture(viewport.name + '-' + viewport.width + 'x' + viewport.height + '.png', {
      top: 0,
      left: 0,
      width: viewport.width,
      height: viewport.height
  });
});
 
//実行
casper.run();
