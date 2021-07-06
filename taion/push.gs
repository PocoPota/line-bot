// LINEアクセストークン
var token = "************"

// ここから自動送信

function myFunction() {

  // ランダム
  var results = ["36.3度", "36.4度", "36.5度", "36.6度", "36.7度", "36.8度"];
  for (var i = 1; i <= 1; i++) {
    var taion = (results[Math.floor(Math.random() * 6)]);
  }

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/broadcast', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    payload: JSON.stringify({
      messages: [
        {
          type: 'text',
          text: '今日のランダム体温は',
        },
        {
          type: 'text',
          text: taion
        }
      ]
    }),
  });
}

// ここから返信BOT

function doPost(e) {
  // ランダム
  var results = ["36.3度", "36.4度", "36.5度", "36.6度", "36.7度", "36.8度"];
  for (var i = 1; i <= 1; i++) {
    var taion = (results[Math.floor(Math.random() * 6)]);
  }

  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  var url = 'https://api.line.me/v2/bot/message/reply';
  var channelToken = '*******';
  //チャンネルトークンを記入
  var receive_message = JSON.parse(e.postData.contents).events[0].message.text;
  var reply_text = receive_message;

  if (reply_text === '体温') {
    var messages = [{
      'type': 'text',
      'text': taion,
    }];
  }



  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages,
    }),
  });

  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}
