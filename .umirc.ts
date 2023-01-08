import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/frame',
      routes: [
        {
          path: '/javascript/basic-knowledge',
          component: '@/pages/function',
        },
      ],
    },
  ],
  fastRefresh: {},
});
