import { Link } from 'react-router-dom';

const Products = () => {

    

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mt-6">
                <div className="w-full md:w-3/4 lg:w-1/3">
                    <div className='w-full rounded-lg overflow-hidden'>
                        <Link to="/product/1" aria-label="View Product Details" title="View Product Details">
                            <img src="https://www.zoicpharmaceuticals.com/wp-content/uploads/2019/08/Personal-Care-Products-Manufacturers-in-India.jpg" alt="Personal Care Products" className="w-full h-auto" />
                        </Link>
                    </div>
                    <div className="">
                        <h3 className="text-lg font-semibold text-white">
                            <Link to="/product/1" aria-label="Product Name" title="Product Name">Product Name</Link>
                        </h3>
                        <p className="text-sm text-slate-400">Product Description</p>
                        <p className="text-sm font-bold text-indigo-400">$99.99</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products