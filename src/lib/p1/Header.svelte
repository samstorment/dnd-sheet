<script>
    import Header from "$lib/header/BaseHeader.svelte";
    import HeaderAttributes from "$lib/header/HeaderAttributes.svelte";
    import HeaderLeft from "$lib/header/HeaderLeft.svelte";
    import HeaderRight from "$lib/header/HeaderRight.svelte";

</script>

<Header>
    <HeaderLeft label="Character Name" />
    <HeaderRight>
        <HeaderAttributes fields={[
            "Class & Level", "Background", "Player Name",
            "Race", "Alignment", "Experience Points"
        ]}/>
    </HeaderRight>
</Header>