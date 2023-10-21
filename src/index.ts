import type { Plugin, OnLoadArgs, OnLoadResult } from 'esbuild';
import { compileWithBabel, type BabelOptions } from './babel.js';
import { compileWithSWC, type SwcOptions } from './swc.js';

export function transformer({
  compiler,
  options,
}:
  | { compiler: 'swc'; options: SwcOptions['options'] }
  | { compiler: 'babel'; options: BabelOptions['options'] }): Plugin {
  return {
    name: 'esbuild-plugin-transformer',
    setup(build) {
      build.onLoad(
        { filter: /\.([cm]?[tj]sx?)$/ },
        async (args: OnLoadArgs): Promise<OnLoadResult> => {
          const contents =
            compiler === 'swc'
              ? await compileWithSWC({
                  path: args.path,
                  options,
                  buildOptions: build.initialOptions,
                })
              : await compileWithBabel({
                  path: args.path,
                  options,
                  buildOptions: build.initialOptions,
                });
          if (!contents) {
            throw new Error('empty output!');
          }
          return { contents: contents, loader: 'js' };
        }
      );
    },
  };
}
