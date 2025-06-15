declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // Use 'object' type. This is less specific than Record<string, unknown>
  // but still avoids the empty object type linting error.
  const component: DefineComponent<object, object>;
  export default component;
}
