import DashboardProducts from "@/components/admin-components/productRedactor/productListRedactor";
import {PostCategoryProducts} from "@/components/admin-components/productRedactor/PostCategoryProducts";
import {PostProducts} from "@/components/admin-components/productRedactor/PostProducts";
import {PostAccessories} from "@/components/admin-components/productRedactor/PostAccessories";

export default function Dashboard() {
    return (
        <div className="h-screen ">
            <div className="flex-1 overflow-y-auto p-4">
                <DashboardProducts/> {/*Список продуктов и их удаление*/}
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex-col">
                <PostCategoryProducts/>
                <PostProducts/>
                <PostAccessories/>
            </div>
        </div>
    );
}