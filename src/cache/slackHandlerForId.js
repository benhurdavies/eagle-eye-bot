/**
 * @description: slack handler data fetch and cache for object contain Ids
 */
function slackHandlerForId() {
  let hash = {};
  let _getData = null;

  function setGetData(getData) {
    _getData = getData;
  }

  async function load() {
    const data = await _getData();
    hash = data.reduce((hash, item) => ({ ...hash, [item.id]: item }), {});
  }

  async function get(id) {
    if (!hash.hasOwnProperty(id)) {
      await load();
    }
    if (!hash.hasOwnProperty(id)) {
      // Could not find the user with Id
      hash[id] = null;
    }

    return hash[id];
  }

  return { setGetData, load, get };
}

export default slackHandlerForId;
