# Development Patterns

<details>
<summary>
  <b>Change Detection:</b>
  Use OnPush Change Detection per default
</summary>

OnPush Change Detection only updates a component when:

- The component's input changes (e.g. a property is set by the parent component)
- An event is emitted in the component's template
- New data is emitted by an Observable that is subscribed to by the async pipe in the component's template

#### Why?

OnPush Change Detection has two benefits:

1. It improves performance by only updating the components that need to be updated.
2. It facilitates good development practices (use of immutable data structures, building smaller components, etc.)

Lern more about the benefits of OnPush in [this video](https://www.youtube.com/watch?v=tWy8zaWvkvk).

#### How?

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './app-example.component.html',
  styleUrls: ['./app-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  // ...
}
```

#### More information

- [Angular Docs: Skipping component subtrees](https://angular.io/guide/change-detection-skipping-subtrees)
- [Angular OnPush Change Detection and Component Design - Avoid Common Pitfalls](https://blog.angular-university.io/onpush-change-detection-how-it-works/)

</details>

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
  Use typed forms by initializing them in the constructor.
</summary>

Starting with Angular 14, typed forms have become the new standard.
We should initialize our form directly in the constructor, rather than using the `ngOnInit` lifecycle hook.

#### Why?

A common pattern was to have a form member variable and initialize it within the `ngOnInit` method.
This is no longer advised, as you'd have to explicitly define the type of the member variable.
Instead, simply initialize the form in the constructor when defining the member variable to let Typescript infer the
type.

#### How?

```ts
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

export class MyComponent {
  form: FormGroup<{ email: FormControl<string> }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
```

It's advised to use the `NonNullableFormBuilder` instead of the default `FormBuilder`
so the default values are being used instead of fields being `null` when the form is reset.

#### More information

- [Angular Docs: Typed Forms](https://angular.io/guide/typed-forms)
- [Angular Strictly Typed Forms (Complete Guide)](https://blog.angular-university.io/angular-typed-forms/)

</details>
