import { browser } from "$app/environment"
import { client } from "$lib/db/client"

export async function load({ params }) {
    if (browser) {
        let rooms = await client.records.getFullList("rooms")
        let [currentRoom] = rooms.filter((room) => room.title == params.id)
        let posts = await client.records.getList("posts", 1, 100, {
            filter: `room = "${currentRoom.id}"`,
            expand: "user",
        })

        return {
            posts,
            currentRoom,
        }
    }
}
