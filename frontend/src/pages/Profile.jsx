import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Phone, Info, Lock, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUpdateProfile, useUpdatePassword } from '../hooks/useUsers';
import { profileSchema, passwordSchema } from '../utils/validations';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdatePassword();

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data) => {
    setProfileLoading(true);
    try {
      await updateProfile.mutateAsync(data);
    } finally {
      setProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setPasswordLoading(true);
    try {
      await updatePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      resetPassword();
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and password.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8 p-6 card">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
          style={{
            backgroundColor: user?.name
              ? `hsl(${user.name.length * 40}, 70%, 50%)`
              : '#6366f1',
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <span className="badge-primary mt-1 inline-block">
            {user?.role}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Personal Information
        </h2>
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
          <Input
            label="Name"
            icon={User}
            error={profileErrors.name?.message}
            {...registerProfile('name')}
          />
          <Input
            label="Phone"
            icon={Phone}
            placeholder="+1 (555) 000-0000"
            error={profileErrors.phone?.message}
            {...registerProfile('phone')}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3">
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                className="input-field pl-10 min-h-[100px] resize-none"
                placeholder="Tell us about yourself..."
                {...registerProfile('bio')}
              />
            </div>
            {profileErrors.bio?.message && (
              <p className="text-sm text-red-500">
                {profileErrors.bio.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            loading={profileLoading}
            className="w-full sm:w-auto"
          >
            <Save className="h-5 w-5 mr-1" />
            Save Changes
          </Button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Change Password
        </h2>
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <Input
            label="Current Password"
            type="password"
            icon={Lock}
            error={passwordErrors.currentPassword?.message}
            {...registerPassword('currentPassword')}
          />
          <Input
            label="New Password"
            type="password"
            icon={Lock}
            error={passwordErrors.newPassword?.message}
            {...registerPassword('newPassword')}
          />
          <Input
            label="Confirm New Password"
            type="password"
            icon={Lock}
            error={passwordErrors.confirmNewPassword?.message}
            {...registerPassword('confirmNewPassword')}
          />
          <Button
            type="submit"
            variant="secondary"
            loading={passwordLoading}
            className="w-full sm:w-auto"
          >
            Update Password
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
