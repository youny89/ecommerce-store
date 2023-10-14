import getProduct from "@/actions/get-product"
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

interface ProductIdPageProps {
    params: { productId: string }
};


const ProductIdPage:React.FC<ProductIdPageProps> = async ({ params }) => {

    const product = await getProduct(params.productId);
    const suggestedProducts = await getProducts({
        isFeatured:true,
        categoryId: product?.category.id
    });

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-4">
                        {/* Gallery */}
                        <Gallery images={product.images}/>
                        {/* Info */}
                        <div className="mt-10 px-4 sm:mt-15 sm:px-0 lg:mt-0">
                            <Info data={product}/>
                        </div>

                    </div>

                    <hr className="my-10"/>
                    <ProductList title="추천 상품" items={suggestedProducts}/>
                </div>
            </Container>
        </div>
    )
}

export default ProductIdPage