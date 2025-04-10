export default function ProductDetailPage() {
    return (
        <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-lg">
            <div className="mb-4">
                <img src="path_to_your_image.jpg" alt="Bentley Continental GT Model Car" className="w-full" />
            </div>
            <h2 className="text-lg font-semibold">Bentley Continental GT 1:18 WELLY (Gray)</h2>
            <p className="text-gray-700">Brand: WELLY</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">Product Code: FX18038AH-PW</span>
            </div>
            <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}