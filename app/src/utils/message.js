import M from 'materialize-css'

export default {
    install(Vue) {
        Vue.prototype.$info = function(html) {
            M.toast({ html, classes: 'toast-info' })
        }

        Vue.prototype.$error = function(html) {
            M.toast({ html: `[Error]: ${html}`, classes: 'toast-error' })
        }
    }
}

