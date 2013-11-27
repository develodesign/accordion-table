accordion-table
===============

AccordionTable is a very simple jQuery plugin, that coverts any basic table into a simple accordion menu.

A very basic example:

```
<table>
    <tr>
        <td>
            Menu Title
        </td>
    </tr>
    <tr>
        <td>
            Menu content
        </td>
    </tr>
    <tr>
        <td>
            Menu Title
        </td>
    </tr>
    <tr>
        <td>
            Menu content
        </td>
    </tr>
</table>

$( function(){

    // Make an accordion table
    $( 'table' ).accordionTable();
});
```

The animations are all done by CSS and not jQuery, so users can modify the css file to create their own animations.
