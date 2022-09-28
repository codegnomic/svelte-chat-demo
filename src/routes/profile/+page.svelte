<script>
    import { userState } from "$lib/stores/user"

    let profileImage = `http://127.0.0.1:8090/api/files/systemprofiles0/${$userState.user.user.profile.id}/${$userState.user.user.profile.avatar}`
    let profile

    $: profile = $userState.user.user.profile
</script>

<main class="h-screen bg-slate-900">
    <div class="">
        <img
            src={profileImage}
            alt="user avatar"
            class="h-40 border-2 border-black"
        />
        <h3 class="text-xl text-white pl-2 -mt-4">{profile.name}</h3>
    </div>
</main>
