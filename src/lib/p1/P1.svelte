<script>
    import ArmorClass from "./ACInitiativeSpeed.svelte";
    import Attacks from "./Attacks.svelte";
    import CurrentHitPoints from "./CurrentHitPoints.svelte";
    import DeathSaves from "./DeathSaves.svelte";
    import Equipment from "./Equipment.svelte";
    import HitDice from "./HitDice.svelte";
    import OrbLabel from "./OrbLabel.svelte";
    import SavingThrowskills from "./SavingThrowsSkills.svelte";
    import Stat from "./Stat.svelte";
    import TextArea from "./TextArea.svelte";
    import TempHitPoints from "./TempHitPoints.svelte";

    let savingThrows = [ 
        { name: 'Strength', paren: undefined },
        { name: 'Dexterity', paren: undefined },
        { name: 'Constitution', paren: undefined },
        { name: 'Intelligence', paren: undefined },
        { name: 'Wisdom', paren: undefined },
        { name: 'Charisma', paren: undefined }
    ];

    let skills = [
        { name: "Acrobatics", paren: "Dex" },
        { name: "Animal Handling", paren: "Wis" },
        { name: "Arcana", paren: "Int" },
        { name: "Athletics", paren: "Str" },
        { name: "Deception", paren: "Cha" },
        { name: "History", paren: "Int" },
        { name: "Insight", paren: "Wis" },
        { name: "Intimidation", paren: "Cha" },
        { name: "Investigation", paren: "Int" },
        { name: "Medicine", paren: "Wis" },
        { name: "Nature", paren: "Int" },
        { name: "Perception", paren: "Wis" },
        { name: "Performance", paren: "Cha" },
        { name: "Persuasion", paren: "Cha" },
        { name: "Religion", paren: "Int" },
        { name: "Sleight of Hand", paren: "Dex" },
        { name: "Stealth", paren: "Dex" },
        { name: "Survival", paren: "Wis" }
    ];
</script>

<article class="shadow-lg shadow-zinc-700 flex flex-col rounded-md print:rounded-none">
    <header class="flex gap-2 items-center mb-4 bg-zinc-100 rounded-md justify-evenly">
        <section class="flex flex-col min-w-[275px]">
            <textarea id="character_name" class="text-lg border border-zinc-600 py-1 px-2 text-center rounded-md resize-none"></textarea>
            <label class="text-zinc-600 uppercase text-xs font-bold" for="character_name">Character Name</label>
        </section>

        <section class="grid grid-cols-3 gap-2 p-2 border border-zinc-600 rounded-md">
            <div class="flex flex-col">
                <input type="text" id="class_level" class="p-1 text-xs">
                <label class="text-zinc-600 uppercase text-xs font-bold" for="class_level">Class & Level</label>
            </div>
            <div class="flex flex-col">
                <input type="text" id="background" class="p-1 text-xs">
                <label class="text-zinc-600 uppercase text-xs font-bold" for="background">Background</label>
            </div>
            <div class="flex flex-col">
                <input type="text" id="player_name" class="p-1 text-xs">
                <label class="text-zinc-600 uppercase text-xs font-bold" for="player_name">Player Name</label>
            </div>
            <div class="flex flex-col">
                <input type="text" id="race" class="p-1 text-xs">
                <label class="text-zinc-600 uppercase text-xs font-bold" for="race">Race</label>
            </div>
            <div class="flex flex-col">
                <input type="text" id="alignment" class="p-1 text-xs">
                <label class="text-zinc-600 uppercase text-xs font-bold" for="alignment">Alignment</label>
            </div>
            <div class="flex flex-col">
                <input type="text" id="experience_points" class="p-1 text-xs">
                <label class="text-zinc-600 uppercase text-xs font-bold" for="experience_points">Experience Points</label>
            </div>
        </section>
    </header>

    <div id="main-grid">
        <section class="stats flex flex-col gap-3 p-1">
            <Stat label="Strength" />
            <Stat label="Dexterity" />
            <Stat label="Constitution"/>
            <Stat label="Intelligence"/>
            <Stat label="Wisdom" />
            <Stat label="Charisma" />
        </section>
        <section class="skills flex flex-col gap-2 justify-center">
            <OrbLabel label="Inspiration" />
            <OrbLabel label="Proficieny Bonus" />

            <SavingThrowskills type="Saving Throws" bind:list={savingThrows} />
            <SavingThrowskills type="Skills" bind:list={skills} />

            <OrbLabel label="Passive Wisdom (Perception)" />
        </section>
        <section class="other">
            <TextArea name="Other Proficiencies & Languages" class="h-full rounded-md" />
        </section>
        <section class="status flex flex-col gap-2 justify-center">
            <div class="flex gap-2">
                <ArmorClass label="Armor Class" />
                <ArmorClass label="Initiative" />
                <ArmorClass label="Speed" /> 
            </div>
            <div class="flex flex-col gap-2">
                <CurrentHitPoints />
                <TempHitPoints />
            </div>
            <div class="flex gap-1">
                <HitDice />
                <DeathSaves />
            </div>
        </section>
        <section class="attacks">
            <Attacks />
        </section>
        <section class="equipment">
            <Equipment />
        </section>
        <section class="about flex flex-col gap-2">
            <TextArea name="Personality Traits" class="flex-1 rounded-t-md" />
            <TextArea name="Ideals" class="flex-1" />
            <TextArea name="Bonds" class="flex-1" />
            <TextArea name="Flaws" class="flex-1 rounded-b-md" />

        </section>
        <section class="features">
            <TextArea name="Features & Traits" class="rounded-md h-full" />
        </section>
    </div>
</article>



<style lang="postcss">
    #main-grid {
        display: grid;
        gap: .5rem;
        grid-template-columns: 1fr 2fr 2.9fr 2.9fr;
        grid-template-rows: 1.4fr 1.1fr 1fr;
        height: 100%;
        grid-template-areas: 
            "stats skills status  about"
            "stats skills attacks features"
            "other other equipment features";
    }


    .stats { grid-area: stats; }
    .skills { grid-area: skills; }
    .status { grid-area: status; }
    .about { grid-area: about; }
    .attacks { grid-area: attacks; }
    .features { grid-area: features; }
    .other { grid-area: other; }
    .equipment { grid-area: equipment; }
    
    #main-grid > * {
        @apply bg-zinc-100 rounded-md;
    }

    input {
        @apply border-b border-zinc-800;
    }
</style>