import {Check, ChevronDown, Minus} from "lucide-react";
import {useState} from "react";
import {nestedCheckBoxData} from "./data/nestedCheckBox.ts";
import {CheckBox as CheckBoxType} from "./types";

const checkIcon = {
	checked: <Check size={14}/>,
	unchecked: <></>,
	partial: <Minus size={14}/>
};

type CheckBoxProps = {
	item: CheckBoxType;
	handleChange: (id: number, checked: boolean) => void;
	handleExpand: (id: number) => void;
};

const CheckBox = ({item, handleChange, handleExpand}: CheckBoxProps) => {
	return (
		<div
			className={`mb-1 pl-4 py-2 transition-colors duration-300 rounded-md  ${
				item.state === "partial"
					? "bg-yellow-100/80"
					: item.checked
						? "bg-green-100/80"
						: "bg-gray-100/80"
			}`}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						onClick={() => handleChange(item.id, !item.checked)}
						className={`w-6 h-6 rounded-md border-2 cursor-pointer flex items-center justify-center transition-all duration-300 ${
							item.checked
								? "bg-green-500 border-green-600 text-white"
								: item.state === "partial"
									? "bg-yellow-400 border-yellow-500 text-white"
									: "bg-white border-gray-300"
						} hover:scale-105 active:scale-95`}
					>
						{item.checked
							? checkIcon.checked
							: item.state === "partial"
								? checkIcon.partial
								: checkIcon.unchecked}
					</div>
					<span
						className={`font-medium text-sm transition-colors duration-300 ${
							item.checked ? "text-green-700" : "text-gray-800"
						}`}
					>
            {item.label}
          </span>
				</div>

				{item.children.length > 0 && (
					<div
						className={`cursor-pointer text-gray-400 hover:text-gray-800 transition-transform duration-300 mr-2 ${
							item.expanded ? "rotate-180" : ""
						}`}
						onClick={() => handleExpand(item.id)}
					>
						<ChevronDown size={18}/>
					</div>
				)}
			</div>

			{item.children.length > 0 && (
				<div
					className={`overflow-hidden transition-all duration-300 ease-in-out ${
						item.expanded ? "max-h-screen opacity-100 mt-2" : "max-h-0 opacity-0"
					}`}
				>
					{item.children.map((child, index) => (
						<CheckBox
							key={index}
							item={child}
							handleExpand={handleExpand}
							handleChange={handleChange}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const NestedCheckbox = () => {
	const [checkBoxes, setCheckBoxes] = useState<CheckBoxType[]>(nestedCheckBoxData);

	const handleChange = (id: number, checked: boolean) => {
		const checkAll = (items: CheckBoxType[], checked: boolean): CheckBoxType[] =>
			items.map(item => ({
				...item,
				checked,
				state: "complete",
				children: checkAll(item.children, checked)
			}));

		const updateItemById = (items: CheckBoxType[], id: number, checked: boolean): CheckBoxType[] =>
			items.map(item => {
				if (item.id === id) {
					return {
						...item,
						checked,
						state: "complete",
						children: checkAll(item.children, checked)
					};
				}
				return {
					...item,
					children: updateItemById(item.children, id, checked)
				};
			});

		const updateParentState = (items: CheckBoxType[]): CheckBoxType[] =>
			items.map(item => {
				if (item.children.length === 0) return item;

				const updatedChildren = updateParentState(item.children);
				const allChecked = updatedChildren.every(child => child.checked);
				const someChecked = updatedChildren.some(
					child => child.checked || child.state === "partial"
				);

				return {
					...item,
					checked: allChecked,
					state: allChecked ? "complete" : someChecked ? "partial" : "incomplete",
					children: updatedChildren
				};
			});

		setCheckBoxes(prev => {
			let updated = updateItemById(prev, id, checked);
			updated = updateParentState(updated);
			return updated;
		});
	};

	const handleExpand = (id: number) => {
		const closeAll = (items: CheckBoxType[]): CheckBoxType[] =>
			items.map(item => ({
				...item,
				expanded: false,
				children: closeAll(item.children)
			}));

		const expand = (items: CheckBoxType[], id: number): CheckBoxType[] =>
			items.map(item => {
				if (item.id === id) {
					return {
						...item,
						expanded: !item.expanded,
						children: !item.expanded ? closeAll(item.children) : item.children
					};
				}
				return {
					...item,
					children: expand(item.children, id)
				};
			});

		setCheckBoxes(prev => expand(prev, id));
	};

	return (
		<div className="container mx-auto p-6 min-h-screen max-w-lg">
			<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
				Nested Checkbox Component
			</h1>
			<div className="bg-white border border-blue-200 rounded-xl shadow-md p-6 transition-all duration-300">
				{checkBoxes.map((item, index) => (
					<CheckBox
						key={index}
						item={item}
						handleChange={handleChange}
						handleExpand={handleExpand}
					/>
				))}
			</div>
		</div>
	);
};

export default NestedCheckbox;
