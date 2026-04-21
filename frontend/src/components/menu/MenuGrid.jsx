import MenuItem from './MenuItems';

const MenuGrid = ({ items }) => {
    if (!items || items.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                No menu items available
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <MenuItem key={item._id} item={item} />
            ))}
        </div>
    );
};

export default MenuGrid;