<script lang="ts">
    const { label }: Props = $props();

    interface Props {
        label: string; 
    }

    const name = label.toLowerCase();

    
</script>

<div class="flex flex-col border border-black flex-1 text-center rounded-b-3xl rounded-t-md">
    <label class="text-xs uppercase font-bold text-zinc-600" for={name}>{label}</label>
    <input type="number" id={name} class="flex-1 w-full px-2 text-center text-xl font-bold">
    <input type="number" id="{name}_mod" class="text-center w-3/5 h-8 self-center border border-zinc-800 rounded-full translate-y-2">
</div>