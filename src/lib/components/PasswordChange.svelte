<script>
    import { userState } from "$lib/stores/user"
    import { client } from "$lib/db/client"

    let password
    let passwordConfirm

    const handlePasswordChange = async () => {
        try {
            await client.users.update() // will not work, needs to be admin on server side
        } catch (error) {}
    }

    const resetPassword = async () => {
        try {
            await client.users.requestPasswordReset($userState.user.user.email)
        } catch (error) {
            console.log(error)
        }
    }
</script>

<form on:submit={handlePasswordChange}>
    <input
        bind:value={password}
        type="password"
        class="border-2 border-black"
    />
    <input
        bind:value={passwordConfirm}
        type="password"
        class="border-2 border-black"
    />
    <button>Change Password</button>
</form>

<button on:click={resetPassword}>Reset password</button>
