<script lang="ts">
    import { domify } from "$lib";

    const label = "Allies and Organizations";
    const id = domify(label);
</script>

<div class="border border-zinc-800 rounded-md h-full p-1 gap-1 flex flex-col">
    
    <div class="flex gap-2 flex-1">
        <textarea class="resize-none flex-1 p-1" {id}></textarea>
        <div class="bg-zinc-200 flex-1 h-3/4 flex flex-col rounded-md">
            <div class="p-2 flex-1 flex flex-col gap-1">
                <div class="border border-zinc-800 p-1 rounded-md flex-1 flex flex-col gap-1">
                    <label for="allie_name" class="text-zinc-600 text-xs uppercase">Name</label>
                    <input type="text" id="allie_name" class="w-full p-1 text-xs mb-1 border border-zinc-400">
                    <textarea id="symbol" class="w-full resize-none flex-1"></textarea>
                </div>
                <label for="symbol" class="text-xs text-zinc-600 uppercase text-center">Symbol</label>
            </div>
        </div>
    </div>
    <label for={id} class="text-xs text-zinc-600 font-bold block text-center uppercase">{label}</label>
</div>