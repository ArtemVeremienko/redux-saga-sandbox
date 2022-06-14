const TOKEN_KEY = 'token'

const delay = (ms = 2000) => new Promise(res => setTimeout(res, ms))

export const authorize = async (user: string, password: string) => {
    return btoa(JSON.stringify({ user, password }))
}

export const storeItem = (token: string) => {
    window.localStorage.setItem(TOKEN_KEY, token)
}

export const clearItem = () => {
    window.localStorage.removeItem(TOKEN_KEY)
}