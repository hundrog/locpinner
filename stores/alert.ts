  export const Alert = () => defineStore('alertStore', () => {
    const status = ref('')
    const message = ref('')

    function create(alertStatus:string = 'info', alertMessage:string) {
        status.value = alertStatus
        message.value = alertMessage
    }

    function clear() {
        status.value = ''
        message.value = ''
    }

    return { status, message, create, clear }
})
