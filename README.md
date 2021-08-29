# Vue async call


### Basic usage

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
Him default value is undefined but now it's an array.


### API
#### useAsync

#### useAsyncProvider

#### useAsyncConsumer

#### AsyncCall (component)
