# eslint-plugin-tailwindcss-jit-restrict

To be restricted from using all of or partially arbitrary values in jit mode.

## Install

```bash
yarn add --dev eslint-plugin-tailwindcss-jit-restrict
// or
npm install --save-dev eslint-plugin-tailwindcss-jit-restrict
```

## How to use

Firstly, you'll set `tailwindcss-jit-restrict` to `plugins`. Then, its `restrict` rule is also set.

```json
{
  "plugins": ["tailwindcss-jit-restrict"],
  "rules": {
    "tailwindcss-jit-restrict/restrict": "error"
  }
}
```

Now, all of arbitrary values—such as `w-[500px]`—becomes eslint error.

### Advanced

If you want to allow some arbitrary values to be useed, you can specify white list by setting the rule option.

For instance, you think that you want only to use `w-[500px]` mentioned earlier, you do that set in the following.

```json
{
  "plugins": ["tailwindcss-jit-restrict"],
  "rules": {
    "tailwindcss-jit-restrict/restrict": [
      "error",
      { "whiteList": ["w-[500px]"] }
    ]
  }
}
```

Here, you can set values of the `whiteList` as array of strings. In other words, you think that you want to add more the whiteList—for instance `h-[350px]`—, then you just add it.

```json
{
  "plugins": ["tailwindcss-jit-restrict"],
  "rules": {
    "tailwindcss-jit-restrict/restrict": [
      "error",
      { "whiteList": ["w-[500px]", "h-[350px]"] }
    ]
  }
}
```

However, if you have a lots of white list, This is awful. So, this plugin lets you write by glob.

For instance, you want to allow all of arbitrary values for the `width` to be used, you should do in the following.

```json
{
  "plugins": ["tailwindcss-jit-restrict"],
  "rules": {
    "tailwindcss-jit-restrict/restrict": ["error", { "whiteList": ["w-*"] }]
  }
}
```

For instance, you want only to allow not all but some, you can also be in the following. (You only allow `w-[350px]`, `w-[500px]` and `w-[750px]` to be used.)

```json
{
  "plugins": ["tailwindcss-jit-restrict"],
  "rules": {
    "tailwindcss-jit-restrict/restrict": [
      "error",
      { "whiteList": ["w-\\[$(350|500|750)px\\]"] }
    ]
  }
}
```
