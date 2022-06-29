<template>
	<l-scroll>
		<div style="height: 10000px">
			<l-button type="primary" size="xl">SUBMIT</l-button>
			<l-button type="default" size="lg">RESET</l-button>
			<l-button type="danger" size="base">DANGER</l-button>
			<l-button type="warning" size="sm">WARNING</l-button>
			<l-button type="success" size="xs">SUCCESS</l-button>
			<l-link type="primary">主要链接</l-link>
			<l-link type="danger">危险链接</l-link>
			<l-link type="warning">警告链接</l-link>
			<l-link type="default">默认链接</l-link>
			<l-link type="success">成功链接</l-link>
			<l-link type="success" disabled>成功链接</l-link>
			<l-link type="success" :underline="false" href="http://www.baidu.com">成功链接</l-link>
		</div>
		<l-dialog v-model="isShow">
			<l-input v-model="input"></l-input>
		</l-dialog>
	</l-scroll>
</template>

<script setup lang="ts">
import { LButton, LScroll, LDialog, LLink, LInput } from '../packages/components';
import { ref } from 'vue';

const input = ref('');

const isShow = ref<Boolean>(false);
</script>

<style></style>
