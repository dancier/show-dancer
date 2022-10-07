# Shared Module

The shared module contains general purpose classes and resources which are used in more than one dynamically loaded
module. By always loading with the application the shared components are ready whenever a module requests them.

Classes and resources inside the shared module shouldn't be application specific, otherwise they belong in the core
module.

For more information read the shared module section
in [angular-folder-structure](https://angular-folder-structure.readthedocs.io/en/latest/shared.html).
