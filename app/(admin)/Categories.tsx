import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../src/components/SearchBar';
import StatsCards from '../../src/components/admin/Category/StatsCard';
import CategoryTable from '../../src/components/admin/Category/CategoryTable';
import CategoryFormModal from '../../src/components/admin/Category/CategoryForm';
import { useGetCategoriesQuery } from '@/src/slices/Food/categorySlice';
import { Category } from '@/src/utils/Types/Category/Category.types';

export default function CategoriesAdmin() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data } = useGetCategoriesQuery();
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const filteredCategories = data?.map((item) =>
    item.categoryName.toLowerCase()
  );

  const handleDelete = (id: number) => {
    setCategories(data?.filter((item)=>item.foodCategoryId!==id)??[]);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setShowForm(true);   
  };

  const handleSave = (data: { name: string; foodItem: [] }) => {
    if (selectedCategory) {
      // Update existing category
      setCategories(data.map(cat =>
        cat.foodCategoryId === selectedCategory.foodCategoryId
          ? { ...cat, name: data.name, foodItem: data.foodItem }
          : cat
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        foodCategoryId: Math.max(...data.map(c => c.id)) + 1,
        categoryName: data.name,
        foodItem: data.foodItem,
        status: 'Active',
      };
      setCategories([...categories, newCategory]);
    }
    setSelectedCategory(null);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };


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
          // value={searchQuery}
          // onChangeText={setSearchQuery}
          placeholder="Search categories..."
        />
      </View>

      {/* Stats Cards */}
      {/* <StatsCards stats={statscategories} /> */}

      {/* Categories Table */}
      <CategoryTable
        categories={category}
        onEdit={handleEdit}
        onDelete={handleDelete}
      // onToggleStatus={handleToggleStatus}
      />

      {/* Add/Edit Modal */}
      <CategoryFormModal
        // visible={showModal}
        category={selectedCatego}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </View>
  );
}