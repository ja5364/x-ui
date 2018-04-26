import Vue from 'vue';
import Router from 'vue-router';
import ExampleInput from '@/example/input';
import ExampleRadio from '@/example/radio';
import ExampleSwitch from '@/example/switch';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/input',
            name: 'example-input',
            component: ExampleInput
        },
        {
            path: '/radio',
            name: 'example-radio',
            component: ExampleRadio
        },
        {
            path: '/switch',
            name: 'example-switch',
            component: ExampleSwitch
        },
    ]
});
