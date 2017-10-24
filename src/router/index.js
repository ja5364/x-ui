import Vue from 'vue';
import Router from 'vue-router';
import ExampleInput from '@/example/input';
import ExampleRadio from '@/example/radio';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'example-input',
            component: ExampleInput
        },
        {
            path: '/radio',
            name: 'example-radio',
            component: ExampleRadio
        },
    ]
});
