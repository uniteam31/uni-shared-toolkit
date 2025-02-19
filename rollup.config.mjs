import path from 'path';
import { fileURLToPath } from 'url';
import typescript from 'rollup-plugin-typescript2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entryPoint = path.resolve(__dirname, 'src', 'index.ts');
const outputEsmPoint = path.resolve(__dirname, 'dist', 'esm');
const outputCjsPoint = path.resolve(__dirname, 'dist', 'cjs');

/**
 * @param output {import('rollup').OutputOptions}
 * @returns {import('rollup').RollupOptions}
 * */
const config = (output) => ({
	input: entryPoint,

	output: {
		...output,

		name: 'uni-shared-toolkit',

		/** Минификация вспомогательного кода  */
		compact: true,

		/** Разделение на чанки, чтобы работал tree shaking */
		preserveModules: true,

		/** Не оборачиваем конечный билд в директорию src */
		preserveModulesRoot: 'src',

		/** Для дебага */
		sourcemap: true,
	},

	external: ['react', 'react-dom', 'axios', 'react/jsx-runtime', 'react-hook-form'],

	plugins: [
		typescript({
			tsconfig: 'tsconfig.json',
			useTsconfigDeclarationDir: output.format !== 'es',
			tsconfigOverride: { declaration: output.format === 'es' },
		}),
	],
});

export default [
	config({ dir: outputCjsPoint, format: 'cjs', esModule: true }),
	config({ dir: outputEsmPoint, format: 'es' }),
];
