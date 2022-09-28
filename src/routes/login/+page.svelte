<script>
  import { userState } from "$lib/stores/user"
  import { goto } from "$app/navigation"

  let email
  let password

  const handleSubmit = () => {
    userState.login(email, password)
  }

  $: if ($userState.user) goto("/")
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="email">Email:</label>
    <input type="email" bind:value={email} />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" bind:value={password} />
  </div>
  <button type="submit">Login</button>
</form>
