//固定値
var channel_token = "*******"
var url = "https://api.line.me/v2/bot/message/reply"

//LINEからのイベントがdoPostにとんでくる
function doPost(e) {
  //とんできた情報を扱いやすいように変換している
  var json = e.postData.contents;
  var events = JSON.parse(json).events;

  // ランダム
  var results = ["36.3度", "36.4度", "36.5度", "36.6度", "36.7度", "36.8度"];
  for (var i = 1; i <= 1; i++) {
    var taion = (results[Math.floor(Math.random() * 6)]);
  }

  //とんできたイベントの種類を確認する
  events.forEach(function (event) {

    //もしイベントの種類がトークによるテキストメッセージだったら
    if (event.type == "message") {
      if (event.message.type == "text") {

        //自動返信メッセージの内容
        var message = {
          "replyToken": event.replyToken,
          "messages": [{ "type": "text", "text": taion }]
        };
        //メッセージに添えなければならない情報
        var options = {
          "method": "post",
          "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + channel_token
          },
          "payload": JSON.stringify(message)
        };

        //自動返信メッセージを送信する
        UrlFetchApp.fetch(url, options);
      }
    }
  });
}
