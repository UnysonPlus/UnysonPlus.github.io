---
title: "Built-in Option Types"
---


<iframe src="https://player.vimeo.com/video/105002864?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<br><br>

Here is a complete list of all built-in option types with all available parameters for each option.

Some option types have custom javascript events. The events are triggered on elements with `.fw-option-type-{type}` class. Some events send data that can be accessed this way:

```php
jQuery('.fw-option-type-demo#fw-option-demo')
    .on('fw:option-type:demo:custom-event', function(event, data){
        console.log(data);
    });
```
