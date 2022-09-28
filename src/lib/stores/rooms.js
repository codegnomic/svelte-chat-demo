import { client } from "$lib/db/client"
import { writable } from "svelte/store"

function createRoomsStore() {
    const { subscribe, set, update } = writable({
        rooms: null,
        alert: null,
    })

    return {
        subscribe,
        fetch: async () => {
            let rooms = await client.records.getFullList("rooms")
            roomsState.init(rooms)
            return rooms
        },
        init: (rooms = null) => {
            set({ rooms, alert: null })
        },
    }
}

export const roomsState = createRoomsStore()
