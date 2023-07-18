//GET
function basiqueGet(route) {
    return fetch('http://localhost:3001/API/' + route, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) return res.json()
        else throw new Error('Invalid response')
    })
}

export function getAwards() {
    return basiqueGet('awards')
}

export function getKeywords() {
    return basiqueGet('keywords')
}

export function getTypes() {
    return basiqueGet('types')
}

export function getUsers() {
    return basiqueGet('users')
}

//POST
function basiquePost(route, data) {
    return fetch('http://localhost:3001/API/' + route, {
        method: 'POST',
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
