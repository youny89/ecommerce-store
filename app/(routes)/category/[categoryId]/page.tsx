import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard"
import Container from "@/components/ui/container"
import Filter from "./components/filter";
import getColors from "@/actions/get-colors";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "./components/mobile-filter";

interface CategoryIdPageProps {
    params : {
        categoryId: string
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}

const CategoryIdPage = async ({
    params,
    searchParams
}: CategoryIdPageProps) => {

    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    })

    const category = await getCategory(params?.categoryId);
    const sizes = await getSizes()
    const colors = await getColors()

    return (
        <Container>
            <Billboard data={category.billboard}/>
            <div className="px-4 sm:px-6 lg:px-8 pb-24">
                <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    <MobileFilter sizes={sizes} colors={colors}/>
                    <div className="hidden lg:block">
                        <Filter 
                            valueKey="sizeId"
                            name="사이즈"
                            data={sizes}
                        />
                        <Filter 
                            valueKey="colorId"
                            name="색상"
                            data={colors}
                        />
                    </div>
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                        {products.length === 0 && <NoResults />}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {products.map(item=>(
                                <ProductCard key={item.id} data={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CategoryIdPage