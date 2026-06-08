---
title: "FW_Cache"
sidebar_position: 1
---


Use cache to store frequently accessed data. Cache is just a big array and has one useful feature: it will automatically unset array keys if the php memory is close to full. So it is safe to store in it as much data as you want (of course the maximum allowed by php, by default is ~100Mb).

```php
function get_foo_bar() {
    $cache_key = 'foo/bar';

    try {
        /**
         * This will throw an exception if the key was not found
         */
        return FW_Cache::get($cache_key);
    } catch (FW_Cache_Not_Found_Exception $e) {
        $data = _generate_foo_bar_data();

        FW_Cache::set($cache_key, $data);

        return $data;
    }
}
```

<div class="attention">

<div class="title">

Attention

</div>

Don't do this:

```php
...
} catch (FW_Cache_Not_Found_Exception $e) {
FW_Cache::set($cache_key, _generate_foo_bar_data());

return FW_Cache::get($cache_key);
}
```

because `FW_Cache::set(...)` can fail or the data that was set can be removed after automatically memory free.

</div>
