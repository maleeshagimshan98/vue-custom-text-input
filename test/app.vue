<template>
    <div class="app">
        <comp name="testInput" :controller="inputController"></comp>
    </div>
</template>

<script>
import comp from "../src/CustomInput.vue"
import controller from "./CustomInputGroupController.js"

export default {
    data() {
        return {
            inputController: new controller()
        }
    },
    methods: {},
    components: {
        comp
    }
}
</script>
>

<style>
.app {
    margin: 10%;
    padding: 10%
}
</style>