<script lang="ts">
    import { fly, scale, slide } from "svelte/transition";
    import { scanner, type Token } from "./scanner";

    let q = $state('');
    let _scanner = $derived(scanner(q));
    let tokens = $derived(_scanner.scan());
    let expanded = $derived(_scanner.expand());

    let result = $derived.by(() => {
        const str = expanded
            .filter(t => t.type !== 'eof')
            .map(t => t.lexeme)
            .join(' ');

        try {
            return window.eval(str);
        } catch {
            return undefined;
        }
    });

    let examples = [
        'd20',
        '2d6',
        '8d8 + 7',
        '11d14 - 4d37 + (2 * 54)',      
        '(6d12 + 3d4 - 4d6 + 8) / 2',
        '101d20 + 100d20'
    ]

    let input: HTMLInputElement | undefined;

</script>


<div id="dice" class="p-4 grid gap-4 overflow-hidden max-w-screen-md mx-auto">
    <form 
        onsubmit={e => { 
            e.preventDefault();
            // some nonsense to make svelte rerun derived stores. maybe a built in way to do this idk?
            q += ' ';
            q = q.slice(0, q.length - 1);
        }}
        class="flex gap-4 max-sm:flex-col"
    >
        <input 
            type="text"
            autocomplete="off"
            bind:this={input} bind:value={q} id="q" 
            class="border-2 border-zinc-400 rounded-lg w-full text-4xl p-2 font-bold focus:border-blue-500 focus:ring-8 focus:outline-none"
        >
        <button type="submit" class="bg-yellow-500 text-yellow-950 border-2 border-yellow-900 px-6 py-4 rounded-md hover:scale-105 active:scale-100 transition-[scale] text-xl font-bold">
            Reroll
        </button>
    </form>

    {#if tokens.length > 1}
        <div 
            in:scale={{  duration: 200 }}
            class="flex flex-wrap bg-zinc-800 gap-2 p-4 rounded-md"
        >
            {#each tokens.filter(t => t.type !== 'eof') as t}
                <div data-token={t.type}>
                    <pre class="text hover:ring-4">{t.lexeme}</pre>
                    <pre class="json">{JSON.stringify(t, null, 2)}</pre>
                </div>
            {/each}
        </div>
    {/if}

    {#if expanded.length > 1}
        <div 
            in:scale={{  duration: 200 }}
            class="flex flex-wrap bg-zinc-800 gap-2 p-4 rounded-md"
        >
            {#each expanded.filter(t => t.type !== 'eof') as t}
                <div data-token={t.type}>
                    <pre class="text hover:ring-4">{t.lexeme}</pre>
                    <pre class="json">{JSON.stringify(t, null, 2)}</pre>
                </div>
            {/each}
        </div>

    {/if}


    {#if q.trim() === ''}
        <div 
            in:scale={{  duration: 200 }}
            class="rounded-md p-4 bg-zinc-800 text-zinc-100">
            <p class="mb-6">Try a dice roll!</p>

            <p class="mb-2">Examples:</p>
            <ul class="grid gap-1 bg-zinc-300 text-zinc-950 rounded-md shadow-inner shadow-zinc-600">
                {#each examples as ex}
                    <li class="flex items-center border-b border-zinc-400 p-2 last-of-type:border-none">
                        <span>{ex}</span>
                        <button
                            onclick={() => { 
                                q = ex;
                                input?.focus(); 
                            }}
                            class="ml-auto border border-zinc-800 py-1 px-2 text-sm bg-zinc-600 text-zinc-100 rounded-md shadow-md shadow-zinc-600"
                        >
                            Try It!
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

    {#if result && q.trim() !== ''}
        <div 
            in:scale={{  duration: 200 }}
            class="result flex flex-wrap gap-2 px-12 py-4 rounded-md text-zinc-800 font-bold text-6xl mx-auto border border-zinc-200 shadow-md overflow-hidden"
        >
            <span>{result?.toLocaleString('en-US') ?? '?'}</span>
        </div>
    {/if}
    
</div>



<style>

    .result span {
        word-wrap: break-word;
        overflow-wrap: break-word;
        overflow: hidden;
        max-width: 100%;
    }

    [data-token] {
        position: relative;
        display: inline;

    }

    .text {
        padding: 0 .3rem;
        font-size: 1.75rem;
        cursor: pointer;
        border-radius: .25rem;
        line-height: 1.25;
        font-family: monospace;
    }

    .json {
        position: absolute;
        display: none;
        box-shadow: 0 0 1rem 0 gray;
        padding: .5rem;
        border-radius: .25rem;
        background-color: white;
        left: 0;
        top: calc(100% + .5rem);
        z-index: 1;
    }

    .json::before {
        content: '';
        display: block;
        width: 100%;
        height: .5rem;
        /* background-color: red; */
        position: absolute;
        bottom: 100%;
        left: 0;
    }

    [data-token]:hover .json {
        /* display: block; */
    }

    [data-token='number'] .text {
        background-color: hsl(110, 80%, 85%);
        color: hsl(110, 100%, 15%);
    }

    [data-token='dice'] .text {
        background-color: hsl(0, 80%, 70%);
        color: hsl(0, 100%, 15%);
    }

    :is([data-token='*'], [data-token='/'], [data-token='+'], [data-token='-']) .text {
        color: hsl(236, 80%, 80%);
        font-weight: 900;
        padding: 0 .1rem;
    }

    :is([data-token='('], [data-token=')']) .text {
        color: hsl(46, 100%, 50%);
        font-weight: 900;
        padding: 0;
    }
</style>