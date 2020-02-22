let _users = {};
let _getUsers = null;

function setGetUsers(getUsers) {
  _getUsers = getUsers;
}

async function loadUsers() {
  const { members: users } = await _getUsers();
  _users = users.reduce((hash, user) => ({ ...hash, [user.id]: user }), {});
}

async function getUser(id) {
  if (!_users.hasOwnProperty(id)) {
    const user = await loadUsers();
  }
  if (!_users.hasOwnProperty(id)) {
    throw Error(`Could not find the user with Id : ${id}`);
  }

  return _users[id];
}

export { setGetUsers, loadUsers, getUser };
