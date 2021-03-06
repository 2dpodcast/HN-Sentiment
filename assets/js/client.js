(function() {
  var handleSentiment, ws;

  ws = void 0;

  $(document).ready(function() {
    var host;
    host = location.origin.replace(/^http/, 'ws');
    ws = new WebSocket(host);
    $("#myForm").submit(function(e) {
      return e.preventDefault();
    });
    ws.onmessage = function(msg) {
      $(".spinner").removeClass("show");
      $(".spinner").addClass("hide");
      msg = JSON.parse(msg.data);
      return handleSentiment(msg);
    };
    return $('#submit').on("click", function() {
      var msg, style, text;
      style = "display:inline;";
      $(".spinner").removeClass("hide");
      $(".spinner").addClass("show");
      $('#sentiment').text("");
      $('#symbols').text("");
      text = $("#inText").val();
      msg = {
        type: "message",
        text: text
      };
      msg = JSON.stringify(msg);
      return ws.send(msg);
    });
  });

  handleSentiment = function(sentiment) {
    var i, n, _i, _results;
    console.log(sentiment.opinion);
    $('#sentiment').text("Sentiment: " + sentiment.opinion);
    $('#symbols').text("");
    n = (Math.abs(sentiment.opinion) - (Math.abs(sentiment.opinion) % 10)) / 10;
    n++;
    _results = [];
    for (i = _i = 0; _i < n; i = _i += 1) {
      if (sentiment.opinion > 0) {
        _results.push($('#symbols').append('<i class="fa fa-plus">&nbsp;</i>'));
      } else {
        _results.push($('#symbols').append('<i class="fa fa-minus">&nbsp;</i>'));
      }
    }
    return _results;
  };

}).call(this);
