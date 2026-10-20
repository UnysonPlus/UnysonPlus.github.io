---
title: "Free WordPress Form Builder"
sidebar_label: "Forms"
description: "Free WordPress drag-and-drop form builder: conditional logic, stored entries, file uploads, ratings, spam protection, email notifications and nine starter forms, with no coding and no paid tiers."
---

# Forms

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Build premium forms in minutes.</p>
  <p class="ext-hero__sub">A free WordPress <strong>drag-and-drop form builder</strong> with conditional logic, stored entries, file uploads, ratings, spam protection and email notifications. No coding and no paid tiers. Multi-step forms, payments and quizzes are on the <a href="/extensions/forms/roadmap">roadmap</a>.</p>
</div>

This extension adds the possibility to create a forms (for e.g. a contact form). Use the drag & drop form builder to create any form you'll ever want or need.

## Field types

Besides text, email, number, website, dropdown, single and multiple choice, date and time, rating,
file upload, hidden values and consent boxes:

- **Name**: one "Full name" box, or first and last name side by side.
- **Phone**: brings up the number keypad on phones and accepts the usual international formats.
- **Address**: street, an optional second line, city, an optional region, postcode and country; the
  country can be filled in for the visitor.
- **Section**: a heading and a short explanation between fields.
- **Page Break**: splits a long form into steps, with a progress bar and Back / Next. Each step is checked
  before moving on, and a problem found when the form is sent opens the step it is on.
- **Range Slider**: pick a number by dragging, with its value shown (for example "$450").
- **Picture Choices**: options shown as image cards, one or several.
- **Ranking**: put options in order with Move up / Move down.
- **Survey Grid**: several statements answered on one scale, such as "Strongly disagree" to "Strongly agree".
- **Repeating Group**: a few fields the visitor can fill in again with "Add another guest", between a
  minimum and a maximum you set. Saved as "1) Name: Ana, Age: 30; 2) Name: Leo, Age: 4".
- **Payment Method**: lets the payer choose between card, PayPal and paying later.
- **Product**: something with a price, either one item ("Registration, $50") or a choice of options with
  their own prices ("Half day $90 / Full day $160"). It can be always included, added with a tick, or
  bought in a typed quantity.
- **Amount**: the visitor chooses how much: suggested amounts as buttons, their own amount, or both, with
  a minimum and a maximum. For donations, deposits and "pay what you like".
- **Calculated**: a figure worked out from other answers, such as a total or a price per person, updated as
  the visitor types (see below).
- **Turnstile, hCaptcha, reCAPTCHA**: human checks.

Every answer, however many boxes it uses, is stored and emailed as one readable line.

### Pre-filled and personal forms

- **Pre-fill:** a field fills itself in from the logged-in visitor's account (and their CRM contact, when the
  CRM is active), or from the page address: `?name_1=Rosa` fills the field whose name is `name_1`. A link in a
  newsletter can open a form already holding the reader's details. Developers can add their own values
  with the `fw_ext_forms_prefill_values` filter.
- **Answer piping:** write a field's name in curly brackets in a label, a section or a help line, and the
  visitor's answer appears there as they type: "Who is coming with you, {name_1}?" reads "Who is coming
  with you, Rosa?".
- **One question at a time:** the Contact Form's **Style → Layout** can show each field on its own screen,
  with a progress bar, Back / Next, and Enter to move on. Good for short surveys and sign-ups on phones.
- **Floating labels:** the **Floating Labels** [Form Style](/theme/components/form-styles) puts the label inside
  the field and lifts it out of the way when the visitor starts typing.

## Prices, totals and payments

- **Calculated fields** use a formula over other answers: a field's name in curly brackets, numbers,
  `+ - * /`, brackets, and `round`, `ceil`, `floor`, `min`, `max`. For example
  `{product_tour} + {product_pickup} + {amount_tip}` or `{calc_total} / max({number_people}, 1)`. A Product
  counts as its line total, an Amount as the amount, and a choice as the last number in its text
  ("Airport pickup (+40)" counts 40). Shown as money or as a number. A hidden one can be a step in a bigger
  sum.
- **The server works every figure out again** from the form itself when it is sent; a price or total the
  browser shows is never trusted.
- **Take payment** (Contact Form → Settings → Actions) charges the total of the form's Products, Amounts
  and any Calculated field marked "add it to the total to pay". Each payment is kept with its entry under
  Form Entries, with a reference such as `F-7K3QD`, its method and its status.
- **Ways to pay:**
  - **Card** through Stripe and **PayPal**: after sending the form, the payer pays on Stripe's or PayPal's
    own secure page (no card details touch your site) and comes back to your page, where a note confirms
    the payment. If they stop halfway, the note says nothing was charged and offers a link to try again.
    Each payment updates by itself when the service confirms it, fails or is refunded, and you can refund
    from the entry.
  - **Pay later**: a bank transfer, pay on arrival or an invoice. The visitor sees your instructions; you
    mark the payment paid (or cancelled, or refunded) on the entry.
- **Let the payer choose** with a **Payment Method** field (Card, PayPal, Pay later). Only the ways that are
  set up are shown.
- **Keys** go in Forms Settings → Payments: Stripe's secret key and webhook signing secret, PayPal's Client
  ID, Secret and Webhook ID (the page shows the webhook address to paste into each service). If Membership
  already has keys, forms use those when these are empty.
- **Answer tags** for the success message and emails: `{order_total}`, `{order_summary}`, `{payment_ref}`,
  `{payment_method}`, `{payment_instructions}`, and `{payment_link}` (a link to pay by card later, handy in
  a Pay later email).
- The **currency** is set once for every form in Forms Settings → Payments.
- The form-type picker has an **Order form** and a **Donation** form to start from.

## The form library

Build a form once and show it anywhere. **Unyson+ → Forms** lists your saved forms with how many fields
each has, how many entries it has received and which pages show it.

- **Add New** opens the form-type picker, then the same builder and settings as a Contact Form element.
- **Show it on a page:** add a Contact Form element and choose the form under **Form Fields → Saved Form**,
  or pick it from **Your saved forms** in the picker. The element keeps its own style, so the same form can
  look different on different pages. Edit the saved form once and every page showing it changes.
- **Save an existing form:** in a Contact Form element, **Save to the library** turns its fields into a
  saved form and links the element to it.
- **Entries** of a saved form are grouped under that form, whichever page they came from.
- **Duplicate, Export and Import** (as a `.json` file) from the list, to copy a form or move it to another
  site.
- **History:** every save is kept as a revision, so an earlier version can be compared and restored.

## Sending, confirmations and spam protection

- **No page reload.** A form sends in the background and shows its result where the form is. Without
  JavaScript it still works the ordinary way.
- **Errors everyone can find.** Each problem is written next to its field and announced by screen readers;
  a form with several problems shows a summary at the top, with links to each field.
- **After sending** (Contact Form → Settings → Options): keep the form and show the message, replace the
  form with the message, go to a thank-you page, or go to any address.
- **Answer tags** put the visitor's answers into the email subject, the success message and the thank-you
  address: `{text_name}` (a field's name in the builder), `{all_fields}`, `{site_name}`, `{page_title}`,
  `{page_url}`, `{date}`. For example: *New enquiry from {text_name}*.
- **Notifications:** one or more recipients, plus CC and BCC. With no recipient set, the site's admin
  email gets it.
  **Send the notification email** can be switched off for a form that only needs its stored entries, or
  whose action already tells you (a booking action that sends its own alert, for example).
- **Email the sender** (Settings → Actions): a confirmation email to the person who sent the form. It
  greets them by name; a copy of their answers is a separate switch, best used with a human check on the
  form, since a form emails whatever address is typed into it.
- **Autofill:** name, email, phone, company and address fields tell the browser what they hold, so it can
  fill them in.
- **Human checks:** Cloudflare Turnstile (free, usually invisible) and hCaptcha fields, beside reCAPTCHA.
  Add the keys once under Unyson+ → Forms → Settings. A check without keys stays hidden and never blocks a
  visitor.
- **Spam filtering** (Forms → Settings): Akismet (when its plugin is set up), blocked words, blocked email
  domains and a link limit. A caught message still sees the normal thank-you, so bots learn nothing; nothing
  is emailed and it waits under **Form Entries → Spam**, where *Not spam* restores it.

## Customize Views

- **Form Fields** - Frontend form fields views can be customized in `framework-customizations/extensions/forms/form-builder/items/{item-type}/views/view.php`. All built-in form builder item types can be found in `framework/extensions/forms/includes/option-types/form-builder/items/` directory.

  For e.g. to overwrite the view for item type `text` (which is located in `framework/extensions/forms/includes/option-types/form-builder/items/text`) create `framework-customizations/extensions/forms/form-builder/items/text/views/view.php`.

- **Form Fields Container** - The view for the container that wraps the form fields can be customized in `framework-customizations/extensions/forms/form-builder/views/items.php`.

### Contact Form Views

- **Form Content** - The inner contents of the `<form>` can be customized in `framework-customizations/extensions/forms/extensions/contact-forms/views/form.php`.
- **Email Content** - The contents of the email that is sent after an user submitted the contact form can be customized in `framework-customizations/extensions/forms/extensions/contact-forms/views/email.php`.

## Create Form Builder Item Type

First, make sure you understand [how the base builder works](/extensions/builder).

The Forms extension have a built-in `form-builder` option type (that can be found in the `framework-customizations/extensions/forms/form-builder/` directory) which is used by the Contact Forms sub-extension. To create an item type for `form-builder` you have to look in its method called `item_type_is_valid()` to see what class you must extend in order to be accepted by the builder.

```php
class FW_Option_Type_Form_Builder
{
    ...

    /**
     * @param FW_Option_Type_Builder_Item $item_type_instance
     * @return bool
     */
    protected function item_type_is_valid($item_type_instance)
    {
        return is_subclass_of($item_type_instance, 'FW_Option_Type_Form_Builder_Item');
    }
}
```

So you have to extend the `FW_Option_Type_Form_Builder_Item` class and register it as a builder item type.

Below is explained how to create a simple `Yes/No` question radio input.

Create the `framework-customizations/extensions/forms/includes/builder-items/yes-no` directory.

Create `framework-customizations/extensions/forms/includes/builder-items/yes-no/class-fw-option-type-form-builder-item-yes-no.php` with the following contents:

```php
class FW_Option_Type_Form_Builder_Item_Yes_No extends FW_Option_Type_Form_Builder_Item
{
    /**
     * The item type
     * @return string
     */
    public function get_type()
    {
        return 'yes-no';
    }

    /**
     * The boxes that appear on top of the builder and can be dragged down or clicked to create items
     * @return array
     */
    public function get_thumbnails()
    {
        return array(
            array(
                'html' =>
                    '<div class="item-type-icon-title">'.
                    '    <div class="item-type-icon"><span class="dashicons dashicons-editor-help"></span></div>'.
                    '    <div class="item-type-title">'. __('Yes/No Question', 'unyson') .'</div>'.
                    '</div>',
            )
        );
    }

    /**
     * Enqueue item type scripts and styles (in backend)
     */
    public function enqueue_static()
    {
        $uri = fw_get_template_customizations_directory_uri('/extensions/forms/includes/builder-items/yes-no/static');

        wp_enqueue_style(
            'fw-form-builder-item-type-yes-no',
            $uri .'/backend.css',
            array(),
            fw()->theme->manifest->get_version()
        );

        wp_enqueue_script(
            'fw-form-builder-item-type-yes-no',
            $uri .'/backend.js',
            array('fw-events'),
            fw()->theme->manifest->get_version(),
            true
        );

        wp_localize_script(
            'fw-form-builder-item-type-yes-no',
            'fw_form_builder_item_type_yes_no',
            array(
                'l10n' => array(
                    'item_title'        => __('Yes/No', 'unyson'),
                    'label'             => __('Label', 'unyson'),
                    'toggle_required'   => __('Toggle mandatory field', 'unyson'),
                    'edit'              => __('Edit', 'unyson'),
                    'delete'            => __('Delete', 'unyson'),
                    'edit_label'        => __('Edit Label', 'unyson'),
                    'yes'               => __('Yes', 'unyson'),
                    'no'                => __('No', 'unyson'),
                ),
                'options'  => $this->get_options(),
                'defaults' => array(
                    'type'    => $this->get_type(),
                    'options' => fw_get_options_values_from_input($this->get_options(), array())
                )
            )
        );

        fw()->backend->enqueue_options_static($this->get_options());
    }

    /**
     * Render item html for frontend form
     *
     * @param array $item Attributes from Backbone JSON
     * @param null|string|array $input_value Value submitted by the user
     * @return string HTML
     */
    public function frontend_render(array $item, $input_value)
    {
        return '<pre>'. print_r($item, true) .'</pre>';
    }

    /**
     * Validate item on frontend form submit
     *
     * @param array $item Attributes from Backbone JSON
     * @param null|string|array $input_value Value submitted by the user
     * @return null|string Error message
     */
    public function frontend_validate(array $item, $input_value)
    {
        return 'Test error message';
    }

    private function get_options()
    {
        return array(
            array(
                'g1' => array(
                    'type' => 'group',
                    'options' => array(
                        array(
                            'label' => array(
                                'type'  => 'text',
                                'label' => __('Label', 'unyson'),
                                'desc'  => __('The label of the field that will be displayed to the users', 'unyson'),
                                'value' => __('Yes/No', 'unyson'),
                            )
                        ),
                        array(
                            'required' => array(
                                'type'  => 'switch',
                                'label' => __('Mandatory Field?', 'unyson'),
                                'desc'  => __('If this field is mandatory for the user', 'unyson'),
                                'value' => true,
                            )
                        ),
                    )
                )
            ),
            array(
                'g2' => array(
                    'type' => 'group',
                    'options' => array(
                        array(
                            'default_value' => array(
                                'type'  => 'radio',
                                'label' => __('Default Value', 'unyson'),
                                'choices' => array(
                                    '' => __('None', 'unyson'),
                                    'yes' => __('Yes', 'unyson'),
                                    'no' => __('No', 'unyson'),
                                ),
                            )
                        )
                    )
                )
            ),
        );
    }
}
FW_Option_Type_Builder::register_item_type('FW_Option_Type_Form_Builder_Item_Yes_No');
```

Create `framework-customizations/extensions/forms/includes/builder-items/yes-no/static/backend.js`:

```js
fwEvents.one('fw-builder:'+ 'form-builder' +':register-items', function(builder){
    var currentItemType = 'yes-no';
    var localized = window['fw_form_builder_item_type_yes_no'];

    var ItemView = builder.classes.ItemView.extend({
        template: _.template(
            '<div class="fw-form-builder-item-style-default fw-form-builder-item-type-'+ currentItemType +'">'+
                '<div class="fw-form-item-controls fw-row">'+
                    '<div class="fw-form-item-controls-left fw-col-xs-8">'+
                        '<div class="fw-form-item-width"></div>'+
                    '</div>'+
                    '<div class="fw-form-item-controls-right fw-col-xs-4 fw-text-right">'+
                        '<div class="fw-form-item-control-buttons">'+
                            '<a class="fw-form-item-control-required dashicons<% if (required) { %> required<% } %>" data-hover-tip="<%- toggle_required %>" href="#" onclick="return false;" >*</a>'+
                            '<a class="fw-form-item-control-edit dashicons dashicons-edit" data-hover-tip="<%- edit %>" href="#" onclick="return false;" ></a>'+
                            '<a class="fw-form-item-control-remove dashicons dashicons-no-alt" data-hover-tip="<%- remove %>" href="#" onclick="return false;" ></a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="fw-form-item-preview">'+
                    '<div class="fw-form-item-preview-label">'+
                        '<div class="fw-form-item-preview-label-wrapper"><label data-hover-tip="<%- edit_label %>"><%- label %></label> <span <% if (required) { %>class="required"<% } %>>*</span></div>'+
                        '<div class="fw-form-item-preview-label-edit"><!-- --></div>'+
                    '</div>'+
                    '<div class="fw-form-item-preview-input">'+
                        '<label><input type="radio" disabled <% if (default_value === \'yes\') { %>checked<% } %>> <%- yes %></label><br/>'+
                        '<label><input type="radio" disabled <% if (default_value === \'no\') { %>checked<% } %>> <%- no %></label>'+
                    '</div>'+
                '</div>'+
            '</div>'
        ),
        events: {
            'click': 'onWrapperClick',
            'click .fw-form-item-control-edit': 'openEdit',
            'click .fw-form-item-control-remove': 'removeItem',
            'click .fw-form-item-control-required': 'toggleRequired',
            'click .fw-form-item-preview .fw-form-item-preview-label label': 'openLabelEditor',
            'change .fw-form-item-preview-input input': 'updateDefaultValueFromPreviewInput'
        },
        initialize: function() {
            this.defaultInitialize();

            // prepare edit options modal
            {
                this.modal = new fw.OptionsModal({
                    title: localized.l10n.item_title,
                    options: this.model.modalOptions,
                    values: this.model.get('options'),
                    size: 'small'
                });

                this.listenTo(this.modal, 'change:values', function(modal, values) {
                    this.model.set('options', values);
                });

                this.model.on('change:options', function() {
                    this.modal.set(
                        'values',
                        this.model.get('options')
                    );
                }, this);
            }

            this.widthChangerView = new FwBuilderComponents.ItemView.WidthChanger({
                model: this.model,
                view: this
            });

            this.labelInlineEditor = new FwBuilderComponents.ItemView.InlineTextEditor({
                model: this.model,
                editAttribute: 'options/label'
            });
        },
        render: function () {
            this.defaultRender({
                label: fw.opg('label', this.model.get('options')),
                required: fw.opg('required', this.model.get('options')),
                default_value: fw.opg('default_value', this.model.get('options')),
                toggle_required: localized.l10n.toggle_required,
                edit: localized.l10n.edit,
                remove: localized.l10n.delete,
                edit_label: localized.l10n.edit_label,
                yes: localized.l10n.yes,
                no: localized.l10n.no
            });

            if (this.widthChangerView) {
                this.$('.fw-form-item-width').append(
                    this.widthChangerView.$el
                );
                this.widthChangerView.delegateEvents();
            }

            if (this.labelInlineEditor) {
                this.$('.fw-form-item-preview-label-edit').append(
                    this.labelInlineEditor.$el
                );
                this.labelInlineEditor.delegateEvents();
            }
        },
        openEdit: function() {
            this.modal.open();
        },
        removeItem: function() {
            this.remove();

            this.model.collection.remove(this.model);
        },
        toggleRequired: function() {
            var values = _.clone(
                // clone to not modify by reference, else model.set() will not trigger the 'change' event
                this.model.get('options')
            );

            values.required = !values.required;

            this.model.set('options', values);
        },
        openLabelEditor: function() {
            this.$('.fw-form-item-preview-label-wrapper').hide();

            this.labelInlineEditor.show();

            this.listenToOnce(this.labelInlineEditor, 'hide', function() {
                this.$('.fw-form-item-preview-label-wrapper').show();
            });
        },
        updateDefaultValueFromPreviewInput: function() {
            var values = _.clone(
                // clone to not modify by reference, else model.set() will not trigger the 'change' event
                this.model.get('options')
            );

            values.default_value = this.$('.fw-form-item-preview-input input').val();

            this.model.set('options', values);
        },
        onWrapperClick: function(e) {
            if (!this.$el.parent().length) {
                // The element doesn't exist in DOM. This listener was executed after the item was deleted
                return;
            }

            if (!fw.elementEventHasListenerInContainer(jQuery(e.srcElement), 'click', this.$el)) {
                this.openEdit();
            }
        }
    });

    var Item = builder.classes.Item.extend({
        defaults: function() {
            var defaults = _.clone(localized.defaults);

            defaults.shortcode = fwFormBuilder.uniqueShortcode(defaults.type +'_');

            return defaults;
        },
        initialize: function() {
            this.defaultInitialize();

            this.modalOptions = localized.options;

            this.view = new ItemView({
                id: 'fw-builder-item-'+ this.cid,
                model: this
            });
        }
    });

    builder.registerItemClass(Item);
});
```

Create `framework-customizations/extensions/forms/includes/builder-items/yes-no/static/backend.css`:

```css
/* controls */

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-controls .fw-form-item-control-buttons {
    display: none;
}

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no:hover .fw-form-item-controls .fw-form-item-control-buttons {
    display: inline-block;
}

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-controls .fw-form-item-control-buttons > a,
.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-controls .fw-form-item-control-buttons > a:hover {
    text-decoration: none;
}

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-controls .fw-form-item-control-buttons a.fw-form-item-control-required {
    color: #999999;
}

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-controls .fw-form-item-control-buttons a.fw-form-item-control-required.required {
    color: #ff0000;
}

/* end: controls */


/* preview */

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-preview {
    padding: 5px 0;
}

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-preview .fw-form-item-preview-label {
    padding: 5px 0 10px;
}

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-preview .fw-form-item-preview-label span {
    display: none;
}

.fw-option-type-form-builder .fw-form-builder-item-type-yes-no .fw-form-item-preview .fw-form-item-preview-label span.required {
    display: inline;
    color: #ff0000;
}

/* end: preview */
```

Include the item type by creating the `framework-customizations/extensions/forms/hooks.php` file with the following contents:

```php
<?php if (!defined('FW')) die('Forbidden');

/** @internal */
function _action_theme_fw_ext_forms_include_custom_builder_items() {
    require_once dirname(__FILE__) .'/includes/builder-items/yes-no/class-fw-option-type-form-builder-item-yes-no.php';
}
add_action('fw_option_type_form_builder_init', '_action_theme_fw_ext_forms_include_custom_builder_items');
```

At this point the item is working only in backend. If you save the form, add it in a page (or post) using [Page Builder](/extensions/shortcodes) and open that page in frontend, you will see the item attributes array.

To make item working in frontend, follow the instructions below:

- Change the `frontend_render()` method:

```php
class FW_Option_Type_Form_Builder_Item_Yes_No extends FW_Option_Type_Form_Builder_Item
{

    ...

    public function frontend_render(array $item, $input_value)
    {
        if (is_null($input_value)) {
            $input_value = $item['options']['default_value'];
        }

        return fw_render_view(
            $this->locate_path(
                // Search view in 'framework-customizations/extensions/forms/form-builder/items/yes-no/views/view.php'
                '/views/view.php',
                // Use this view by default
                dirname(__FILE__) .'/view.php'
            ),
            array(
                'item' => $item,
                'input_value' => $input_value
            )
        );
    }
}
```

- Create the view `framework-customizations/extensions/forms/includes/builder-items/yes-no/view.php`:

```php
<?php if (!defined('FW')) die('Forbidden');
/**
 * @var array $item
 * @var array $input_value
 */

$options = $item['options'];
?>
<div class="<?php echo esc_attr(fw_ext_builder_get_item_width('form-builder', $item['width'] .'/frontend_class')) ?>">
    <div class="field-radio input-styled">
        <label><?php echo fw_htmlspecialchars($item['options']['label']) ?>
            <?php if ($options['required']): ?><sup>*</sup><?php endif; ?>
        </label>
        <div class="custom-radio">
            <div class="options">
                <?php
                foreach (array('yes' => __('Yes', 'unyson'), 'no' => __('No', 'unyson')) as $value => $label): ?>
                    <?php
                    $choice_attr = array(
                        'value' => $value,
                        'type' => 'radio',
                        'name' => $item['shortcode'],
                        'id' => 'rand-'. fw_unique_increment(),
                    );

                    if ($input_value === $value) {
                        $choice_attr['checked'] = 'checked';
                    }
                    ?>
                    <input <?php echo fw_attr_to_html($choice_attr) ?> />
                    <label for="<?php echo esc_attr($choice_attr['id']) ?>"><?php echo $label ?></label>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>
```

- Change the `frontend_validate()` method:

```php
class FW_Option_Type_Form_Builder_Item_Yes_No extends FW_Option_Type_Form_Builder_Item
{

    ...

    public function frontend_validate(array $item, $input_value)
    {
        $options = $item['options'];

        $messages = array(
            'required' => str_replace(
                array('{label}'),
                array($options['label']),
                __('This {label} field is required', 'unyson')
            ),
            'not_existing_choice' => str_replace(
                array('{label}'),
                array($options['label']),
                __('{label}: Submitted data contains not existing choice', 'unyson')
            ),
        );

        if ($options['required'] && empty($input_value)) {
            return $messages['required'];
        }

        // check if has not existing choices
        if (!empty($input_value) && !in_array($input_value, array('yes', 'no'))) {
            return $messages['not_existing_choice'];
        }
    }
}
```

Now the field will be displayed in frontend as a radio box and the validation will work. The submitted value will be used by the form type you chose when created the form, for e.g. the Contact Forms sub-extensions will send the value in email.

You can [inspect the built-in form items](https://github.com/UnysonPlus/UnysonPlus-Forms-Extension/tree/master/includes/option-types/form-builder/items) to learn what possibilities for customization are available (for e.g. what methods from the extended class you can overwrite).

## With the AI Assistant

When the [AI Assistant (Beta)](../ai-assistant/index.md) extension is active, the AI can add forms to pages:

- **`forms-describe`** — the field types and the ready-made starters (contact, booking, quote, registration,
  support, feedback, NPS, signup).
- **`forms-add`** — a contact form from a starter and / or a list of fields (label, required, width,
  choices), with who receives the submissions and the button / success texts.

The AI has **no access to form entries** — the people who submit stay private. Try *"Add a booking form
with name, email, preferred date and number of guests to the Contact page."*
