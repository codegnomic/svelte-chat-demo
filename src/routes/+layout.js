import { browser } from "$app/environment"
import { userState } from "$lib/stores/user"
import { roomsState } from "$lib/stores/rooms"

export async function load() {
    if (browser) {
        let token = localStorage.getItem("pocketbase_auth")
        if (token) {
            console.log("refreshing token")
            await userState.refresh()
        }
        await roomsState.fetch()
    }
}
