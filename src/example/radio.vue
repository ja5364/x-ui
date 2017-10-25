<template>
    <div>


        <x-radio label="intel" v-model="intel"></x-radio>

        <x-radio-group v-model="phone" @on-change="onChangeValue">
            <x-radio label="apple" name="gTest" :value="1">
            </x-radio>

            <x-radio label="android" name="gTest" :value="2">
            </x-radio>

            <x-radio label="windows" name="gTest" :value="3">
            </x-radio>
        </x-radio-group>
    </div>
</template>
<script>
import xRadio from '@/components/radio/radio';
import xRadioGroup from '@/components/radio/radio-group';
export default {
    name: 'example-radio',
    components: {
        xRadio,
        xRadioGroup
    },
    data() {
        return {
            phone: 'apple',
            intel: true
        };
    },
    methods: {
        onChangeValue(){
            console.log(this.phone, '---------');
            console.log('onChangeValue');
        },
        handleInput(){
            console.log(this.$refs.testR.value);
        }
    }
}

</script>
