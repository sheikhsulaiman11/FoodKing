import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    getMenuByRestaurant,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
} from '../../services/menuServices';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks', 'Desserts'];

const catColors = {
    Breakfast: 'bg-yellow-100 text-yellow-700',
    Lunch:     'bg-orange-100 text-orange-700',
    Dinner:    'bg-red-100 text-red-700',
    Snacks:    'bg-green-100 text-green-700',
    Drinks:    'bg-blue-100 text-blue-700',
    Desserts:  'bg-pink-100 text-pink-700',
};

const catEmoji = {
    Breakfast: '🍳',
    Lunch:     '🍱',
    Dinner:    '🍽️',
    Snacks:    '🍿',
    Drinks:    '🥤',
    Desserts:  '🍰',
};

const emptyForm = {
    name:        '',
    price:       '',
    category:    'Breakfast',
    description: '',
    image:       '',
    isAvailable: true,
};

export default function ManageMenu() {
    const { user } = useAuth();

    const [items, setItems]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState('');
    const [activeFilter, setFilter] = useState('All');
    const [search, setSearch]       = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditing] = useState(null);
    const [form, setForm]           = useState(emptyForm);
    const [saving, setSaving]       = useState(false);
    const [deleteId, setDeleteId]   = useState(null);

    // ── Fetch ─────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getMenuByRestaurant(user?.restaurantId);
                setItems(data.data);
            } catch (err) {
                setError('Failed to load menu items.');
            } finally {
                setLoading(false);
            }
        };
        if (user?.restaurantId) fetchItems();
    }, [user]);

    // ── Derived ───────────────────────────────────────────────────────
    const categories  = [...new Set(items.map(i => i.category))];
    const totalItems  = items.length;
    const available   = items.filter(i => i.isAvailable).length;
    const unavailable = totalItems - available;

    const filtered = items.filter(item => {
        const matchCat    = activeFilter === 'All' || item.category === activeFilter;
        const matchSearch = !search ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    // ── Modal ─────────────────────────────────────────────────────────
    const openAdd = () => {
        setEditing(null);
        setForm(emptyForm);
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item);
        setForm({
            name:        item.name,
            price:       item.price,
            category:    item.category,
            description: item.description || '',
            image:       item.image || '',
            isAvailable: item.isAvailable,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditing(null);
        setForm(emptyForm);
    };

    // ── Save ──────────────────────────────────────────────────────────
    const handleSave = async () => {
        if (!form.name.trim() || !form.price) return;
        setSaving(true);
        try {
            if (editingItem) {
                const data = await updateMenuItem(editingItem._id, form);
                setItems(prev => prev.map(i => i._id === editingItem._id ? data.data : i));
            } else {
                const data = await addMenuItem({ ...form, restaurantId: user?.restaurantId });
                setItems(prev => [...prev, data.data]);
            }
            closeModal();
        } catch (err) {
            console.error('Failed to save item', err);
        } finally {
            setSaving(false);
        }
    };

    // ── Delete ────────────────────────────────────────────────────────
    const handleDelete = async (id) => {
        try {
            await deleteMenuItem(id);
            setItems(prev => prev.filter(i => i._id !== id));
            setDeleteId(null);
        } catch (err) {
            console.error('Failed to delete item', err);
        }
    };

    // ── Toggle ────────────────────────────────────────────────────────
    const handleToggle = async (item) => {
        try {
            const data = await toggleAvailability(item._id);
            setItems(prev => prev.map(i => i._id === item._id ? data.data : i));
        } catch (err) {
            console.error('Failed to toggle availability', err);
        }
    };

    // ── States ────────────────────────────────────────────────────────
    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-400 text-sm">Loading menu...</p>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-500 text-sm">{error}</p>
        </div>
    );

    // ── Render ────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Manage menu</h1>
                        <p className="text-sm text-gray-500 mt-1">{totalItems} items on your menu</p>
                    </div>
                    <button
                        onClick={openAdd}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                        + Add item
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total items',  value: totalItems       },
                        { label: 'Available',    value: available        },
                        { label: 'Unavailable',  value: unavailable      },
                        { label: 'Categories',   value: categories.length },
                    ].map(s => (
                        <div key={s.label} className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                            <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filters + Search */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {['All', ...categories].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                                activeFilter === cat
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="ml-auto border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-orange-400 w-44"
                    />
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 text-sm">No items found.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map(item => (
                            <div key={item._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col">

                                {/* Image */}
                                <div className="w-full h-32 bg-orange-50 flex items-center justify-center text-4xl overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={e => { e.target.style.display = 'none'; }}
                                        />
                                    ) : (
                                        catEmoji[item.category] || '🍽️'
                                    )}
                                </div>

                                <div className="p-3 flex flex-col flex-1">
                                    {/* Name + Price */}
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="text-sm font-medium text-gray-900 leading-tight">{item.name}</p>
                                        <p className="text-sm font-semibold text-orange-500 ml-2 shrink-0">₹{item.price}</p>
                                    </div>

                                    {/* Category badge */}
                                    <span className={`text-xs px-2 py-0.5 rounded-full inline-block w-fit mb-2 ${catColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                                        {item.category}
                                    </span>

                                    {/* Description */}
                                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3 flex-1">
                                        {item.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleToggle(item)}
                                                className={`relative w-9 h-5 rounded-full transition-colors ${item.isAvailable ? 'bg-orange-500' : 'bg-gray-200'}`}
                                            >
                                                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.isAvailable ? 'translate-x-4' : 'translate-x-0'}`} />
                                            </button>
                                            <span className="text-xs text-gray-400">
                                                {item.isAvailable ? 'On' : 'Off'}
                                            </span>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => openEdit(item)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-xs transition-colors"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(item._id)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-xs transition-colors"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-gray-900">
                                {editingItem ? 'Edit item' : 'Add menu item'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs text-gray-500 mb-1">Item name</label>
                            <input
                                type="text"
                                placeholder="e.g. Grilled Chicken"
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    value={form.price}
                                    onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Category</label>
                                <select
                                    value={form.category}
                                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 bg-white"
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs text-gray-500 mb-1">Description</label>
                            <textarea
                                placeholder="Describe the item..."
                                value={form.description}
                                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                rows={3}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs text-gray-500 mb-1">Image URL (optional)</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={form.image}
                                onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-sm text-gray-600">Available</span>
                            <button
                                onClick={() => setForm(p => ({ ...p, isAvailable: !p.isAvailable }))}
                                className={`relative w-9 h-5 rounded-full transition-colors ${form.isAvailable ? 'bg-orange-500' : 'bg-gray-200'}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isAvailable ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-60"
                            >
                                {saving ? 'Saving...' : 'Save item'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-2">Delete item?</h2>
                        <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
