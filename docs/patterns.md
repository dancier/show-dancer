# Development Patterns

<details>
<summary>
  <b>Environment:</b>
  Import the EnvironmentService rather than environment.ts directly.
</summary>

In order to use variables from environment.ts, you need to import the EnvironmentService.

#### Why?

Directly importing environment.ts leads to components that are hard to test.
This is because you can't mock environment.ts.

#### How?

```ts
import { EnvironmentService } from '@app/core/services/environment.service';

export class MyComponent {
  constructor(private environmentService: EnvironmentService) {}

  someMethod(): string {
    return `Value of someKey is ${this.environmentService.get('someKey')}`;
  }
}
```

</details>

<details>
<summary>
  <b>Forms:</b>
  Use typed forms by initializing them when defining the form member variable.
</summary>

Starting with Angular 14, typed forms have become the new standard.
We should initialize our form directly as we define the form member variable, rather than using the `ngOnInit` lifecycle hook.

#### Why?

A common pattern was to have a form member variable and initialize it within the `ngOnInit` method.
This is no longer advised, as you'd have to explicitly define the type of the member variable.
Instead, simply initialize the form directly when defining the member variable to let Typescript infer the type.

In order to make type-safe forms work, you also don't have to declare an explicit form type.
This extra type is not necessary. It's more readable and less verbose to simply rely on type inference instead.

#### How?

```ts
import { NonNullableFormBuilder, Validators } from '@angular/forms';

export class MyComponent {
  form = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: NonNullableFormBuilder) {}
}
```

It's advised to use the `NonNullableFormBuilder` instead of the default `FormBuilder`
so the default values are being used instead of fields being `null` when the form is reset.

#### More information

- [Angular Docs: Typed Forms](https://angular.io/guide/typed-forms)
- [Angular Strictly Typed Forms (Complete Guide)](https://blog.angular-university.io/angular-typed-forms/)
</details>
