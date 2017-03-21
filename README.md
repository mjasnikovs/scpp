![scpp](/logo.png)

###### Forget about bloated libraries, promises, function generators and embrace callbacks.

## Why scpp?
* Small (1 file, 20 lines of code, no dependency's)
* Fast (Faster then async.js)
* Tested in production

## Install or copy/paste code

```JavaScript
npm install --save scpp
``` 

### sync minification
```javaScript 
const sync = (l,c) => (function $(l,c,i,r){l[i]((e,d)=>l[++i]&&!e?$(l,c,i,d):c(e,d),r)})(l,c,0)
```

### parallel minification
```javaScript 
const parallel = (l,c) => {let t=l.length,x=1;l.forEach((v,k)=>v((e,d)=>{l[k]=d;return(--t!==0&&x===1&&!e)===true||--x||c(e,l)}))}
```
