<script lang="ts">
    import type { Snippet } from "svelte";

    const { children }: { children: Snippet }= $props();
</script>

<section class="p-2 border border-zinc-600 rounded-md">
    {@render children()}
</section>