const URL = 'https://sxktggv4ek.execute-api.eu-west-2.amazonaws.com'

//GET
function basiqueGetAll(route) {
    return fetch(URL + '/API/' + route, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => {
        if (res.status === 200) return res.json()
        else throw new Error('Invalid response')
    })
}

function basiqueGet(route, id) {
    return fetch(URL + '/API/' + route + '?id=' + id, {
        method: 'GET',
        credentials: 'include'
    }).then((res) => {
        if (res.status === 200) return res.json()
        else throw new Error('Invalid response')
    })
}

export function getAwards() {
    return basiqueGetAll('awards')
}

export function getKeywords() {
    return basiqueGetAll('keywords')
}

export function getTypes() {
    return basiqueGetAll('types')
}

export function getUsers() {
    return basiqueGetAll('users')
}

export function getUser(id) {
    return basiqueGet('users/details', id)
}

export function getGames() {
    return basiqueGetAll('games')
}

export function getGame(id) {
    return basiqueGet('games/details', id)
}

export function getRentals(id) {
    return basiqueGet('rentals/user', id)
}

export function getReservationsForGame(id) {
    return basiqueGet('rentals/game', id)
}

//POST
function basiquePost(route, data) {
    return fetch(URL + '/API/' + route, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        if (res.status === 200) return res.json()
        else throw new Error('Invalid response')
    })
}

export function postNewGame(data) {
    return basiquePost('games', data)
}

export function postNewUser(data) {
    return basiquePost('users', data)
}

export function postNewRental(games, user) {
    const data = {
        games: games,
        user: user
    }
    return basiquePost('rentals', data)
}

export function getAccessToken(data) {
    return basiquePost('users/login', data)
}

//PUT
function basiquePut(route, data) {
    return fetch(URL + '/API/' + route, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        if (res.status === 200) return res.json()
        else throw new Error('Invalid response')
    })
}

export function updateGame(data) {
    return basiquePut('games', data)
}

export function updateUser(data) {
    return basiquePut('users', data)
}

export function updateRental(data) {
    return basiquePut('rentals', data)
}
