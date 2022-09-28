<script>
    import { roomsState } from "$lib/stores/rooms"
    let show = true
</script>

<div
    class={`absolute top-0 h-screen overflow-hidden transition-all ${
        show ? "w-screen" : "w-0"
    } bg-orange-700`}
>
    <div class={``}>
        <ul class="">
            {#each $roomsState.rooms as room}
                <li>
                    <a href={`/room/${room.title}`}>{room.title}</a>
                </li>
            {/each}
        </ul>
    </div>
    <div class={``}>
        <button class="" on:click={() => (show = !show)}>
            {#if show}
                &#60;&#60;
            {:else}
                &gt;&gt;
            {/if}
        </button>
    </div>
</div>
