// LINEの認証を突破するために必要なお作法
// botのChannel基本設定の画面で発行した鬼のように長い文字列を""の中にセット
var secret_token = "***********"
var secret = "Bearer " + secret_token;

function doPost(e) {
  // LINEから送信されたデータを取得（テキストメッセージそのものではない。）
  var json = e.postData.getDataAsString();

  // LINEから送信されてきたデータから、リプライトークン（返信するために必要）を取得
  var token = JSON.parse(json).events[0].replyToken;

  // 送信されてきたテキストを取り出し
  var message = JSON.parse(json).events[0].message.text;

  // リプライを返すAPIのURI
  var url = "https://api.line.me/v2/bot/message/reply";

  var sendMessage = message;

  // お作法①　HTTPヘッダーの設定
  var headers = {
    "Content-Type": "application/json",
    "Authorization": secret
  };

  // お作法②　下記の構造でリクエストボディにデータを持つ
  var data = {
    "replyToken": token,
    "messages": [{
      "type": "text",
      "text": sendMessage
    }]
  };

  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(data)
  };

  // 返信！
  return UrlFetchApp.fetch(url, options);
}
