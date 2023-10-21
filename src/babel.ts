import * as fs from 'node:fs/promises';

import type { BuildOptions } from 'esbuild';
import { transformAsync, type TransformOptions } from '@babel/core';
import env from '@babel/preset-env';
import react from '@babel/preset-react';
import typescript from '@babel/preset-typescript';
import babelPluginTransformRuntime from '@babel/plugin-transform-runtime';

export interface BabelOptions {
  path: string;
  options: Omit<TransformOptions, 'configFile' | 'babelrc' | 'filename'>;
  buildOptions: BuildOptions;
}

export async function compileWithBabel({
  path,
  options,
  buildOptions,
}: BabelOptions) {
  const code = await fs.readFile(path, 'utf-8');
  const result = await transformAsync(code, {
    configFile: false,
    babelrc: false,
    filename: path,
    ...options,
    presets: [
      [
        env,
        {
          loose: true,
          modules: buildOptions.format === 'cjs' ? 'auto' : false,
        },
      ],
      react,
      typescript,
      ...(options.presets || []),
    ],
    plugins: [babelPluginTransformRuntime, ...(options.plugins || [])],
  });
  return result?.code;
}
