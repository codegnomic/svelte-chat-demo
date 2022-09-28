import { browser } from "$app/environment";

export async function load() {
    if (browser) {
        return {
            a: 'client'
        }
    }

    return {
        a: 'server'
    }
}