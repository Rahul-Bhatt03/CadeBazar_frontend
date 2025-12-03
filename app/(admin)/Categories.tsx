import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../src/components/SearchBar';
import StatsCards from '../../src/components/admin/Category/StatsCard';
import CategoryTable, { Category } from '../../src/components/admin/Category/CategoryTable';
import CategoryFormModal from '../../src/components/admin/Category/CategoryForm';

// Demo data
const demoCategories = [
  { id: 1, name: 'Beverages', description: 'Hot and cold drinks', itemCount: 12, status: 'Active', image: '☕' },
  { id: 2, name: 'Main Course', description: 'Rice, noodles, and curries', itemCount: 24, status: 'Active', image: '🍛' },
  { id: 3, name: 'Appetizers', description: 'Starters and snacks', itemCount: 18, status: 'Active', image: '🥟' },
  { id: 4, name: 'Desserts', description: 'Sweet treats', itemCount: 15, status: 'Active', image: '🍰' },
  { id: 5, name: 'Salads', description: 'Fresh and healthy', itemCount: 8, status: 'Inactive', image: '🥗' },
  { id: 6, name: 'Soups', description: 'Warm and comforting', itemCount: 6, status: 'Active', image: '🍲' },
];

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>(demoCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' } : cat
    ));
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleSave = (data: { name: string; description: string }) => {
    if (selectedCategory) {
      // Update existing category
      setCategories(categories.map(cat =>
        cat.id === selectedCategory.id
          ? { ...cat, name: data.name, description: data.description }
          : cat
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: data.name,
        description: data.description,
        itemCount: 0,
        status: 'Active',
        image: '🍽️',
      };
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  // Stats data
  const statsData = [
    {
      icon: 'apps-outline' as const,
      value: categories.length,
      label: 'Total Categories',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-100',
    },
    {
      icon: 'checkmark-circle-outline' as const,
      value: categories.filter(c => c.status === 'Active').length,
      label: 'Active',
      bgColor: 'bg-green-500',
      textColor: 'text-green-100',
    },
    {
      icon: 'fast-food-outline' as const,
      value: categories.reduce((sum, cat) => sum + cat.itemCount, 0),
      label: 'Total Items',
      bgColor: 'bg-orange-500',
      textColor: 'text-orange-100',
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-5 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-bold text-gray-900">Categories</Text>
            <Text className="text-sm text-gray-500 mt-1">Manage your food categories</Text>
          </View>
          <TouchableOpacity
            onPress={handleAddNew}
            className="bg-blue-600 px-5 py-3 rounded-xl flex-row items-center shadow-sm"
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Add Category</Text>
          </TouchableOpacity>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search categories..."
        />
      </View>

      {/* Stats Cards */}
      <StatsCards stats={statsData} />

      {/* Categories Table */}
      <CategoryTable
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Add/Edit Modal */}
      <CategoryFormModal
        visible={showModal}
        category={selectedCategory}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </View>
  );
}