(function() {
  var escapable, filterUnicode, ws;

  ws = void 0;

  escapable = /[\x00-\x1f\ud800-\udfff\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;

  filterUnicode = function(quoted) {
    escapable.lastIndex = 0;
    if (!escapable.test(quoted)) {
      return quoted;
    }
    return quoted.replace(escapable, function(a) {
      return "";
    });
  };

  $(document).ready(function() {
    var host;
    host = location.origin.replace(/^http/, 'ws');
    ws = new WebSocket(host);
    $("#myForm").submit(function(e) {
      return e.preventDefault();
    });
    return $('#submit').on("click", function() {
      var msg, text;
      text = $("#inText").val();
      text = text.replace(/\s/g, '');
      text = decodeURIComponent(text);
      msg = {
        type: "message",
        text: text
      };
      msg = JSON.stringify(msg);
      return ws.send(msg);
    });
  });

}).call(this);