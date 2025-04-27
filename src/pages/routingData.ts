import InfiniteScrollList from "./infinte-scroll-list";
import NestedComments from "./nested-comment/NestedComment"
import TabForm from "./tab-form/TabForm"
import FrontendPagination from "./frontend-pagination/index"
import DraggableList from "./draggable-list"
import NestedCheckbox from "./nested-checkbox"

export type PagesData = {
	path: string
	name: string
	component: () => JSX.Element
}

const pagesData: PagesData[] = [
	{
		path: "/nested-comments",
		name: "Nested Comments",
		component: NestedComments
	},
	{
		path: "/tab-form",
		name: "Tab Form",
		component: TabForm
	},
	{
		path: "/frontend-pagination",
		name: "Frontend Pagination",
		component: FrontendPagination
	},
	{
		path: "/draggable-list",
		name: "Draggable List",
		component: DraggableList
	},
	{
		path: "/nested-checkbox",
		name: "Nested Checkbox",
		component: NestedCheckbox
	}, {
		path: "/infinite-scroll",
		name: "Infinite Scroll",
		component: InfiniteScrollList
	},
]
export default pagesData; 
