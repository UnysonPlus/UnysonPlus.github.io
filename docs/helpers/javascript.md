---
title: "JavaScript Helpers"
sidebar_position: 3
---


Useful javascript functions and classes. The main helper is `fw`, an object containing constants, methods and classes. To use these helpers, add `fw` to your script dependencies:

```php
wp_register_script(..., ..., array('fw'));
```

:::tip[💡 Web dev tip: enhance with JS, don't depend on it]
**Progressive enhancement** means the core content and links work as plain HTML, and JavaScript layers extra behaviour on top. That keeps a page usable if a script fails or is slow, and keeps content visible to search engines. Avoid render-blocking scripts, and never hide essential content behind JS that might not run. [MDN: progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) · [Web Dev Basics: Clean Code](/learn/clean-code)
:::

## General

General javaScript helpers:

- `fw.FW_URI` - URI to the framework directory.

- `fw.SITE_URI` - URI to the site root directory.

- `fw.intval(value)` - alternative to php [intval()](http://php.net/manual/en/function.intval.php). Returns `0` on failure, instead of `NaN` like [parseInt()](http://www.w3schools.com/jsref/jsref_parseint.asp) does.

- `fw.md5(string)` - calculate [md5](https://www.google.md/#q=what+is+md5) hash of the string.

- `fw.loading` - show loading on the page.

  > > [!TIP]
  > > Useful when doing AJAX requests and want to inform your users about that.
  >
  > ``` javascript
  > fw.loading.show();
  >
  > setTimeout(function(){
  >     fw.loading.hide();
  > }, 3000);
  > ```
  >
  > The `show()` and `hide()` methods can be called multiple times. If `show()` is called 10 times, then `hide()` should be called 10 times for loading to disappear. This is done for cases when this helper is used by multiple asynchronous scripts, the loading should not disappear until all scripts complete the work.

- `fw.capitalizeFirstLetter(text)` - capitalizes the first letter of a string.

- `fw.ops(properties, value, obj, delimiter)` - same as `fw_aks(...)` from [PHP Helpers](/helpers/php), but for javascript objects.

  > ``` javascript
  > var obj = {foo: {}};
  >
  > fw.ops('foo/bar', 'demo', obj);
  >
  > console.log(obj); // {foo: {bar: 'demo'}}
  > ```

- `fw.opg(properties, obj, defaultValue, delimiter)` - same as `fw_akg(...)` from [PHP Helpers](/helpers/php), but for javascript objects.

  > ``` javascript
  > var obj = {foo: {bar: 'hello'}};
  >
  > console.log( fw.opg('foo/bar', obj) ); // 'hello'
  > ```

- `fw.randomMD5()` - generate random [md5](https://www.google.md/#q=what+is+md5).

## Options Modal

Modal with [options](/options/introduction). Display html generated from a given options array. After the user completes the form and presses "Save", values are available as a javascript object.

```javascript
var modal = new fw.OptionsModal({
    title: 'Custom Title',
    options: [
        {'test_1': {
            'type': 'text',
            'label': 'Test1'
        }},
        {'test_2': {
            'type': 'textarea',
            'label': 'Test2'
        }}
    ],
    values: {
        'test_1': 'Default 1',
        'test_2': 'Default 2'
    },
    size: 'small' // 'medium', 'large'
});

// listen for values change
modal.on('change:values', function(modal, values) {
    console.log(values);
});

// replace values
modal.set('values', {
    'test_1': 'Custom 1',
    'test_2': 'Custom 2'
});

modal.open();
```

:::note
Make sure to enqueue scripts and styles for the options you use in modal. Usually it is done before page is displayed.

```php
fw()->backend->enqueue_options_static($modal_options);
```
:::

## Confirmation

A styled replacement for the browser's blocking `confirm()`, used to guard destructive
actions. There are two entry points: **`fw.confirm()`** for almost everything, and
`fw.soleConfirm` underneath it when you need queueing or a promise.

### `fw.confirm()` — the one to reach for

```javascript
fw.confirm( 'Delete this shortcode for good? This removes its files from the server.', function () {
    // runs only if the user accepts
} );
```

Because the styled dialog is asynchronous, the guarded action goes **inside the callback** —
there is no return value to branch on, unlike native `confirm()`.

Third argument is optional:

```javascript
fw.confirm( message, onConfirm, {
    severity:    'warning', // 'warning' (default, red icon) | 'info' (green icon)
    okHTML:      'Delete',  // button labels, HTML allowed
    cancelHTML:  'Keep it',
    customClass: 'my-dialog',
    onCancel:    function () { /* runs if the user declines */ }
} );
```

If the styled modal is somehow unavailable, `fw.confirm()` falls back to the native
`window.confirm()` rather than doing nothing. That is deliberate: a guard on a destructive
action must never silently no-op and let the action through unconfirmed.

:::caution[Declare `fw` in **both** your script and style dependencies]
The dialog renders WordPress's own `.media-modal` markup and takes its appearance from the
`fw` **style** handle. Declaring only the script is the trap: `fw.confirm()` runs fine, but
with no `fw.css` the dialog renders as unstyled text in normal document flow at the bottom
of the page instead of a modal — so the action can't be confirmed.

```php
wp_enqueue_style(  'my-admin-page', $css_uri, array( 'fw' ), $ver );
wp_enqueue_script( 'my-admin-page', $js_uri,  array( 'jquery', 'fw' ), $ver, true );
```

`fw.css` pulls in core's `media-views` stylesheet itself, so you do **not** need to call
`wp_enqueue_media()` just to get a working confirm. (You still do for `fw.OptionsModal`,
which needs the media *JavaScript* — see the note in the Options Modal section above.)
:::

The dialog sizes itself to its message — never add height for longer text. It measures its
own content, with a floor of 200px so short messages keep familiar proportions and a ceiling
of 85% of the viewport, beyond which the message scrolls inside the dialog. A one-line
confirm and a six-line confirm both come out correct with no work from the caller, at any
font size, zoom level or translated string length.

### `fw.soleConfirm` — queueing and promises

The lower-level mechanism `fw.confirm()` is built on. Reach for it directly when you need a
`jQuery.Deferred`, or several confirms queued one behind another.

```javascript
var confirm = fw.soleConfirm.create({
  severity: 'info', // warning | info
  message: 'Some message to display', // or null, if you don't want any
  backdrop: null // null | false | true
});

confirm.result; // Instance of jQuery.Deferred factory

confirm.result.then(function (confirm_instance) {
  // confirm_instance is same as confirm

  // Handle success branch
});

confirm.result.fail(function (confirm_instance) {
  // Handle fail branch
});

confirm.show();
```

#### Queueing confirms

Confirm is actually using `fw.soleModal` under the hood, which is queued one after the other.

```javascript
var confirm1 = fw.soleConfirm.create();
var confirm2 = fw.soleConfirm.create();

confirm1.show();
confirm2.show();

confirm1.hide(); // That's when the confirm2 will actually pop in, results are buffered
```

#### Same confirm multiple times

Because of the way `jQuery.Deferred` works, one single confirm instance will resolve it's promise exactly one time. If you really need to use the same confirm once again - just reset it.

```javascript
var confirm = fw.soleConfirm.create();

confirm.result.then(function () {
  // handle success
  // will be triggered just once
});

confirm.show();

// ...
// after the user takes his choice
// ...

confirm.show(); // will throw an error!
confirm.reset();

// you'll have to attach your listeners once again, the old one
// will already not be around
confirm.result.then(function () {
  // one more handler
});

confirm.show(); // will work just fine
```

## Events

`fwEvents` is a global object on which you can trigger or listen custom events. This way different scripts can communicate with each other.

```javascript
// script-1.js

fwEvents.on('script-2:message', function(data){
    console.log('script-1 received a message from script-2: '+ data.message);
});

// script-2.js

fwEvents.trigger('script-2:message', {message: 'Hello World!'});
```

## Reactive Options and Fetch Html helper

This section is a draft for an upcoming documentation for reactive option types.

For now, it documents only fw.options.fetchHtml() helper.

```javascript
fw.options.fetchHtml(
    // An array of options
    {
        a: {
            type: 'text',
            label: 'My Option'
        },

        b: {
            type: 'password'
        }
    }, 


    // The array of default values
    {
        a: 'Hello'
    }
).then(function (html) {
    console.log(html);
});
```

- `fw.options.fetchHtml(options, values)` - fetch the HTML representation for every option, returns a Promise
- `fw.options.fetchHtml.getCacheEntryFor(options, values)` - get current cached HTML string or false
- `fw.options.fetchHtml.emptyCache()` - empty cache and force each option type to be re-downloaded
