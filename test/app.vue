<template>
    <div class="app">
        <comp name="testInput" v-on:enter="val => enter(val)" :controller="inputController"></comp>
    </div>
</template>

<script>
import comp from "../src/CustomInput.vue"
import controller from "../src/CustomInputGroupController.js"

export default {
    data() {
        return {
            inputController: new controller()
        }
    },
    methods: {
        enter (val) {
            console.log(val)
        }
    },
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