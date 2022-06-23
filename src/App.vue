<template>
	<LScroll>
		<div style="height: 10000px">
			<LButton type="primary" size="xl">SUBMIT</LButton>
			<LButton type="default" size="lg">RESET</LButton>
			<LButton type="danger" size="base">DANGER</LButton>
			<LButton type="warning" size="sm">WARNING</LButton>
			<LButton type="success" size="xs">SUCCESS</LButton>
		</div>
		<LDialog v-model="isShow"></LDialog>
	</LScroll>
</template>

<script setup lang="ts">
import { LButton, LScroll, LDialog } from '../packages/components';
import { ref } from 'vue';

const input = ref('');

const isShow = ref<Boolean>(true);
</script>

<style></style>
