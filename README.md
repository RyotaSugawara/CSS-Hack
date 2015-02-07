CSS Hacker
----

# USAGE
```
// 1. Create Instance
var Css = new CssHack();
// if you need '!important' to all in style try this
// var Css = new CssHack(true);

// 2. Set Properties
Css.setProp(param);
Css.setProps([param, param, ...]);

// 3. Reflect to Css
Css.reflect();

// 4. Reset Changes
Css.resetAll();
```

`param` is css extended object

```
param = {
  name      : '', // CSS Property Name 
  value     : '', // CSS Property Value
  pseudoType: ''  // CSS pseudoType (ex: 'after', 'before', 'hover', 'active')
};
```
