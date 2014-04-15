(function(storage, Ground, chrome) {
  var app = new Ground();
  app.use(new Ground.Router(app));

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('://vk.com/') > -1) {
      chrome.pageAction.show(tabId);
    }
  });

  app.method('getConfig', function(req, res) {
    var rules = [];
    var config = {};
    try {
      rules = JSON.parse(storage.rules || '[]') || [];
      config = JSON.parse(storage.config || '{}') || {};
    } catch (e) {}

    var opened = {};
    try {
      opened = JSON.parse(storage.opened || '{}') || {};
    } catch (e) {}

    res.send({
      rules: rules,
      opened: opened,
      config: config
    });
  });

  app.method('setOpened', function(req, res) {
    var opened = {};
    try {
      opened = JSON.parse(storage.opened || '{}') || {};
    } catch (e) {}

    opened[req.params.id] = opened[req.params.id] | req.params.state;
    storage.opened = JSON.stringify(opened);
  });

  app.listen();

})(window.localStorage, window.Ground, chrome);