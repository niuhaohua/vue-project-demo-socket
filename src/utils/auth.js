// import Cookies from 'js-cookie'
// import V from '../main'
import VueCookies from 'vue-cookies'
const TokenKey = 'Admin-Token'

export function getToken() {
  return VueCookies.get(TokenKey)
}

export function setToken(token) {
  return VueCookies.set(TokenKey,token,60*60*24)
}

export function removeToken() {
  return VueCookies.remove(TokenKey)
}
