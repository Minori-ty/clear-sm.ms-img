const Authorization = process.env.Authorization
console.log(process.env.TEST)

async function deleteImages(hash) {
    const res = await fetch(`https://sm.ms/api/v2/delete/${hash}`, {
        headers: { Authorization },
    })
    await res.json()
}

async function getAllImages() {
    const res = await fetch('https://sm.ms/api/v2/upload_history', {
        headers: { Authorization },
    })
    const json = await res.json()
    console.log(json)

    return json.data
}

async function init() {
    const images = await getAllImages()
    images.forEach((item) => {
        deleteImages(item.hash)
    })
}

init()
