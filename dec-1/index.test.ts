import {describe, expect, test} from "bun:test"
import { getCodeFromString, getNumbers, getSum } from '.'

describe("getCodeFromString", () => {

	test("Numbers get concatenated", () => {
		expect(getCodeFromString("7abc2")).toBe(72)
	})

	test("Only the first and last number get concatenated", () => {
		expect(getCodeFromString("7ab123213c2de3f2222223")).toBe(73)
	})

	test("In case we only have one number, we concat it with itself", () => {
		expect(getCodeFromString("as7abc")).toBe(77)
	})

	test("Returns null if no numbers are found", () => {
		expect(getCodeFromString("asdf")).toBe(null)
	})

	test("Handles numbers as strings", () => {
		expect(getCodeFromString("oneasdasd223")).toBe(13)
	})

	test("Handles numbers as strings", () => {
		expect(getCodeFromString("oneseven7nine")).toBe(19)
	})
})

describe ("getNumbers", () => {
	test("Returns 123 given the string '1asd0\na9n3\na2asdasd0'", () => {
		expect(getNumbers("1as134d0\n9n1231233\n2asda1111sd01231230")).toEqual([10, 93, 20])
	})

	test("Returns [] given the string 'asdasd\nasdasd\nasdasd'", () => {
		expect(getNumbers("asdasd\nasdasd\nasdasd")).toEqual([])
	})

	test("Returns [] given the string ''", () => {
		expect(getNumbers("")).toEqual([])
	})
})

describe("getSum", () => {
	test("Returns 6 given [1, 2, 3]", () => {
		expect(getSum([1, 2, 3])).toBe(6)
	})

	test("Returns 0 given []", () => {
		expect(getSum([])).toBe(0)
	})
})