import NestedComments from "./nested-comment/NestedComment"
import TabForm from "./tab-form/TabForm"
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
    }
]
export default pagesData; 