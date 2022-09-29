import { browser } from "$app/environment"
import { client } from "$lib/db/client"

export async function load() {
    if (browser) {
        let token = JSON.parse(localStorage.getItem("pocketbase_auth"))
        let user = token.model.profile
        if (user) {
        }
    }
}
