<script lang="ts">
    const { name, class: className = "" }: { name: string, class?: string } = $props();

    const id = name.replaceAll(' ', '_').toLowerCase();
</script>

<div class="flex flex-col border border-zinc-800 p-1 {className}">
    <textarea id={id} class="w-full mb-1 resize-none p-1 flex-1 text-xs"></textarea>
    <label for={id} class="block text-center text-xs uppercase font-bold text-zinc-600">{name}</label>
</div>