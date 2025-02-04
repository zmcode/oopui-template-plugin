import LoadingComponent from 'oopui-plugin-components/Loading/index.vue'
import ErrorComponent from 'oopui-plugin-components/Error/index.vue'
import { defineAsyncComponent } from 'vue'
import type { AsyncComponentLoader, Component } from 'vue'

export function asyncLoadComponent(Promise: AsyncComponentLoader): Component {
  return defineAsyncComponent({
    loader: Promise,
    loadingComponent: LoadingComponent,
    delay: 200,
    errorComponent: ErrorComponent,
    timeout: 3000,
  })
}
