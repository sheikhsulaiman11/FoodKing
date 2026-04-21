import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuByRestaurant } from '../../services/menuServices';
import MenuGrid from '../../components/menu/MenuGrid';
import Loader from '../../components/common/Loader';

const RestaurantsPage = () => {
    const { id } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await getMenuByRestaurant(id);
                setMenuItems(res.data);
            } catch (err) {
                setError('Failed to load menu');
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [id]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Menu</h1>

                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <MenuGrid items={menuItems} />
                )}
            </div>
        </div>
    );
};

export default RestaurantsPage;