<script>
    import { afterNavigate } from "$app/navigation"
    import { userState } from "$lib/stores/user"
    import { roomsState } from "$lib/stores/rooms"
    import Icon from "@iconify/svelte"

    let showUser = false
    let showRooms = false

    const handleMenu = (target) => {
        if (target == "user") {
            showRooms = false
            showUser = !showUser
        }
        if (target == "rooms") {
            showUser = false
            showRooms = !showRooms
        }
    }

    afterNavigate(() => {
        showRooms = false
        showUser = false
    })
</script>

<nav
    class="z-50 fixed left-0 top-0 h-8 w-screen flex justify-around items-center bg-orange-400"
>
    <a href="/" title="home"><Icon icon="bxs:home" /></a>
    <button on:click={() => handleMenu("user")} title="user"
        ><Icon icon="bxs:user" /></button
    >
    <button on:click={() => handleMenu("rooms")} title="chat rooms"
        ><Icon icon="bxs:chat" /></button
    >
</nav>

<div
    class={`z-10 absolute top-0 w-screen overflow-hidden bg-purple-500 transition-all ${
        showUser ? "h-screen" : "h-0"
    } flex flex-col items-center justify-center`}
>
    {#if $userState.user}
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
        <a href="/logout">Logout</a>
    {:else}
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    {/if}
</div>

<div
    class={`z-10 absolute top-0 w-screen overflow-hidden bg-blue-400 transition-all ${
        showRooms ? "h-screen" : "h-0"
    } flex flex-col items-center justify-center`}
>
    {#if $userState.user}
        <a href="/messages">Messages</a>
        <h3 class="text-lg underline">Rooms:</h3>
        {#each $roomsState.rooms as room}
            <a href={`/room/${room.title}`}>{room.title}</a>
        {/each}
    {:else}
        <p>
            You must either <a class="text-yellow-200" href="/login">login</a>
            or
            <a class="text-yellow-200" href="/register">register</a> to chat!
        </p>
    {/if}
</div>
