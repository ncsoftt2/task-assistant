import {Main} from "./main";
import {MainStoreDecorators} from "../../stories/MainStoreDecorators";

export default {
    title: "main component",
    component: <Main/>,
    decorators: [MainStoreDecorators]
}

export const MainExample = () => {
    return <Main/>
}