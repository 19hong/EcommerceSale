import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import { itemSchema } from '../utils/validations';
import { useItem, useCreateItem, useUpdateItem } from '../hooks/useItems';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'archived', label: 'Archived' },
];

const categoryOptions = [
  'Technology',
  'Design',
  'Business',
  'Education',
  'Health',
  'Entertainment',
  'Other',
];

export default function CreateEditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { data: existingItem, isLoading: loadingItem } = useItem(id, {
    enabled: isEditing,
  });
  const createItem = useCreateItem();
  const updateItem = useUpdateItem();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (existingItem) {
      reset({
        title: existingItem.title || '',
        description: existingItem.description || '',
        price: existingItem.price?.toString() || '',
        category: existingItem.category || '',
        status: existingItem.status || 'active',
      });
    }
  }, [existingItem, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      price: parseFloat(data.price),
    };

    if (isEditing) {
      await updateItem.mutateAsync({ id, data: payload });
    } else {
      await createItem.mutateAsync(payload);
    }
    navigate(isEditing ? `/items/${id}` : '/dashboard/items');
  };

  if (isEditing && loadingItem) {
    return (
      <div className="py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isEditing ? 'Edit Item' : 'Create New Item'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter item title"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              className="input-field min-h-[150px] resize-none"
              placeholder="Describe your item..."
              {...register('description')}
            />
            {errors.description?.message && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                className="input-field"
                {...register('category')}
              >
                <option value="">Select category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category?.message && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.price?.message}
              {...register('price')}
            />
          </div>

          {isEditing && (
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select className="input-field" {...register('status')}>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              loading={createItem.isPending || updateItem.isPending}
            >
              <Save className="h-5 w-5 mr-1" />
              {isEditing ? 'Update Item' : 'Create Item'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
