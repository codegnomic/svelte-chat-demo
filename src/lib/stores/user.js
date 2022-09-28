import { writable } from "svelte/store"
import {client} from "$lib/db/client"
import { roomsState } from "./rooms"

function createUserStore() {
  const { subscribe, set, update } = writable({
    user: null,
    alert: null,
  })

  return {
    subscribe,
    register: async (email, password, passwordConfirm) => {},
    login: async (email, password) => {
      try {
        let user = await client.users.authViaEmail(email, password)
        userState.init(user)
        roomsState.fetch()
      } catch (error) {
        console.log(error)
      }
    },
    logout: async () => {
      await client.authStore.clear()
      userState.init()
    },
    refresh: async () => {
      try {
        console.log('refreshing token')
        let user = await client.users.refresh()
        userState.init(user)
      } catch (error) {
        console.log(error)
      }
    },
    init: (user = null) => {
        set({user, alert: null})
    },
  }
}

export const userState = createUserStore()
