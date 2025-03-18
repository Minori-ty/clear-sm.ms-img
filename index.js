const Authorization = process.env.Authorization

async function deleteImages(hash) {
    const res = await fetch(`https://sm.ms/api/v2/delete/${hash}`, {
        headers: { Authorization },
    })
    await res.json()
}

/**
 *
 * @returns {Promise<{hash:string}[]>}
 */
async function getAllImages() {
    const res = await fetch('https://sm.ms/api/v2/upload_history', {
        headers: { Authorization },
    })
    const json = await res.json()

    return json.data
}

async function init() {
    try {
        const images = await getAllImages()
        const deletionPromises = images.map((item) => deleteImages(item.hash))
        await Promise.all(deletionPromises)
        console.log('所有图片删除成功')
    } catch (error) {
        console.error('删除图片时出现错误:', error)
    }
}

init()
