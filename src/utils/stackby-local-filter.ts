import {
	STACKBY_FILTER_OPERATORS,
	StackbyStandardFilter,
} from "./stackby-filter.js";

type LocalEvaluator = (
	fieldValue: unknown,
	normalizedField: string,
	normalizedFilter: string,
) => boolean;

export function applyLocalStandardFilter(
	data: any[],
	filter: StackbyStandardFilter,
) {
	const column = filter.column;
	const filterValue = filter.value;
	const anyOfValues =
		filter.operator === STACKBY_FILTER_OPERATORS.IS_ANY_OF
			? parseList(filterValue)
			: [];
	const evaluate = getLocalFilterEvaluator(
		filter.operator,
		filterValue,
		anyOfValues,
	);

	return data.filter((item) => {
		const fieldValue = item?.field?.[column];
		const normalizedField = normalizeValue(fieldValue);
		const normalizedFilter = normalizeValue(filterValue);

		return evaluate(fieldValue, normalizedField, normalizedFilter);
	});
}

function getLocalFilterEvaluator(
	operator: STACKBY_FILTER_OPERATORS,
	filterValue: unknown,
	anyOfValues: string[],
): LocalEvaluator {
	const evaluators: Partial<Record<STACKBY_FILTER_OPERATORS, LocalEvaluator>> = {
		[STACKBY_FILTER_OPERATORS.TO_CONTAINS]: (
			_fieldValue,
			normalizedField,
			normalizedFilter,
		) => normalizedField.includes(normalizedFilter),
		[STACKBY_FILTER_OPERATORS.DOES_NOT_CONTAIN]: (
			_fieldValue,
			normalizedField,
			normalizedFilter,
		) => !normalizedField.includes(normalizedFilter),
		[STACKBY_FILTER_OPERATORS.EQUAL]: (
			_fieldValue,
			normalizedField,
			normalizedFilter,
		) => normalizedField === normalizedFilter,
		[STACKBY_FILTER_OPERATORS.IS_EXACTLY]: (
			_fieldValue,
			normalizedField,
			normalizedFilter,
		) => normalizedField === normalizedFilter,
		[STACKBY_FILTER_OPERATORS.NOT_EQUAL]: (
			_fieldValue,
			normalizedField,
			normalizedFilter,
		) => normalizedField !== normalizedFilter,
		[STACKBY_FILTER_OPERATORS.IS_EMPTY]: (
			_fieldValue,
			normalizedField,
		) => normalizedField.length === 0,
		[STACKBY_FILTER_OPERATORS.IS_NOT_EMPTY]: (
			_fieldValue,
			normalizedField,
		) => normalizedField.length > 0,
		[STACKBY_FILTER_OPERATORS.GREATER_THAN]: (fieldValue) =>
			toNumber(fieldValue) > toNumber(filterValue),
		[STACKBY_FILTER_OPERATORS.GREATER_THAN_EQUAL]: (fieldValue) =>
			toNumber(fieldValue) >= toNumber(filterValue),
		[STACKBY_FILTER_OPERATORS.LESS_THAN]: (fieldValue) =>
			toNumber(fieldValue) < toNumber(filterValue),
		[STACKBY_FILTER_OPERATORS.LESS_THAN_EQUAL]: (fieldValue) =>
			toNumber(fieldValue) <= toNumber(filterValue),
		[STACKBY_FILTER_OPERATORS.IS_ANY_OF]: (
			_fieldValue,
			normalizedField,
		) => anyOfValues.includes(normalizedField),
	};

	return evaluators[operator] ?? (() => true);
}

function normalizeValue(value: unknown): string {
	if (value === null || value === undefined) {
		return "";
	}

	if (Array.isArray(value)) {
		return value.map((entry) => normalizeValue(entry)).join(",");
	}

	return String(value).trim().toLowerCase();
}

function parseList(value: unknown): string[] {
	if (!value) {
		return [];
	}

	const raw = String(value).trim();
	const listContent =
		raw.startsWith("[") && raw.endsWith("]") ? raw.slice(1, -1) : raw;

	return listContent
		.split(",")
		.map((entry) => entry.trim().replace(/^['\"]|['\"]$/g, ""))
		.map((entry) => normalizeValue(entry))
		.filter(Boolean);
}

function toNumber(value: unknown): number {
	const parsed = Number(value);
	return Number.isNaN(parsed) ? Number.NaN : parsed;
}