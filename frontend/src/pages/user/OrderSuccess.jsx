import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-md w-full">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
                <p className="text-gray-500 mb-8">
                    Your order has been placed successfully. We'll deliver it as soon as possible!
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate('/orders')}
                        className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600"
                    >
                        Track My Order
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full border border-orange-500 text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-50"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;