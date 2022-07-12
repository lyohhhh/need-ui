<template>
	<l-scroll>
		<div style="height: 10000px" class="p-4">
			<l-button type="primary" size="xl">SUBMIT</l-button>
			<l-button type="default" size="lg">RESET</l-button>
			<l-button type="danger" size="base">DANGER</l-button>
			<l-button type="warning" size="sm">WARNING</l-button>
			<l-button type="success" size="xs" @click="isDisabled = !isDisabled">SUCCESS</l-button>
			<l-link type="primary">主要链接</l-link>
			<l-link type="danger">危险链接</l-link>
			<l-link type="warning">警告链接</l-link>
			<l-link type="default">默认链接</l-link>
			<l-link type="success">成功链接</l-link>
			<l-link type="success" :disabled="isDisabled">成功链接</l-link>
			<l-link type="success" :underline="false" href="http://www.baidu.com">成功链接</l-link>

			<br />

			<div class="py-4">
				<l-radio-group v-model="radio" border disabled @change="radioChange">
					<l-radio label="1" border>选项1</l-radio>
					<l-radio label="2">选项2</l-radio>
					<l-radio label="3">选项3</l-radio>
					<l-radio label="4">选项4</l-radio>
				</l-radio-group>
				<!-- 
			<l-radio v-model="radio" label="1">选项1</l-radio>
			<l-radio v-model="radio" label="2">选项2</l-radio>
			<l-radio v-model="radio" label="3">选项3</l-radio>
			<l-radio v-model="radio" label="4">选项4</l-radio> -->
			</div>

			<div class="py-4">
				<l-checkbox v-model="checkbox" border disabled>复选1</l-checkbox>
				<l-checkbox v-model="checkbox" border>复选1 可选</l-checkbox>
				<l-checkbox v-model="checkbox1" border disabled>复选2</l-checkbox>
				<l-checkbox v-model="checkbox3" @change="changeCheckbox" border>复选3</l-checkbox>
			</div>
			<br />

			<l-checkbox
				v-model="allChecked"
				:indeterminate="indeterminate"
				border
				@change="handleCheckedAll"
				>全选</l-checkbox
			>
			<l-checkbox-group v-model="checkGroup" :min="1" :max="2" @change="groupChange">
				<l-checkbox
					v-for="(item, index) in groupList"
					:label="item"
					:key="index"
					@change="changeCheckbox"
					>{{ item }}</l-checkbox
				>
			</l-checkbox-group>
		</div>
		<l-dialog v-model="isShow">
			<l-input v-model="input"></l-input>
		</l-dialog>
	</l-scroll>
</template>

<script setup lang="ts">
import {
	LButton,
	LScroll,
	LDialog,
	LLink,
	LInput,
	LRadio,
	LRadioGroup,
	LCheckbox,
	LCheckboxGroup,
} from '../packages/components';
import { ref, watch } from 'vue';

const input = ref('');

const isShow = ref<boolean>(false);
const isDisabled = ref<boolean>(false);

const radio = ref<string>('2');

const radioChange = (val: string) => {
	console.log('change func ');

	console.log(val);
};

watch(radio, val => {
	console.log('watch func ');
	console.log(val);
});

const checkbox = ref<boolean>(false);
const checkbox1 = ref<boolean>(true);
const checkbox3 = ref<boolean>(false);

let checkGroup = ref<string[]>([]);
const groupList = ref(['选项组单选1', '选项组单选2', '选项组单选3', '选项组单选4']);
const indeterminate = ref<boolean>(false);
const allChecked = ref<boolean>(false);

const groupChange = (checkedList: string[]) => {
	console.log(' ----------------- 777 ');

	console.log(checkGroup.value);

	indeterminate.value =
		checkGroup.value.length < groupList.value.length && checkGroup.value.length > 0;
	allChecked.value = checkedList.length == groupList.value.length;
};
watch(checkGroup.value, val => {
	console.log(val);
});
const changeCheckbox = () => {};

const handleCheckedAll = (isCheckedAll: boolean) => {
	checkGroup.value = isCheckedAll ? [...groupList.value] : [];
	indeterminate.value = false;
};
</script>

<style></style>
