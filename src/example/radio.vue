<template>
    <div>
        <x-radio label="intel" v-model="intel" @on-change="onChangeValue"></x-radio>

        <x-radio-group v-model="phone" @on-change="onChangeValue">
            <x-radio label="apple" name="gTest" disabled :value="1">
            </x-radio>

            <x-radio label="android" name="gTest" disabled :value="2">
            </x-radio>

            <x-radio label="windows" name="gTest" disabled :value="3">
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
            phone: 'windows',
            test: '001',
            intel: true
        };
    },
    methods: {
        onChangeValue(val){
            console.log( '----selectedValue---------', val);
        },
        handleInput(){
            console.log(this.$refs.testR.value);
        }
    }
}

</script>
