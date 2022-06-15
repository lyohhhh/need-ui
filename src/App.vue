<template>
	<l-input v-model="input"></l-input>
</template>

<script setup lang="ts">
import { LInput } from '../packages/input';
import { ref } from 'vue';

const input = ref('');
</script>

<style></style>
