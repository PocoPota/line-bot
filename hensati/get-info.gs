function myFunction() {
  var message = '***' //調べたい高校名を入力

  //検索結果ページから個別URLを取得
  var searchUrl = "https://www.minkou.jp/hischool/search/k=" + message + "/";
  var searchHtml = UrlFetchApp.fetch(searchUrl).getContentText("UTF-8");

  var schoolUrlOri = Parser.data(searchHtml)
    .from('<a class="mod-listSearch-link" href="')
    .to('"></a>')
    .build();
  var schoolUrl = 'https://www.minkou.jp' + schoolUrlOri;


  //高校の情報を取得
  //スクレイピングしたいWebページのURLを変数で定義する
  var url = schoolUrl;
  //URLに対しフェッチを行ってHTMLデータを取得する
  var html = UrlFetchApp.fetch(url).getContentText("UTF-8");

  //Parserライブラリを使用して条件を満たしたHTML要素を抽出する
  var schoolName = Parser.data(html)
    .from('<title>')
    .to('の情報')
    .build();

  var hensati = Parser.data(html)
    .from('<p class="schMod-hensachi-num">')
    .to('</p>')
    .build();

  var gakkaOri = Parser.data(html)
    .from('<table class="table-binfo" border="1">')
    .to('</table>')
    .iterate();

  var gakkaCh = String(gakkaOri);

  var gakkaTd = Parser.data(gakkaCh)
    .from('<th colspan="2">学科')
    .to('</td>')
    .iterate();

  var gakkaTCh = String(gakkaTd);

  var gakka = gakkaTCh.slice(10);

  var allSchoolOri = Parser.data(html)
    .from('<div class="schMod-rank-rank">')
    .to('</div>')
    .iterate();

  var allSchoolCh = String(allSchoolOri);
  var allSchool = allSchoolCh.slice(19);
  var ranking = Parser.data(html)
    .from('<a href="/hischool/ranking/deviation/" class="js-ga-event-click" data-category="contrywide-deviation-ranking" data-label="deviation"><span>')
    .to('</span></a>')
    .build();


  //送信するメッセージを定義
  var sendMessage = schoolName + '\n===========' + '\n偏差値:' + hensati + '\n学科:' + gakka + '\n全国順位' + ranking + allSchool;

  console.log(sendMessage);
}
