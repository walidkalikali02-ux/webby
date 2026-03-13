const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2126467",
  key: "6d572461c87f27069708",
  secret: "3c6f7544b10e98609777",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});