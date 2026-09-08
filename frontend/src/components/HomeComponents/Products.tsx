import { Link } from 'react-router-dom';
import { BackendProduct } from '../../services/productApi';

const Products = ({ data }: { data: BackendProduct[] }) => {



    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mt-6">
                {data.map((product) => {
                    return (
                        <div className="w-full md:w-3/4 lg:w-1/3" key={product._id}>
                            <div className='w-full rounded-lg overflow-hidden'>
                                <Link to={`/product/${product.slug}`} aria-label="View Product Details" title="View Product Details">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
                                </Link>
                            </div>
                            <div className="">
                                <h3 className="text-lg font-semibold text-white">
                                    <Link to={`/product/${product.slug}`} aria-label={product.name} title={product.name}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="text-sm text-slate-400">{product.description}</p>
                                <p className="text-sm font-bold text-indigo-400">${product.price}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Products