import { FormControl } from "@angular/forms";

export type SimpleModelForm<TModel> = {
  [Property in keyof TModel]: FormControl<TModel[Property] | null>;
};

export type ModelForm<TModel, TOverwrites> = {
  [Property in keyof TModel | keyof TOverwrites]: FormControl<
    | (Property extends keyof TOverwrites
        ? TOverwrites[Property]
        : Property extends keyof TModel
        ? TModel[Property]
        : never)
    | null
  >;
};
