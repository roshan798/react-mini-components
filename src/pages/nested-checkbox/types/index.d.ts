export type CheckBox = {
	id: number,
	label: string,
	checked: boolean
	state: "partial" | "complete" | "incomplete"
	expanded: boolean
	children: CheckBox[]
}
