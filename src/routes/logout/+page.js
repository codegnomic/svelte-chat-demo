import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { userState } from '$lib/stores/user'

export async function load(){
    if (browser){
        userState.logout()
        goto('/')
    }
}