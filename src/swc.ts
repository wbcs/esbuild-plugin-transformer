import { readFile } from 'node:fs/promises';
import { transform, type Options } from '@swc/core';
import type { BuildOptions } from 'esbuild';

export interface SwcOptions {
  path: string;
  options: Options;
  buildOptions: BuildOptions;
}

export async function compileWithSWC({ path, options }: SwcOptions) {
  const code = await readFile(path, 'utf-8');
  const isTS = path.endsWith('.ts') || path.endsWith('.tsx');
  const isJSX = path.endsWith('x');
  const result = await transform(code, {
    filename: path,
    sourceMaps: false,
    sourceFileName: path,
    ...options,
    jsc: {
      parser: {
        ...(isTS
          ? {
              syntax: 'typescript',
              tsx: isJSX,
            }
          : {
              syntax: 'ecmascript',
              jsx: isJSX,
            }),
        ...options.jsc?.parser,
      },
      ...options.jsc,
    },
  });
  return result.code;
}
