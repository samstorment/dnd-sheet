<script lang="ts">
    import Left from "./HeaderLeft.svelte";
    import Attributes from "./HeaderAttributes.svelte";
    import HeaderRight from "./HeaderRight.svelte";
    import type { Snippet } from "svelte";

    const { children }: { children: Snippet } = $props();
</script>

<header class="flex gap-2 items-center mb-4 bg-zinc-100 rounded-md justify-evenly">
    {@render children()}
</header>