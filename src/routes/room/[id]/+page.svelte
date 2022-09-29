<script>
    import { userState } from "$lib/stores/user"
    import { roomsState } from "$lib/stores/rooms"
    import { client } from "$lib/db/client"
    import { goto } from "$app/navigation"
    import { onMount, afterUpdate } from "svelte"

    export let data
    let input
    let chatWindow

    onMount(() => {
        if (!$userState.user) {
            goto("/")
        }
        subscribe()
    })

    afterUpdate(() => {
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight
        }
    })

    const subscribe = () => {
        client.realtime.subscribe("posts", function (e) {
            fetchPosts()
        })
    }

    const fetchPosts = async () => {
        data.posts = await client.records.getList("posts", 1, 100, {
            filter: `room = "${data.currentRoom.id}"`,
            expand: "user",
        })
    }

    const handleInput = async () => {
        if (input.trim() == "") return
        await client.records.create("posts", {
            body: input,
            user: $userState.user.user.profile.id,
            room: data.currentRoom.id,
        })
        input = ""
    }
</script>

<div class={`h-screen w-full pt-8 bg-purple-900 text-white flex flex-col`}>
    {#if $roomsState.rooms && data.posts}
        <div bind:this={chatWindow} class={`p-2 overflow-y-scroll flex-grow`}>
            {#each data.posts.items as post}
                <div class="flex flex-nowrap">
                    <img
                        src={`http://127.0.0.1:8090/api/files/systemprofiles0/${post["@expand"].user.id}/${post["@expand"].user.avatar}`}
                        class="w-3 h-3 inline-block"
                        alt=""
                    />
                    <span class="text-orange-200 pr-1"
                        >{post["@expand"].user.name}:
                    </span>
                    <p class="inline-block">{post.body}</p>
                </div>
            {/each}
        </div>
        <div class="p-2">
            <form on:submit|preventDefault={handleInput}>
                <input bind:value={input} class="text-black" type="text" />
                <button>Submit</button>
            </form>
        </div>
    {/if}
</div>
