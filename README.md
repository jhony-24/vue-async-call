# Vue async call

![GitHub](https://img.shields.io/github/license/jhony-24/vue-async-call)
![GitHub package.json version](https://img.shields.io/github/package-json/v/jhony-24/vue-async-call)

## Installation
```
npm install vue-async-call
```
or using yarn
```
yarn add vue-async-call
```

## Usage

Here to resolve async promises we use 
the composable **useAsync**. This basically take 
four reactive values and a method 
exec to listen changes. It's all.😃

```javascript
import { useAsync } from "vue-async-call";

const { 
 data, 
 loading, 
 error, 
 idl,
 exec 
} = useAsync();


exec(() => api.fetchUsers());
// or
exec(api.fetchUsers());
```

In some cases is important initialize values, 
It is posible passing and object value.

```javascript
const { data } = useAsync({
  data: [],
});
```
His default value is undefined but now it's an array.
Is it possible to use multiple useAsync together?, 
we use the reactive from vue to have multiple async options.

````javascript
import { reactive } from "vue";
const users = reactive(useAsync());
const jobs = reactive(useAsync());

// using it
console.log(users.data);
console.log(jobs.data);
````

## Listening events
There are different methods to listening changes by composable.
```javascript
const { exec } = useAsync({
 onSuccess(data) {
  
 },
 onError(error){
 
 },
 onLoading() {
 
});
```

## Typescript
Define just an interface or type and you pass it 
as a generic type.

```typescript
interface User {
   name: string;
   age: number;
}
const { data } = useAsync<User[]>();
```

## Using components
```vue
<template>
  <div>
    <AsyncCall :promise="getUser" v-slot="{ data }">
       {{ data }}
    </AsyncCall>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { AsyncCall } from "vue-async-call";

export default defineComponent({
 components: {
  AsyncCall
 },
 setup() {
   const getUser = async () => {
    return {};
   }
   return {
     getUser
   }
 }
});
</script>
```

## API
#### useAsync

#### useAsyncProvider

#### useAsyncConsumer

#### AsyncCall (component)
