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
