![scpp](/logo.png)

###### Forget about bloated libraries, promises, function generators and embrace callbacks.

# Why scpp?
* Small (1 file, 20 lines of code, no dependency's)
* Fast (Faster then async.js)
* Tested in production

## Install or copy/paste code

```JavaScript
npm install --save scpp

const {sync, parallel} = require('scpp')

or 

import {sync, parallel} from 'scpp'
``` 

#### sync minification
```javaScript 
const sync = (l,c) => (function $(l,c,i,r){l[i]((e,d)=>l[++i]&&!e?$(l,c,i,d):c(e,d),r)})(l,c,0)
```

#### parallel minification
```javaScript 
const parallel = (l,c) => {let t=l.length,x=1;l.forEach((v,k)=>v((e,d)=>{l[k]=d;return(--t!==0&&x===1&&!e)===true||--x||c(e,l)}))}
```

# How to use sync
Sync accepts 2 arguments
* array, with functions to execute synchronously
```JavaScript 
[Function, Function, Function]
```
* callback function, which is executed after all functions in array have finished executing, or any of functions returns error
```JavaScript 
(error, result) => {
	if (error) {
		return new Error(error)
	}
	console.log(result)
}
```

#### Sync example
```JavaScript
sync([
	// Function always shod return callback
	// return callback(ERROR, VALUE passing down)
	// if ERROR is not null, synchronously execution will stop and error value is returned.
	callback => {
		console.log('First!')
		return callback(null, 'Secound!')
	},
	// Only one value can be passed down (Which can contain multiple values inside, doh)
	(callback, previously) => {
		console.log(previously) // Secound!
		return callback(null, 'Third!')
	}
], (err, result) => {
	// err = null, result = 'Third!'
	if (err) {return new Error(err)}
	console.log(result)
})
```

# How to use parallel
Parallel accepts 2 arguments
* array, with functions to execute in parallel
```JavaScript 
[Function, Function, Function]
```
* callback function, which is executed after all functions in array have finished executing, or any of functions returns error
```JavaScript 
(error, result) => {
	if (error) {
		return new Error(error)
	}
	console.log(result)
}
```

#### Parallel example
```JavaScript
parallel([
	// Function always shod return callback
	// return callback(ERROR)
	// if ERROR is not null, parallel execution will stop and error value is returned.
	callback => {
		return callback(null, 'First!')
	},
	// No value can be passed down in parallel execution
	callback => {
		return callback(null, 'Second!')
	},
	callback => {
		return callback(null, 'Third!')
	}
// err = null, result = ['First!', 'Second!', 'Third!']
// result is array, contains all values from parallel execution, in proper order.
], (err, [first, second, third]) => {
	if (err) {return new Error(err)}
	console.log(first) // First!
	console.log(second) // Second!
	console.log(third) // Third!
})

```