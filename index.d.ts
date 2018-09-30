declare module 'scpp' {
	interface callback {
		(err: Error| null | undefined, result?: any): void
	}

	interface valueCall {
		(cb: callback, result?: any): void
	}

	interface call {
		(cb: callback): void
	}

	export function sync(
		functionArray: Array<valueCall>,
		callback: callback
	): void

	export function parallel(
		functionArray: Array<call>,
		callback: (
			err: Error| null | undefined,
			result?: Array<unknown>
		) => void
	): void
}

