<script lang="ts">
    import { fly, scale, slide } from "svelte/transition";
    import { scanner, type Token } from "./scanner";
    import { rand } from "$lib";
    import { Smile, Frown } from "lucide-svelte";

    let q = $state('');
    let _scanner = $derived(scanner(q));
    let tokens = $derived(_scanner.scan());
    let expanded: Token[] = $state([]);

    let show = $state(false);

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

    let smile = $derived(result && !show);
    let frown = $derived(!result && !show && q.trim() !== '');

    let examples = [
        'd20',
        '2d6',
        '8d8 + 7',
        '11d14 - 4d37 + (2 * 54)',      
        '(6d12 + 3d4 - 4d6 + 8) / 2',
        '101d20 + 100d20'
    ]

    let input: HTMLInputElement | undefined;

    function expand() {
        const result: Token[] = [];

        function isValidPreDiceToken(token?: Token) {
            if (token?.type !== 'number') return false;
            const num = token.literal as number;
            if (num <= 0) return false;
            return Number.isInteger(num);
        }

        for (let i = 0; i < tokens.length; i++) {
            const t = tokens[i];

            const next = i === tokens.length - 1 ? undefined : tokens[i + 1];

            if (isValidPreDiceToken(t) && next?.type === 'dice') {
                continue;
            }

            if (t.type !== 'dice') {
                result.push(t);
                continue;
            }

            let numRolls = 1;

            const prev = i === 0 ? undefined : tokens[i - 1];

            if (isValidPreDiceToken(prev)) {
                numRolls = prev?.literal as number;
            }

            result.push({ start: 0, end: 0, lexeme: '(', literal: undefined, type: "(" });

            const rolls = Array
                .from({ length: numRolls }, () => rand(1, t.literal as number));
                
            if (numRolls < 101) {
                rolls.forEach((r, j) => {
                    result.push({ start: 0, end: 0, lexeme: r.toString(), literal: r, type: "number" });
                    if (j < numRolls - 1) {
                        result.push({ start: 0, end: 0, lexeme: '+', literal: undefined, type: "+" });
                    }
                });
            } else {
                const sumOfRolls = rolls.reduce((a, b) => a + b); 
                result.push({ start: 0, end: 0, lexeme: sumOfRolls.toString(), literal: sumOfRolls, type: "number" });
            }

            result.push({ start: 0, end: 0, lexeme: ')', literal: undefined, type: ")" });
        }

        return result;
    }

</script>


<div id="dice" class="p-4 flex flex-col gap-4 max-w-screen-lg mx-auto">
    <form 
        onsubmit={e => { 
            e.preventDefault();
            if (frown) { return };
            show = true;
            expanded = expand();
        }}
        class="flex gap-4 max-sm:flex-col"
    >
        <input 
            type="text"
            autocomplete="off"
            oninput={(e) => {
                show = false;
                expanded = expand();
            }}
            bind:this={input} bind:value={q} id="q" 
            class="border-2 border-zinc-400 rounded-lg w-full text-4xl p-2 font-bold focus:border-blue-500 focus:ring-8 focus:outline-none"
        >
        <button type="submit" class="bg-yellow-500 text-yellow-950 border-2 border-yellow-900 px-6 py-4 rounded-md hover:scale-105 active:scale-100 transition-[scale] text-xl font-bold">
            {!show ? "Roll" : "Reroll"}
        </button>
    </form>

    {#if tokens.length > 1 && !show}
        <div 
            in:scale={{  duration: 200 }}
            class="flex flex-wrap bg-zinc-800 gap-2 p-4 rounded-md max-w-full"
        >
            {#each tokens.filter(t => t.type !== 'eof') as t}
                <div data-token={t.type}>
                    <pre class="text hover:ring-4">{t.lexeme}</pre>
                    <pre class="json">{JSON.stringify(t, null, 2)}</pre>
                </div>
            {/each}
        </div>
    {/if}

    {#if expanded.length > 1 && show}
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

    {#if smile}
        <div 
            in:scale={{  duration: 200 }}
            class="result flex items-center gap-4 px-12 py-4 rounded-md text-zinc-800 font-bold text-2xl mx-auto border border-zinc-200 shadow-md max-w-full max-sm:flex-col max-sm:w-full"
        >
            <span>Ready to Roll</span>
            <Smile class="w-12 h-12 text-green-600"/>
        </div>
    {/if}

    {#if frown}
        <div 
            in:scale={{  duration: 200 }}
            class="result flex items-center gap-4 px-12 py-4 rounded-md text-zinc-800 font-bold text-2xl mx-auto border border-zinc-200 shadow-md max-w-full max-sm:flex-col max-sm:w-full"
        >
            <span>Invalid Syntax</span>
            <Frown class="w-12 h-12 text-red-600"/>
        </div>
    {/if}

    {#if q.trim() === ''}
        <div 
            in:fly={{  duration: 200, y: 250 }}
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
                                show = false;
                                expanded = expand();
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

    {#if result && show}
        <div 
            in:scale={{  duration: 200 }}
            class="result flex flex-wrap gap-2 px-12 py-4 rounded-md text-zinc-800 font-bold text-6xl mx-auto border border-zinc-200 shadow-md max-w-full"
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