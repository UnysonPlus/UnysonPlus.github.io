---
title: "Introduction"
sidebar_position: 1
---


The Unyson+ framework core has three components:

- [Theme](/components/theme)
- [Backend](/components/backend)
- [Extensions](/components/extensions)

Accessing one of the core's component is done in this way:

```php
fw()->{$component}->{$method}()
```

`fw()` returns the framework object, this being the only way to access the framework core.
