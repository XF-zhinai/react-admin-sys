import store from 'store'
const USER_KEY = 'user_key'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveUser(data) {
        store.set(USER_KEY, data)
    },
    getUser() {
        return store.get(USER_KEY) || {}
    },
    delUser() {
        store.remove(USER_KEY)
    }
}