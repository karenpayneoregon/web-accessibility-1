# Tips on making a web site accessible part 2

## Using the CSS reduce-motion query to prevent motion

Some users experience distraction or nausea from animated content.

> **Note**
> The impact of animation on people with vestibular disorders can be quite severe. Triggered reactions include nausea, migraine headaches, and potentially needing bed rest to recover.

**Vestibular Disorder**

- People with [vestibular disorders](https://vestibular.org/) need control over movement triggered by interactions. Non-essential movement can trigger vestibular disorder reactions. Vestibular (inner ear) disorder reactions include distraction, dizziness, headaches and nausea.
- Persona Quote: "Stop that extra movement! You are making me so dizzy I cannot concentrate. Now I have to turn off my computer and go lie down."

Information above is from [WCAG 2.1 Techniques](https://www.w3.org/WAI/WCAG21/Techniques/css/C39)

## Dealing with reduce-motion

- Assume the visitor has set prefers-reduced-motion in the [operating system](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences). This is done with the Index page so if the visitor is affected they may suffer.
- Be pro-active, in Index1 page code asserts for prefers-reduced-motion and if set displays an image rather than a animated image which provides the same message as Index page.
- Provide a method for the user to set prefers-reduced-motion, in this case in local storage which is done in SettingsPage and used in Index2 page.

From wwwroot/js/Application.js, provides the following. 

| Method        |  Description    | 
|:------------- |:-------------|
| setMotion | store user reduce motion perference in local storage  |
| getMotion | retrieve users reduce setting perference from local storage |
| supportsLocalStorage | determines if we can use local storage |
| prefersReducedMotion | determines reduce motion is set locally |

```javascript
var $Application = $Application || {};
$Application = function () {
    const motionKey = 'useReduceMotion';
    var supportsLocalStorage = function () {
        return typeof (Storage) !== "undefined";
    };
    var setMotion = function (value) {
        if (!supportsLocalStorage()) {
            return false;
        }
        localStorage.setItem(motionKey, value);
        return true;
    };

    var getMotion = function () {
        if (localStorage.getItem(motionKey) === null) {
            localStorage.setItem(motionKey, false);
        }

        return localStorage.getItem(motionKey).toLowerCase() === 'true';

    };

    var prefersReducedMotion = function () {
        const results = window.matchMedia('(prefers-reduced-motion: reduce)');
        // Check if the media query matches or is not available.
        return !results || results.matches;
    }

    return {
        setMotion: setMotion,
        getMotion: getMotion,
        prefersReducedMotion: prefersReducedMotion
    };
}();
```

Add the script file to your project.

See SettingsPage.cshtml for storing reduce-motion to local storage.

```html
<div class="container" id="main-content">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="useMotion">
        <label class="form-check-label" for="useMotion">Use motion</label>
    </div>
</div>

@section Scripts
{
    <script>
        const identifier = 'useMotion';
        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById(identifier).checked = $Application.getMotion();
        });

        document.getElementById(identifier).addEventListener("click", function () {
            $Application.setMotion(document.getElementById(identifier).checked);
        });
    </script>
}
```

Index2

Assert setting in local storage, if `$Application.getMotion()` returns true, use an image rather than animation else if false if return show animation.

```html
<div class="position-absolute top-50 start-50 translate-middle">
    <div class="animation1">Sale today</div>
    <div id="noAnimate" style="display: none">
        <div class="card" style="width: 21rem;">
            <img src="images/none.png" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Information</h5>
                <p class="card-text">Detected <mark>prefers-reduced-motion: reduce</mark></p>
            </div>
        </div>        
    </div>
</div>

@section Scripts
 {
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            if ($Application.getMotion()) {
                document.getElementById('noAnimate').style.display = 'inline';
                document.getElementsByClassName('animation1')[0].style.display = 'none';
            }
        });

    </script>
}
```

## Source code

Clone the following [GitHub repository](https://github.com/karenpayneoregon/web-accessibility-1) then use ReduceMotionExample project to  try out what has been presented.

## Article

https://dev.to/karenpayneoregon/tips-on-making-a-web-site-accessible-part-2-486p
