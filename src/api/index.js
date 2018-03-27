import login from './login.js'

function merge (...sources) {
  return Object.assign({}, ...sources)
}
const api = merge(
  {login: login}
)
export default api
