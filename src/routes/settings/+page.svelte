<script>
    import PasswordChange from "../../lib/components/PasswordChange.svelte"

    let showPasswordChange = false
</script>

<button on:click={() => (showPasswordChange = !showPasswordChange)}
    >Change Password</button
>
{#if showPasswordChange}
    <PasswordChange />
{/if}
