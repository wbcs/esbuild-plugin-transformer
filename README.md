# esbuild-plugin-transformer

`esbuild-plugin-transformer` is a versatile plugin for esbuild that enables code transformation during the build process. It's a great tool for developers who want to customize their build configurations.

## Installation

You can install `esbuild-plugin-transformer` via npm:

```bash
npm add esbuild-plugin-transformer -D
```

Or if you prefer using pnpm:

```bash
pnpm add esbuild-plugin-transformer -D
```

## Usage

`esbuild-plugin-transformer` can be used with different compilers like Babel or SWC. Here are some examples of how to use it:

### Babel

```js
import { build } from 'esbuild'
import { transformer } from 'esbuild-plugin-transformer'
import babelPresetEnv from '@babel/preset-env'

const options = {
  bundle: false,
  format: 'esm'
}

build({
  ...options,
  target: 'es5',
  plugins: [
    transformer({
      compiler: 'babel',
      options: {
        presets: [[babelPresetEnv, { modules: false }]]
      }
    })
  ]
})
```

### SWC

```js
import { build } from 'esbuild'
import { transformer } from 'esbuild-plugin-transformer'

const options = {
  bundle: false,
  format: 'esm'
}

build({
  ...options,
  target: 'es5',
  plugins: [
    transformer({
      compiler: 'swc',
      options: { script: true, minify: true }
    })
  ]
})
```

In the above examples, we first import the necessary modules, then define our build options. After that, we call the `build` function from esbuild, spreading our options, defining the target version of ECMAScript, and finally, adding our `transformer` plugin with the desired compiler and its options.
