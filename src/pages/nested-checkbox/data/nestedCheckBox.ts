import type {CheckBox} from "../types";

export const nestedCheckBoxData: CheckBox[] = [
	{
		id: 1,
		label: "Project A",
		checked: false,
		state: "partial",
		expanded: false,
		children: [
			{
				id: 2,
				label: "Task 1 - Documentation",
				checked: false,
				state: "incomplete",
				expanded: false,
				children: []
			},
			{
				id: 3,
				label: "Task 2 - Development",
				checked: true,
				state: "complete",
				expanded: false,
				children: [
					{
						id: 4,
						label: "Subtask 2.1 - Frontend",
						checked: true,
						state: "complete",
						expanded: false,
						children: []
					},
					{
						id: 5,
						label: "Subtask 2.2 - Backend",
						checked: true,
						state: "complete",
						expanded: false,
						children: []
					}
				]
			}
		]
	},
	{
		id: 6,
		label: "Project B",
		checked: true,
		state: "complete",
		expanded: false,
		children: [
			{
				id: 7,
				label: "Task 1 - Research",
				checked: true,
				state: "complete",
				expanded: false,
				children: []
			},
			{
				id: 8,
				label: "Task 2 - Presentation",
				checked: true,
				state: "complete",
				expanded: false,
				children: []
			}
		]
	},
	{
		id: 9,
		label: "Project C",
		checked: false,
		state: "incomplete",
		expanded: false,
		children: [
			{
				id: 10,
				label: "Task 1 - Design",
				checked: false,
				state: "incomplete",
				expanded: false,
				children: [
					{
						id: 11,
						label: "Subtask 1.1 - Wireframe",
						checked: false,
						state: "incomplete",
						expanded: false,
						children: []
					},
					{
						id: 12,
						label: "Subtask 1.2 - Mockups",
						checked: false,
						state: "incomplete",
						expanded: false,
						children: []
					}
				]
			}
		]
	},
	{
		id: 13,
		label: "Project D",
		checked: true,
		state: "complete",
		expanded: false,
		children: []
	},
	{
		id: 14,
		label: "Project E",
		checked: false,
		state: "incomplete",
		expanded: false,
		children: [
			{
				id: 15,
				label: "Task 1 - Testing",
				checked: false,
				state: "incomplete",
				expanded: false,
				children: [
					{
						id: 16,
						label: "Subtask 1.1 - Unit Tests",
						checked: false,
						state: "incomplete",
						expanded: false,
						children: []
					},
					{
						id: 17,
						label: "Subtask 1.2 - Integration Tests",
						checked: false,
						state: "incomplete",
						expanded: false,
						children: []
					}
				]
			}
		]
	},
	// 🔹 New Data Added Below 🔹
	{
		id: 18,
		label: "Project F",
		checked: true,
		state: "complete",
		expanded: false,
		children: [
			{
				id: 19,
				label: "Task 1 - Planning",
				checked: true,
				state: "complete",
				expanded: false,
				children: []
			},
			{
				id: 20,
				label: "Task 2 - Execution",
				checked: true,
				state: "complete",
				expanded: false,
				children: [
					{
						id: 21,
						label: "Subtask 2.1 - Setup",
						checked: true,
						state: "complete",
						expanded: false,
						children: []
					}
				]
			}
		]
	},
	{
		id: 22,
		label: "Project G",
		checked: false,
		state: "partial",
		expanded: false,
		children: [
			{
				id: 23,
				label: "Task 1 - Analysis",
				checked: false,
				state: "incomplete",
				expanded: false,
				children: []
			},
			{
				id: 24,
				label: "Task 2 - Implementation",
				checked: true,
				state: "complete",
				expanded: false,
				children: [
					{
						id: 25,
						label: "Subtask 2.1 - API Integration",
						checked: true,
						state: "complete",
						expanded: false,
						children: []
					}
				]
			}
		]
	}
];
